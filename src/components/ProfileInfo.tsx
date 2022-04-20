import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GitHubIcon from "@mui/icons-material/GitHub";
import DateRangeIcon from "@mui/icons-material/DateRange";
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
  public_repos: string;
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
      <Item sx={{ display: "flex", alignItems: "center" }}>
        <EmojiEmotionsIcon color={color} sx={{ mr: 1 }} />
        {name}
      </Item>
      <Item sx={{ display: "flex", alignItems: "center" }}>
        <LocationOnIcon color={color} sx={{ mr: 1 }} />
        {location}
      </Item>
      <Item sx={{ display: "flex", alignItems: "center" }}>
        <GitHubIcon color={color} sx={{ mr: 1 }} />
        {public_repos}
      </Item>
      <Item sx={{ display: "flex", alignItems: "center" }}>
        <DateRangeIcon color={color} sx={{ mr: 1 }} />
        {created_at}
      </Item>
    </Stack>
  );
}
