import { Group, Text } from "@mantine/core";
import React from "react";

export function AppHeader() {
  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      <Group justify="space-between" style={{ width: "100%" }}>
        <Text id="app-header">Booksy</Text>
        <Group></Group>
      </Group>
    </div>
  );
}
