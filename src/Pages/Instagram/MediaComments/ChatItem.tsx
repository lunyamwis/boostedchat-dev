import { Avatar, Group, Stack, Text } from "@mantine/core";
import React from "react";

type Props = {
  userInitials: string;
  profilePicture: string | null;
  content: string;
  avatarColor: string;
  userNames: string;
  date: string;
};

export function ChatItem({
  avatarColor,
  profilePicture,
  userInitials,
  content,
  userNames,
  date,
}: Props) {
  return (
    <Group sx={{ flexWrap: "nowrap" }}>
      <Avatar src={profilePicture} color={avatarColor}>
        {userInitials}
      </Avatar>
      <Stack
        spacing={3}
        p={8}
        sx={{
          backgroundColor: "white",
          borderRadius: 8,
        }}
      >
        <Text fz={12} color={avatarColor}>
          {userNames}
        </Text>
        <Text color="#262626" fz={14}>
          {content}
        </Text>
        <Group position="right">
          <Text color="dimmed" fz={12}>
            {date}
          </Text>
        </Group>
      </Stack>
    </Group>
  );
}
