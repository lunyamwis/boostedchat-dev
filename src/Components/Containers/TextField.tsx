import React from "react";
import { Grid, Text, TextInput, TextInputProps } from "@mantine/core";

type Props = {
  title: string;
  textFieldProps: TextInputProps;
};

export function TextField({ title, textFieldProps }: Props) {
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
        <TextInput {...textFieldProps} />
      </Grid.Col>
    </Grid>
  );
}
