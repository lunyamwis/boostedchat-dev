import { Group, Text, ThemeIcon, useMantineTheme } from "@mantine/core";
import React from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { EGroup, GroupIcons } from "../../Pages";

type Props = {
  title: string;
  isGroupOpened: boolean;
  setIsGroupOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function GroupTitle({ title, isGroupOpened, setIsGroupOpened }: Props) {
  const theme = useMantineTheme();

  const GroupIcon = GroupIcons[title as EGroup];

  return (
    <Group
      onClick={() => setIsGroupOpened(!isGroupOpened)}
      position="apart"
      sx={{
        cursor: "pointer",
        flexWrap: "nowrap",
        borderRight: isGroupOpened
          ? `2px solid ${theme.colors.brand[6]}`
          : "2px solid transparent",
        backgroundColor: isGroupOpened
          ? theme.fn.lighten("#00D0FF", 0.9)
          : "transparent",
        "&:hover": {
          backgroundColor: theme.fn.lighten("#00D0FF", 0.96),
        },
      }}
      px={16}
      py={12}
    >
      <Group>
        <ThemeIcon radius="md" variant="light" size="lg">
          <GroupIcon size={16} />
        </ThemeIcon>
        <Text
          sx={{
            fontSize: "15px",
            fontWeight: 500,
            color: "#212121",
          }}
        >
          {title}
        </Text>
      </Group>
      <IconChevronRight
        size={14}
        strokeWidth={2}
        color={isGroupOpened ? theme.colors.brand[6] : "#000000"}
        style={{
          transition: "0.2s",
          transform: isGroupOpened ? "rotate(90deg)" : "rotate(0)",
        }}
      />
    </Group>
  );
}
