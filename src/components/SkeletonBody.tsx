import React from "react";
import { Skeleton, Stack } from "@mui/material";
import { useAppSelector } from "../store/hooks";

export default function SkeletonBody() {
  const isPending =
    useAppSelector((state) => state.profile.loading) === "pending";

  if (isPending) {
    return (
      <Stack
        maxWidth={500}
        spacing={1}
        mt={10}
        mx="auto"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Skeleton variant="circular" width={200} height={200} />
        <Skeleton variant="text" width="100%" height={100} />
        <Skeleton variant="rectangular" width="100%" height={250} />
      </Stack>
    );
  }
  return <></>;
}
