import React from "react";
import { Box, Grid, Group, Stack, Text } from "@mantine/core";

type ComponentProps = {
  children: React.ReactNode;
  span: number;
  title: string;
  subTitle?: string;
};
export function FormLayout({
  children,
  span,
  title,
  subTitle,
}: ComponentProps) {
  return (
    <Grid m={0} justify="center">
      <Grid.Col span={span} style={{ width: "100%" }}>
        <Box
          style={(theme) => ({
            boxShadow: "0px 3px 8px -1px #3232470d",
            border: `solid 1px ${theme.colors.gray[2]}`,
            marginLeft: 40,
            marginRight: 40,
            borderRadius: 12,
          })}
        >
          <Stack
            gap={0}
            style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
          >
            <Group
              style={(theme) => ({
                overflow: "hidden",
                backgroundColor: theme.colors.brand[5],
                paddingTop: 21,
                paddingBottom: 21,
                paddingLeft: 20,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              })}
            >
              <Text style={{ fontSize: 18, color: "#FFF" }}>{title}</Text>
              <Text style={{ pl: 0.5 }} c="text.secondary">
                {subTitle}
              </Text>
            </Group>
            <Stack
              style={{
                backgroundColor: "white",
                paddingTop: 20,
                borderBottomRightRadius: 12,
                borderBottomLeftRadius: 12,
              }}
            >
              {children}
            </Stack>
          </Stack>
        </Box>
      </Grid.Col>
    </Grid>
  );
}
