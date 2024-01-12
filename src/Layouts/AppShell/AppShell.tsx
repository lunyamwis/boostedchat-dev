import React from "react";
import {
  AppShell as MantineAppShell,
  Box,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery, useNetwork } from "@mantine/hooks";
import { Outlet, useLocation } from "react-router-dom";
import { SideNav } from "./SideNav";
import {
  ASIDE_WIDTH,
  HEADER_HEIGHT,
  SIDENAV_WIDTH,
} from "@/Constants/GeneralConstants";
import { pageData } from "@/Pages";
import { AppHeader } from "./Header";
import { useAuth } from "@/Context/AuthContext/AuthProvider";

export default function AppShell() {
  const { isNavOpened } = useAuth();
  const smallScreen = useMediaQuery("(max-width: 768px)");
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [collapsed, setCollapsed] = React.useState(true);

  const onlineStatus = useNetwork();

  const location = useLocation();

  return (
    <MantineAppShell
      padding={0}
      navbar={{
        width: collapsed ? ASIDE_WIDTH : SIDENAV_WIDTH,
        breakpoint: "sm",
        collapsed: { mobile: !isNavOpened },
      }}
      styles={{
        main: {
          height: "100dvh",
          transition: "0.2s",
          position: "relative",
          background: colorScheme === "dark" ? theme.colors.dark[8] : "#fafafa",
        },
        navbar: {
          backgroundColor: "transparent",
          transition: "0.2s",
        },
      }}
    >
      {location.pathname !== pageData.Threads.url && (
        <MantineAppShell.Header
          h={{ base: 50, md: HEADER_HEIGHT }}
          p="md"
          bg="#ffffff"
          ml={smallScreen ? 0 : collapsed ? ASIDE_WIDTH : SIDENAV_WIDTH}
        >
          <AppHeader />
        </MantineAppShell.Header>
      )}
      <MantineAppShell.Navbar p={0}>
        <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
      </MantineAppShell.Navbar>
      <MantineAppShell.Main
        pt={location.pathname === pageData.Threads.url ? 0 : HEADER_HEIGHT}
      >
        <Box h="100%" p={location.pathname === pageData.Threads.url ? 0 : 16}>
          {onlineStatus.online ? <Outlet /> : <>No network connection</>}
        </Box>
      </MantineAppShell.Main>
    </MantineAppShell>
  );
}
