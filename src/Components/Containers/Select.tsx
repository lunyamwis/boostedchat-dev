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
    <Grid gutter={16} style={{ margin: 0 }} align="center">
      <Grid.Col py={0} pl={16} pr={0} span={5}>
        <Text
          style={{ fontSize: "0.875rem", fontWeight: 500, textAlign: "right" }}
        >
          {title}:
        </Text>
      </Grid.Col>
      <Grid.Col py={0} pl={16} pr={0} span={7}>
        <MantineSelect {...selectProps} />
      </Grid.Col>
    </Grid>
  );
}
