import { useAuth } from "@/Context/AuthContext/AuthProvider";
import { Burger, Group, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";

export function AppHeader() {
  const smallScreen = useMediaQuery("(max-width: 768px)");
  const { isNavOpened, dispatch } = useAuth();
  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      <Group style={{ width: "100%" }}>
        {smallScreen && (
          <Burger
            opened={isNavOpened}
            onClick={() => {
              dispatch({ type: "TOGGLE_NAV" });
            }}
            size="sm"
            //color={theme.colors.gray[6]}
            mr="xl"
          />
        )}
        <Text id="app-header">Booksy</Text>
        <Group></Group>
      </Group>
    </div>
  );
}
