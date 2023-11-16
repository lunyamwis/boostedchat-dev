import { Group, GroupPosition } from "@mantine/core";
import React from "react";

export function ButtonRow({
  children,
  position = "center",
}: {
  children: React.ReactNode;
  position?: GroupPosition;
}) {
  return (
    <Group
      position={position}
      align="center"
      sx={{
        backgroundColor: "#fffbfb",
        borderRadius: "12px",
        paddingTop: 20,
        paddingBottom: 30,
      }}
    >
      {children}
    </Group>
  );
}
