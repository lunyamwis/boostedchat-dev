import React from "react";
import { Avatar, Divider, Group, Stack, Text } from "@mantine/core";
import { getRandomColor } from "../../../Utils/validator.util";
import { ThreadDetails } from ".";

type Props = {
  setThreadDetails: React.Dispatch<React.SetStateAction<ThreadDetails | null>>;
  threadDetails: ThreadDetails;
  setAvatarColor: React.Dispatch<React.SetStateAction<string>>;
};

export function ThreadListItem({
  setAvatarColor,
  threadDetails,
  setThreadDetails,
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
          setAvatarColor(avatarColor.current);
          setThreadDetails(threadDetails);
        }}
        sx={{ flexWrap: "nowrap", width: "100%" }}
      >
        <Group sx={{ flexWrap: "nowrap", flex: "0 1 auto", width: "80%" }}>
          <Avatar color={avatarColor.current} sx={{ flex: "0 1 auto" }}>
            {threadDetails.username.charAt(0).toUpperCase()}
          </Avatar>
          <Stack spacing={2} sx={{ flex: "1 1 auto", overflow: "hidden" }}>
            <Text sx={{ flex: "0 3 auto" }}>{threadDetails.username}</Text>
          </Stack>
        </Group>
      </Group>
      <Divider m={0} color="#F0F0F0" />
    </Stack>
  );
}
