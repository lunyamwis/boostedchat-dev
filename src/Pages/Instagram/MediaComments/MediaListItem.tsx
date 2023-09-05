import React from "react";
import { Anchor, Avatar, Divider, Group, Stack, Text } from "@mantine/core";
import { getRandomColor } from "../../../Utils/validator.util";
import { MediaDetails } from ".";

type Props = {
  mediaName: string;
  mediaUrl: string;
  mediaId: string;
  setMediaDetails: React.Dispatch<React.SetStateAction<MediaDetails>>;
  setAvatarColor: React.Dispatch<React.SetStateAction<string>>;
};

export function MediaListItem({
  mediaName,
  mediaId,
  mediaUrl,
  setMediaDetails,
  setAvatarColor,
}: Props) {
  const avatarColor = React.useRef(getRandomColor());

  return (
    <Stack
      spacing={0}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#F9F8Fa",
        },
      }}
      px={12}
    >
      <Group
        py={16}
        position="apart"
        onClick={() => {
          setMediaDetails({
            mediaId: mediaId,
            mediaName: mediaName,
            mediaUrl: mediaUrl,
          });
          setAvatarColor(avatarColor.current);
        }}
        sx={{ flexWrap: "nowrap", width: "100%" }}
      >
        <Group sx={{ flexWrap: "nowrap", flex: "0 1 auto", width: "80%" }}>
          <Avatar
            color={avatarColor.current}
            src={mediaUrl}
            sx={{ flex: "0 1 auto" }}
          >
            {mediaName.charAt(0)}
          </Avatar>
          <Stack spacing={2} sx={{ flex: "1 1 auto", overflow: "hidden" }}>
            <Text sx={{ flex: "0 3 auto" }}>{mediaName}</Text>
            <Text
              fz={12}
              color="#8C8C8C"
              sx={{
                whiteSpace: "nowrap",
                flex: "0 3 auto",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
              component={Anchor}
            >
              {mediaUrl}
            </Text>
          </Stack>
        </Group>
        {/*
        <Text fz={12} color="#8C8C8C" sx={{ flex: "0 1 auto" }}>
          {formatChatDate(media.updated_on)}
        </Text>
          */}
      </Group>
      <Divider m={0} color="#F0F0F0" />
    </Stack>
  );
}
