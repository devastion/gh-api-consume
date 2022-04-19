import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Stack,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import PageviewRoundedIcon from "@mui/icons-material/PageviewRounded";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getProfileInfo, getProfileRepos } from "../store/profile/profileSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SearchInput() {
  const [profileName, setProfileName] = React.useState("");
  const dispatch = useAppDispatch();

  const searchProfile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setProfileName(e.target.value);
  };

  const fetchProfile = () => {
    dispatch(getProfileInfo(profileName));
    dispatch(getProfileRepos(profileName));
  };

  // * Snack bar
  const isPending =
    useAppSelector((state) => state.profile.loading) === "pending";
  const isSuccess = useAppSelector(
    (state) => state.profile.loading === "success"
  );
  const isFail = useAppSelector((state) => state.profile.loading === "fail");
  const isIdle = useAppSelector((state) => state.profile.loading === "idle");

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

  React.useEffect(() => {
    setOpen(true);
  }, [dispatch, isFail, isSuccess, isIdle, isPending]);

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

    if (isIdle) {
      return (
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Write your github username!
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
          alignItems: "flex-end",
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
        />
        <Button
          onClick={fetchProfile}
          color="success"
          sx={{
            px: 2,
            ml: 2,
          }}
          startIcon={<PageviewRoundedIcon />}
        >
          Search
        </Button>
      </Box>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          {snackbarRender()}
        </Snackbar>
      </Stack>
    </>
  );
}
