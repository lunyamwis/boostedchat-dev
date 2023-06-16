import React from "react";
import { useState } from "react";
import { AppShell as MantineAppShell, useMantineTheme } from "@mantine/core";
import { useNetwork } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./Header";
import { SideNav } from "./SideNav";

export default function AppShell() {
  const theme = useMantineTheme();
  const [navOpened, setNavOpened] = useState(false);

  const onlineStatus = useNetwork();

  return (
    <MantineAppShell
      styles={{
        main: {
          position: "relative",
          background: theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<SideNav opened={navOpened} setOpened={setNavOpened} />}
      header={<AppHeader opened={navOpened} setOpened={setNavOpened} />}
    >
      <>{onlineStatus.online ? <Outlet /> : <>No network connection</>}</>
    </MantineAppShell>
  );
}
