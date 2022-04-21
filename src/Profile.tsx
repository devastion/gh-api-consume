import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { Route, Routes, NavLink, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { getProfileRepos } from "./store/profile/profileSlice";
import ProfileAvatar from "./components/ProfileAvatar";
import ProfileInfo from "./components/ProfileInfo";
import ProfileRepos from "./components/ProfileRepos";

function TransitionedRouter() {
  const selector = useAppSelector((state) => state.profile.info);
  const loginName = selector.login;
  const userName =
    selector.name != null ? selector.name : "Person's name not found";
  const profileLocation =
    selector.location != null ? selector.location : "Location not found";
  const profileRepos =
    selector.public_repos != null
      ? selector.public_repos + " repositories"
      : "Repositories not found";
  const profileCreatedDate = "Created at " + selector.created_at.slice(0, 10);
  const repos = useAppSelector((state) => state.profile.repos);

  // ! devastion.net/gh-api/
  const reposPaths = ["/", "/updated", "/stars", "/forks"];
  const reposMap = reposPaths.map((path) => (
    <Route
      key={path}
      path={"/gh-api/repos" + path}
      element={<ProfileRepos repos={repos} />}
    />
  ));

  return (
    <Routes>
      <Route
        path="/gh-api/info"
        element={
          <ProfileInfo
            login={loginName}
            name={userName}
            location={profileLocation}
            public_repos={profileRepos}
            created_at={profileCreatedDate}
          />
        }
      ></Route>
      {reposMap}
      <Route path="" element={<ProfileRepos repos={repos} />}></Route>
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
          to="/gh-api/info"
          color={themePalette === "dark" ? "success" : "primary"}
          sx={{ mx: 3, opacity: 0.4 }}
        >
          Profile Info
        </Button>

        <Button
          variant="text"
          component={NavLink}
          to="/gh-api/repos"
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
