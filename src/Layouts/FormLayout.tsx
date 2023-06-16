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
      <Grid.Col span={span} sx={{}}>
        <Box
          sx={(theme) => ({
            boxShadow: "0px 3px 8px -1px #3232470d",
            border: `solid 1px ${theme.colors.gray[2]}`,
            marginLeft: 40,
            marginRight: 40,
            borderRadius: 12,
          })}
        >
          <Stack
            spacing={0}
            sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
          >
            <Group
              sx={(theme) => ({
                overflow: "hidden",
                backgroundColor: theme.fn.lighten(theme.colors.brand[2], 0.82),
                paddingTop: 21,
                paddingBottom: 21,
                paddingLeft: 20,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              })}
            >
              <Text sx={{ fontSize: 18 }}>{title}</Text>
              <Text sx={{ pl: 0.5 }} color="text.secondary">
                {subTitle}
              </Text>
            </Group>
            <Stack
              sx={{
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
