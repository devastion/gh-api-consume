import React from "react";
import { Box, useTheme, Paper, styled, Stack, Link } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import LinkIcon from "@mui/icons-material/Link";

type Props = {
  repos: [{ id: number; name: string; description: string; html_url: string }];
};

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  minWidth: 250,
  maxWidth: 350,
}));

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
          minWidth: 250,
          maxWidth: 350,
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LinkIcon color={color} sx={{ mr: 1 }} />
          <Link href={repo.html_url} underline="none" target="_blank">
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
        width: "auto",
        justifyContent: "flex-start",
      }}
    >
      {reposRender.length != 0
        ? reposRender
        : "Profile doesn't contain any repositories"}
    </Stack>
  );
}
