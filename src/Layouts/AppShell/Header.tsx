import {
  Burger,
  Group,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import { HEADER_HEIGHT, SIDENAV_WIDTH } from "../../Constants/GeneralConstants";

type Props = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AppHeader({ opened, setOpened }: Props) {
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <Header
      // sx={{ width: `calc(100% - ${SIDENAV_WIDTH}px)` }}
      height={{ base: 50, md: HEADER_HEIGHT }}
      p="md"
      ml={smallScreen ? 0 : SIDENAV_WIDTH}
    >
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Group position="apart" sx={{ width: "100%" }}>
          <Text id="app-header">Boosted Chat</Text>
          <Group></Group>
        </Group>
      </div>
    </Header>
  );
}
