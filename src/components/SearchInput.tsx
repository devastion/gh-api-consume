import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Stack,
  ClickAwayListener,
  useTheme,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import PageviewRoundedIcon from "@mui/icons-material/PageviewRounded";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getProfileInfo, getProfileRepos } from "../store/profile/profileSlice";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SearchInput() {
  const [profileName, setProfileName] = React.useState("");
  const [emptyInput, setEmptyInput] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const themePalette = useTheme().palette.mode;
  localStorage.setItem("theme", themePalette);

  const searchProfile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (e.target.value.match("^[a-zA-Z0-9 ]*$") != null) {
      setEmptyInput(false);
      setProfileName(e.target.value);
    }
    if (e.target.value === "") setEmptyInput(true);
  };

  const fetchProfile = () => {
    if (profileName != "") {
      dispatch(getProfileInfo(profileName));
      dispatch(getProfileRepos(profileName));
      navigate("/gh-api/info");
    }
  };

  const fetchProfileEnterKey: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchProfile();
    }
  };

  // * SNACKBAR
  const isPending =
    useAppSelector((state) => state.profile.loading) === "pending";
  const isSuccess = useAppSelector(
    (state) => state.profile.loading === "success"
  );
  const isFail = useAppSelector((state) => state.profile.loading === "fail");

  const [open, setOpen] = React.useState(true);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(true);
  }, [dispatch, isFail, isSuccess, isPending]);

  const snackbarRender = () => {
    if (isSuccess) {
      return (
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          We found your profile!
        </Alert>
      );
    }

    if (isFail) {
      return (
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Error! Profile not found!
        </Alert>
      );
    }

    if (isPending) {
      return (
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Searching for your profile!
        </Alert>
      );
    }

    return (
      <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
        Write your github username!
      </Alert>
    );
  };

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: "center", my: 3 }}
      >
        Github Profiler
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          flexDirection: "row",
        }}
      >
        <TextField
          type="text"
          id="standard-basic"
          label="Github Profile"
          variant="standard"
          value={profileName}
          onChange={searchProfile}
          error={emptyInput}
          color={themePalette === "dark" ? "success" : "primary"}
          helperText={
            profileName === "" ? "Write username" : "Hit search or enter!"
          }
          onKeyUp={fetchProfileEnterKey}
        />
        <Button
          onClick={fetchProfile}
          color={themePalette === "dark" ? "success" : "primary"}
          sx={{
            px: 2,

            ml: 2,
          }}
          startIcon={<PageviewRoundedIcon />}
        >
          Search
        </Button>
      </Box>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            {snackbarRender()}
          </Snackbar>
        </Stack>
      </ClickAwayListener>
    </>
  );
}
