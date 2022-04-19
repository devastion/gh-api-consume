import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Stack, styled, Paper, useTheme } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  minWidth: 250,
}));

type Props = {
  login: string;
  name: string;
  location: string;
  public_repos: number;
  created_at: string;
};

export default function ProfileInfo({
  login,
  name,
  location,
  public_repos,
  created_at,
}: Props) {
  const themePalette = useTheme().palette.mode;
  const color = themePalette === "dark" ? "success" : "primary";

  return (
    <Stack spacing={1} sx={{ mt: 1 }}>
      <Item sx={{ display: "flex", alignItems: "center" }}>
        <AccountCircleIcon color={color} sx={{ mr: 1 }} />
        {login}
      </Item>
    </Stack>
  );
}
