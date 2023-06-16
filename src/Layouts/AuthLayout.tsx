import { Box, Divider, Grid, Stack, Text } from "@mantine/core";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { authPageData } from "../Pages/Auth";

export function AuthLayout() {
  const pages = Object.values(authPageData);
  const { pathname } = useLocation();
  return (
    <Grid sx={{ minHeight: "100vh", margin: 0 }}>
      <Grid.Col md={6} p={0}>
        <Box
          sx={{
            backgroundColor: "#f4f5fa",
            padding: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/*Logo comes here */}
        </Box>
      </Grid.Col>
      <Grid.Col md={6} p={0}>
        <Stack justify="center" align="center" h="100%" px={60}>
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
          <Box sx={{ marginTop: 16, width: "100%" }}>
            <Outlet />
          </Box>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
