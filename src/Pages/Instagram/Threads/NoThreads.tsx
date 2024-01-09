import { Stack, Text } from "@mantine/core";
import React from "react";

export function NoThreads() {
  return (
    <Stack
      style={{ border: "1px solid #ced4da", height: "98%", borderRadius: 4 }}
    >
      <Stack
        style={{
          borderRadius: 4,
          borderBottom: "1px solid #eee",
          backgroundColor: "#FFFFFF",
        }}
        py={16}
      >
        <Text pl={8} fw={500} fz={18}>
          Threads
        </Text>
      </Stack>
      <Stack justify="center" align="center" style={{ height: "100%" }}>
        <Text>No threads</Text>
      </Stack>
    </Stack>
  );
}
