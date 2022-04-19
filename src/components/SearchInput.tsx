import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import PageviewRoundedIcon from "@mui/icons-material/PageviewRounded";
import { useAppDispatch } from "../store/hooks";
import { getProfileInfo } from "../store/profile/profileSlice";

export default function SearchInput() {
  const [profileName, setProfileName] = React.useState("");
  const dispatch = useAppDispatch();

  const searchProfile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setProfileName(e.target.value);
  };

  const fetchProfile = () => {
    dispatch(getProfileInfo(profileName));
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
    </>
  );
}
