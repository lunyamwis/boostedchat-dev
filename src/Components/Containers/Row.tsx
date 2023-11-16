import React from "react";
import { Grid } from "@mantine/core";

type TRowProps = {
  title?: string;
  children: React.ReactNode;
};

export function Row({ children }: TRowProps) {
  return (
    <Grid
      justify="center"
      sx={{
        borderTop: "solid 1px #F3F4F8",
        borderBottom: "solid 1px #F3F4F8",
        padding: 20,
        margin: 0,
      }}
    >
      {children}
    </Grid>
  );
}
