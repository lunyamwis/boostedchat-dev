import { Grid, Group, Text } from "@mantine/core";
import React from "react";

type Props = {
  title: string;
  required: boolean;
  children: React.ReactNode;
};

export function InputRow({ title, required, children }: Props) {
  return (
    <Grid
      align="center"
      columns={12}
      sx={{
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
        <Group spacing={5}>
          <Text
            sx={{
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {title}
          </Text>
          {required && (
            <Text sx={{ fontSize: "15px" }} color="red" component="span">
              *
            </Text>
          )}
        </Group>
      </Grid.Col>
      <Grid.Col span={9}>{children}</Grid.Col>
    </Grid>
  );
}
