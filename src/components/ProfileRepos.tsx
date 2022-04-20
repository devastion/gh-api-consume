import React from "react";
import { Box, useTheme, Stack, Link } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import LinkIcon from "@mui/icons-material/Link";

type Props = {
  repos: [
    {
      id: number;
      name: string;
      description: string;
      html_url: string;
    }
  ];
};

export default function ProfileRepos({ repos }: Props) {
  const themePalette = useTheme().palette.mode;
  const color = themePalette === "dark" ? "success" : "primary";

  const reposRender = repos.map((repo) => {
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
            {repo.description}
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

  return (
    <Stack
      spacing={1}
      sx={{
        mt: 1,
        display: "flex",
        flexFlow: "row wrap",
        // width: "auto",
        // justifyContent: "space-evenly",
      }}
    >
      {reposRender.length != 0
        ? reposRender
        : "Profile doesn't contain any repositories"}
    </Stack>
  );
}
