import { Stack, Text } from "@mantine/core";
import React from "react";

export function NoComments() {
  return (
    <Stack
      sx={{
        height: "100%",
        backgroundColor: "#F9F8Fa",
      }}
      justify="center"
      align="center"
    >
      <Text sx={{ textAlign: "center" }}>No Comments</Text>
    </Stack>
  );
}
