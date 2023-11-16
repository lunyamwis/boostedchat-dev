import { Box, Divider, Grid, Group, Stack } from "@mantine/core";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { authPageData } from "../Pages/Auth";
import { useMediaQuery } from "../Hooks/useMediaQuery";
import { Logo } from "../Assets/Logo";

export function AuthLayout() {
  const pages = Object.values(authPageData);
  const { pathname } = useLocation();
  const { fromMdToXl, toXsScreen } = useMediaQuery();
  return (
    <Grid
      sx={{
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        backgroundColor: "#fafafa",
      }}
    >
      <Grid.Col lg={4} xl={3} md={4} sm={6} p={0}>
        <Stack
          sx={{
            margin: toXsScreen ? "0px 20px" : "0px 0px",
            backgroundColor: "#FFF",
            borderRadius: "12px",
            padding: fromMdToXl ? "48px 24px" : "48px 24px",
            boxShadow: "0 12px 40px rgb(0 0 0 / 12%)",
          }}
        >
          <Group position="center">
            <Logo />
            {/*
            <Image width={100} src={Logo} />
            */}
          </Group>
          <Box sx={{ mb: 2, px: 10, width: "100%" }}>
            <Divider
              my="xs"
              label={
                pages.find((page) => page.url === pathname)?.description ??
                "Welcome"
              }
              labelPosition="center"
            />
          </Box>
          <Box sx={{ marginTop: 16, width: "100%" }} px={toXsScreen ? 0 : 48}>
            <Outlet />
          </Box>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
