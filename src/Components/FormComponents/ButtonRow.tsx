import { Group } from "@mantine/core";
import React from "react";

export function ButtonRow({
  children,
  position = "center",
}: {
  children: React.ReactNode;
  position?: React.CSSProperties["justifyContent"];
}) {
  return (
    <Group
      justify={position}
      align="center"
      style={{
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
