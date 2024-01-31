import { HEADER_HEIGHT } from "@/Constants/GeneralConstants";
import { useAuth } from "@/Context/AuthContext/AuthProvider";
import { ActionIcon, Burger, Group, Text } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import React from "react";

type Props = {};

export function Header({}: Props) {
  const { isNavOpened, dispatch } = useAuth();
  return (
    <Group
      px="md"
      justify="space-between"
      style={{
        height: HEADER_HEIGHT,
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #dee2e6",
      }}
    >
      <Group>
        <Burger
          size="sm"
          opened={isNavOpened}
          onClick={() => dispatch({ type: "TOGGLE_NAV" })}
        />
        <Text
          style={{
            fontWeight: 600,
            fontSize: 18,
          }}
        >
          Conversations
        </Text>
      </Group>

      <ActionIcon variant="light">
        <IconFilter size={17} />
      </ActionIcon>
    </Group>
  );
}
