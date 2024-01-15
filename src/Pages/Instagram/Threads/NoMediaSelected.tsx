import { Stack, Text } from "@mantine/core";
import React from "react";

export function NoMediaSelected() {
  return (
    <Stack
      style={{
        height: "100%",
        backgroundColor: "#F9F8Fa",
      }}
      justify="center"
      align="center"
    >
      <Text style={{ textAlign: "center" }}>Select an item from the left</Text>
    </Stack>
  );
}
