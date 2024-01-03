import React from "react";
import {
  Avatar,
  Badge,
  Divider,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { formatChatDate, getRandomColor } from "../../../Utils/validator.util";
import { useSearchParams } from "react-router-dom";

type Props = {
  username: string;
  igThreadId: string;
  setAvatarColor: React.Dispatch<React.SetStateAction<string>>;
  unreadCount: number;
  lastMessage: string;
  lastMessageDate: string;
};

export function ThreadListItem({
  setAvatarColor,
  username,
  igThreadId,
  unreadCount,
  lastMessage,
  lastMessageDate,
}: Props) {
  const [_, setUsernameSearchParam] = useSearchParams();
  const avatarColor = React.useRef(getRandomColor());
  const theme = useMantineTheme();

  return (
    <Stack
      spacing={0}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#F9F8Fa",
        },
        width: "20px",
        maxWidth: "100%",
        minWidth: "100%",
      }}
      px={12}
    >
      <Group
        py={16}
        position="apart"
        onClick={() => {
          setUsernameSearchParam({ thread: igThreadId });
          setAvatarColor(avatarColor.current);
        }}
        sx={{ flexWrap: "nowrap", width: "100%" }}
      >
        <Avatar color={avatarColor.current} sx={{ flex: "0 1 auto" }}>
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <Stack spacing={2} sx={{ flex: "1 1 auto", overflow: "hidden" }}>
          <Group position="apart">
            <Text sx={{ flex: "0 3 auto" }}>{username}</Text>
            <Text
              fz={12}
              color={unreadCount > 0 ? theme.primaryColor : "#8C8C8C"}
              fw={unreadCount > 0 ? 600 : 400}
              sx={{ flex: "0 1 auto" }}
            >
              {formatChatDate(lastMessageDate)}
            </Text>
          </Group>
          <Group position="apart" sx={{ flexWrap: "nowrap" }}>
            <Text
              fz={12}
              color={unreadCount > 0 ? "#4C4C4C" : "#8C8C8C"}
              sx={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {lastMessage}
            </Text>
            {unreadCount > 0 && (
              <Badge styles={{ inner: { overflow: "initial" } }}>1</Badge>
            )}
          </Group>
        </Stack>
      </Group>
      <Divider m={0} color="#F0F0F0" />
    </Stack>
  );
}
