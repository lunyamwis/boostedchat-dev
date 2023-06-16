import { Box, Divider, Grid, Stack, Text } from "@mantine/core";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { authPageData } from "../Pages/Auth";
import { useMediaQuery } from "../Hooks/useMediaQuery";

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
        backgroundColor: "#f4f5fa",
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
          <Text
            sx={(theme) => ({
              color: theme.colors.brand[6],
              fontSize: "2rem",
              lineHeight: 1.235,
              letterSpacing: 2.5,
              fontWeight: 500,
              marginBottom: 32,
              textAlign: "center",
              textTransform: "uppercase",
            })}
          >
            Boosted Chat
          </Text>
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
