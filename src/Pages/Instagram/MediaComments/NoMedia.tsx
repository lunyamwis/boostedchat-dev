import { Stack, Text } from "@mantine/core";
import React from "react";

export function NoMedia() {
  return (
    <Stack sx={{ border: "1px solid #ced4da", height: "98%", borderRadius: 4 }}>
      <Stack
        sx={{
          borderRadius: 4,
          borderBottom: "1px solid #eee",
          backgroundColor: "#FFFFFF",
        }}
        py={16}
      >
        <Text pl={8} fw={500} fz={18}>
          Photos
        </Text>
      </Stack>
      <Stack justify="center" align="center" sx={{ height: "100%" }}>
        <Text>No media</Text>
      </Stack>
    </Stack>
  );
}
