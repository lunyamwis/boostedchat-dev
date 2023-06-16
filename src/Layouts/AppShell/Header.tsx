import {
  Avatar,
  Burger,
  Group,
  Header,
  MediaQuery,
  Menu,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { Settings } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { HEADER_HEIGHT, SIDENAV_WIDTH } from "../../Constants/GeneralConstants";
import { useAuth } from "../../Context/AuthContext/AuthProvider";

type Props = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AppHeader({ opened, setOpened }: Props) {
  const { dispatch } = useAuth();
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
          <Text id="app-header">App Title</Text>
          <Group>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar color="brand" src={null} size="md" />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item
                  onClick={() => dispatch({ type: "LOGOUT" })}
                  icon={<Settings size={14} />}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </div>
    </Header>
  );
}
