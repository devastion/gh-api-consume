import React from "react";
import ProfileAvatar from "./components/ProfileAvatar";
import { Box, Button, useTheme } from "@mui/material";
import { Route, Routes, NavLink } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import ProfileInfo from "./components/ProfileInfo";

function TransitionedRouter() {
  const selector = useAppSelector((state) => state.profile.info);
  const loginName = selector.login;

  return (
    <Routes>
      <Route
        path="/info"
        element={
          <ProfileInfo
            login={loginName}
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

export default function Profile() {
  const profileAvatar = useAppSelector(
    (state) => state.profile.info.avatar_url
  );
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
      <ProfileAvatar avatar_src={profileAvatar} />
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
