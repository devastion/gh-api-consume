import React from "react";
import ProfileAvatar from "./components/ProfileAvatar";
import { Box, Button, useTheme } from "@mui/material";
import { Route, Routes, NavLink } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import ProfileInfo from "./components/ProfileInfo";

function TransitionedRouter() {
  const info = useAppSelector((state) => state.profile.info);

  return (
    <Routes>
      <Route
        path="/info"
        element={
          <ProfileInfo
            login={info.login}
            name={""}
            location={""}
            public_repos={0}
            created_at={""}
          />
        }
      ></Route>
      <Route path="/repos" element=""></Route>
    </Routes>
  );
}

type Props = {
  avatar_url: string;
  profile_info: [];
  repos: [];
};

export default function Profile({ avatar_url, profile_info, repos }: Props) {
  const themePalette = useTheme().palette.mode;
  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "center",
        mt: 5,
      }}
    >
      <ProfileAvatar avatar_src={avatar_url} />
      <Box
        sx={{
          textDecoration: "none",
          ".active": { opacity: 1 },
        }}
      >
        <Button
          variant="text"
          component={NavLink}
          to="/info"
          color={themePalette === "dark" ? "success" : "primary"}
          sx={{ mx: 3, opacity: 0.4 }}
        >
          Profile Info
        </Button>

        <Button
          variant="text"
          component={NavLink}
          to="/repos"
          color={themePalette === "dark" ? "success" : "primary"}
          sx={{ mx: 3, opacity: 0.4 }}
        >
          Profile Repos
        </Button>
      </Box>
      <TransitionedRouter />
    </Box>
  );
}
