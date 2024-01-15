import { Avatar, Group, Stack, Text } from "@mantine/core";
import React from "react";

type Props = {
  userInitials: string;
  profilePicture: string | null;
  content: string;
  avatarColor: string;
  userNames: string;
  date: string;
  owner: "system" | "lead";
};

export function ChatItem({
  avatarColor,
  profilePicture,
  userInitials,
  content,
  userNames,
  date,
  owner,
}: Props) {
  return (
    <Group
      style={{
        flexWrap: "nowrap",
        flexDirection: owner === "lead" ? "row" : "row-reverse",
      }}
    >
      <Avatar src={profilePicture} color={avatarColor}>
        {userInitials}
      </Avatar>
      <Stack
        gap={3}
        p={8}
        style={{
          backgroundColor: "white",
          borderRadius: 8,
        }}
      >
        <Text fz={12} c={avatarColor}>
          {userNames}
        </Text>
        <Text c="#262626" fz={14}>
          {content}
        </Text>
        <Group justify="right">
          <Text c="dimmed" fz={12}>
            {date}
          </Text>
        </Group>
      </Stack>
    </Group>
  );
}
