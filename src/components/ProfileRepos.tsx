import React, { useEffect } from "react";
import { Box, useTheme, Stack, Link, Button } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import LinkIcon from "@mui/icons-material/Link";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

// interface SortedRepos {
//   repos: [
//     number,
//     {
//       id: number;
//       name: string;
//       description: string;
//       html_url: string;
//       updated_at: string;
//       forks_count: number;
//       stargazers_count: number;
//     }
//   ];
// }

export default function ProfileRepos() {
  const themePalette = useTheme().palette.mode;
  const color = themePalette === "dark" ? "success" : "primary";
  const location = useLocation().pathname;
  const MAX_LENGTH = 60;
  const descriptionLength = (description: string) => {
    return description.length >= 68
      ? `${description.substring(0, MAX_LENGTH)}...`
      : description;
  };
  const selector = useAppSelector((state) => state.profile.repos);

  // ! Fix types
  const sortByStars: (number | {})[] = [];
  const sortByDate: (number | {})[] = [];
  const sortByForks: (number | {})[] = [];
  selector.map((repo) => {
    sortByStars.push([repo.stargazers_count, repo]);
    sortByDate.push([new Date(repo.updated_at.slice(0, 10)), repo]);
    sortByForks.push([repo.forks_count, repo]);
  });
  sortByStars.sort(function (a: any, b: any) {
    return b[0] - a[0];
  });

  sortByDate.sort(function (a: any, b: any) {
    return b[0] - a[0];
  });

  sortByForks.sort(function (a: any, b: any) {
    return b[0] - a[0];
  });

  const sortedByStars = sortByStars.map((repo) => repo[1]);
  const sortedByDate = sortByDate.map((repo) => repo[1]);
  const sortedByForks = sortByForks.map((repo) => repo[1]);

  // * Repos Render - Render the array of repos
  const reposRender = (sortedBy: any) => {
    return sortedBy.map((repo: any) => {
      return (
        <Box
          sx={{
            height: "auto",
            backgroundColor: "transparent",
            px: 5,
            py: 3,
            mt: 1,
            width: 384,
          }}
          key={repo.id}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FolderIcon color={color} sx={{ mr: 1 }} />
            {repo.name}
          </Box>
          {repo.description != null ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                textAlign: "start",
                my: 1,
              }}
            >
              <DescriptionIcon color={color} sx={{ mr: 1 }} />
              {descriptionLength(repo.description)}
            </Box>
          ) : null}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LinkIcon color={color} sx={{ mr: 1 }} />
            <Link
              href={repo.html_url}
              underline="none"
              color={themePalette === "dark" ? "#66bb6a" : "#1976d2"}
              target="_blank"
            >
              Visit the repo
            </Link>
          </Box>
        </Box>
      );
    });
  };

  const render = () => {
    if (location === "/gh-api/repos") return reposRender(selector);
    if (location === "/gh-api/repos/stars") return reposRender(sortedByStars);
    if (location === "/gh-api/repos/updated") return reposRender(sortedByDate);
    if (location === "/gh-api/repos/forks") return reposRender(sortedByForks);
  };

  return (
    <>
      <Box sx={{ mt: 3, ".active": { opacity: 1 } }}>
        <Button
          variant="text"
          component={NavLink}
          to="/gh-api/repos/updated"
          color={color}
          sx={{ opacity: 0.5, px: 3 }}
        >
          UPDATED
        </Button>
        <Button
          variant="text"
          component={NavLink}
          to="/gh-api/repos/stars"
          color={color}
          sx={{ opacity: 0.5, px: 3 }}
        >
          STARS
        </Button>
        <Button
          variant="text"
          component={NavLink}
          to="/gh-api/repos/forks"
          color={color}
          sx={{ opacity: 0.5, px: 3 }}
        >
          FORKS
        </Button>
      </Box>
      <Stack
        spacing={1}
        sx={{
          mt: 1,
          display: "flex",
          flexFlow: "row wrap",
          width: "100%",
          // justifyContent: "space-evenly",
        }}
      >
        {reposRender.length != 0
          ? render()
          : "Profile doesn't contain any repositories"}
      </Stack>
    </>
  );
}
