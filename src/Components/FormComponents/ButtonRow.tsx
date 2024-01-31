import { Group, lighten, useMantineTheme } from "@mantine/core";
import React from "react";

export function ButtonRow({
  children,
  position = "center",
}: {
  children: React.ReactNode;
  position?: React.CSSProperties["justifyContent"];
}) {
  const theme = useMantineTheme();
  return (
    <Group
      justify={position}
      align="center"
      style={{
        backgroundColor: lighten(theme.colors.brand[6], 0.96),
        borderRadius: "12px",
        paddingTop: 20,
        paddingBottom: 30,
      }}
    >
      {children}
    </Group>
  );
}
