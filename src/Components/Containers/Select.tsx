import React from "react";
import {
  Grid,
  Select as MantineSelect,
  SelectProps,
  Text,
} from "@mantine/core";

type Props = {
  title: string;
  selectProps: SelectProps;
};

export function Select({ title, selectProps }: Props) {
  return (
    <Grid gutter={16} sx={{ margin: 0 }} align="center">
      <Grid.Col py={0} pl={16} pr={0} sm={5}>
        <Text
          sx={{ fontSize: "0.875rem", fontWeight: 500, textAlign: "right" }}
        >
          {title}:
        </Text>
      </Grid.Col>
      <Grid.Col py={0} pl={16} pr={0} sm={7}>
        <MantineSelect {...selectProps} />
      </Grid.Col>
    </Grid>
  );
}
