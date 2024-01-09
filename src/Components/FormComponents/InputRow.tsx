import { Grid, Group, Text } from "@mantine/core";
import React from "react";

type Props = {
  title: string;
  required?: boolean;
  children: React.ReactNode;
};

export function InputRow({ title, required = false, children }: Props) {
  return (
    <Grid
      align="center"
      columns={12}
      style={{
        "&:hover": {
          backgroundColor: "#F5F7F9",
        },
        margin: 0,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 40,
        paddingRight: 60,
      }}
    >
      <Grid.Col span={3}>
        <Group gap={5}>
          <Text
            style={{
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {title}
          </Text>
          {required && (
            <Text style={{ fontSize: "15px" }} c="red" component="span">
              *
            </Text>
          )}
        </Group>
      </Grid.Col>
      <Grid.Col span={9}>{children}</Grid.Col>
    </Grid>
  );
}
