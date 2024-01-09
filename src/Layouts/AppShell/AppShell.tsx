import React from "react";
import { useState } from "react";
import {
  AppShell as MantineAppShell,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useNetwork } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import { SideNav } from "./SideNav";
import { ASIDE_WIDTH, SIDENAV_WIDTH } from "@/Constants/GeneralConstants";

export default function AppShell() {
  const [collapsed, setCollapsed] = React.useState(true);
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [navOpened, setNavOpened] = useState(false);

  const onlineStatus = useNetwork();

  return (
    <MantineAppShell
      padding={0}
      navbar={{
        width: collapsed ? ASIDE_WIDTH : SIDENAV_WIDTH,
        breakpoint: "sm",
        collapsed: { mobile: false },
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
      <MantineAppShell.Navbar p={0}>
        <SideNav
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          opened={navOpened}
          setOpened={setNavOpened}
        />
      </MantineAppShell.Navbar>
      <MantineAppShell.Main>
        <>{onlineStatus.online ? <Outlet /> : <>No network connection</>}</>
      </MantineAppShell.Main>
    </MantineAppShell>
  );
}
