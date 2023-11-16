import { Grid, Stack } from "@mantine/core";
import React from "react";

type ComponentProps = {
  col?: number;
  children?: React.ReactNode;
  single?: boolean;
};

export function Column({ col, children, single = false }: ComponentProps) {
  return (
    <Grid.Col span={single ? 9 : 5} sx={{ paddingLeft: col === 2 ? 3 : 0 }}>
      <Stack>{children}</Stack>
    </Grid.Col>
  );
}
