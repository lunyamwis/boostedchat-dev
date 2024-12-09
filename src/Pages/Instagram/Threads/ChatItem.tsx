import { Avatar, Group, Stack, Text, Anchor } from "@mantine/core";
import React from "react";
import { IconVolume, IconShare, IconPhotoCog } from '@tabler/icons-react';

type Props = {
  userInitials: string;
  profilePicture: string | null;
  content: string;
  content_type: string | null;
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
  content_type,
  userNames,
  date,
  owner,
}: Props) {

  let show_content;

  switch (content_type) {
    case "voice_media":
      show_content = <>
        <IconVolume />
        <Anchor href={content} target="_blank" underline="hover">
          {content}
        </Anchor>
      </>
      break;
    case "media_share":
      show_content = <>
        <IconShare />
        <Anchor href={content} target="_blank" underline="hover">
          {content}
        </Anchor>
      </>
      break;

    case "media":
      show_content = <>
        <IconPhotoCog />
        <Anchor href={content} target="_blank" underline="hover">
          {content}
        </Anchor>
      </>
      break;

    case "text":
      show_content = <Text c="#262626" fz={14}>
      {content}
    </Text>
      break;

    default:
      console.log("other media", content_type, content)
      show_content = <Text c="#262626" fz={14}>
        {content}
      </Text>
      break;
  }


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
        {
          show_content
        }

        <Group justify="right">
          <Text c="dimmed" fz={12}>
            {date}
          </Text>
        </Group>
      </Stack>
    </Group>
  );
}
