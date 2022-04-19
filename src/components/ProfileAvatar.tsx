import React from "react";
import { Avatar } from "@mui/material";

type Props = {
  avatar_src: string;
};

export default function ProfileAvatar({ avatar_src }: Props) {
  return (
    <Avatar
      alt="Profile Avatar"
      src={avatar_src}
      sx={{ width: 175, height: 175, borderRadius: 50, mb: 5 }}
    />
  );
}
