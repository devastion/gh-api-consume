import React from "react";
import ProfileAvatar from "./components/ProfileAvatar";
import { Box, Button, useTheme } from "@mui/material";
import { Route, Routes, NavLink } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";

function TransitionedRouter() {
  return (
    <TransitionGroup>
      <Routes>
        <Route path="/info" element=""></Route>
      </Routes>
    </TransitionGroup>
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
