import React from "react";
import classes from "./Layout.module.css";
import { Box, Divider, Flex, Group, Stack } from "@mantine/core";
import { Outlet, useLocation } from "react-router-dom";
import { authPageData } from "../Pages/Auth";
import { useMediaQuery } from "../Hooks/useMediaQuery";
import { Logo } from "../Assets/Logo";

export function AuthLayout() {
  const pages = Object.values(authPageData);
  const { pathname } = useLocation();
  const { fromMdToXl, toXsScreen } = useMediaQuery();

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        minHeight: "100vh",
        margin: 0,
        backgroundColor: "#fafafa",
      }}
    >
      <Stack
        className={classes.authContainer}
        style={{
          margin: toXsScreen ? "0px 20px" : "0px 0px",
          backgroundColor: "#FFF",
          borderRadius: "12px",
          padding: fromMdToXl ? "48px 24px" : "48px 24px",
          boxShadow: "0 12px 40px rgb(0 0 0 / 12%)",
        }}
      >
        <Group justify="center">
          <Logo />
          {/*
            <Image width={100} src={Logo} />
            */}
        </Group>
        <Box style={{ mb: 2, px: 10, width: "100%" }}>
          <Divider
            my="xs"
            label={
              pages.find((page) => page.url === pathname)?.description ??
              "Welcome"
            }
            labelPosition="center"
          />
        </Box>
        <Box style={{ marginTop: 16, width: "100%" }} px={toXsScreen ? 0 : 48}>
          <Outlet />
        </Box>
      </Stack>
    </Flex>
  );
}
