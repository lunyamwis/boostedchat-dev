import React from "react";
import { Avatar, Group, Highlight, Stack, Text } from "@mantine/core";
import { formatChatDate, getRandomColor } from "../../../Utils/validator.util";
import { useSearchParams } from "react-router-dom";

type Props = {
  message: { sent_on: string; username: string; content: string };
};

export function SearchItem({ message }: Props) {
  const avatarColor = React.useRef(getRandomColor());
  const [searchParams] = useSearchParams();

  return (
    <Stack
      gap={0}
      style={{
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
        justify="space-between"
        align="start"
        onClick={() => {}}
        style={{ flexWrap: "nowrap", width: "100%" }}
      >
        <Avatar color={avatarColor.current} style={{ flex: "0 1 auto" }}>
          {message.username?.charAt(0).toUpperCase()}
        </Avatar>
        <Stack gap={12} style={{ flex: "1 1 auto", overflow: "hidden" }}>
          <Stack gap={2} style={{ flex: "1 1 auto", overflow: "hidden" }}>
            <Group justify="space-between">
              <Text style={{ flex: "0 3 auto" }}>{message.username}</Text>
              <Text fz={12} c="#8C8C8C" style={{ flex: "0 1 auto" }}>
                {formatChatDate(message.sent_on)}
              </Text>
            </Group>
            <Group justify="space-between" style={{ flexWrap: "nowrap" }}>
              <Highlight
                highlight={searchParams.get("q")?.split(" ") ?? []}
                fz={12}
                c="#8C8C8C"
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {message.content}
              </Highlight>
            </Group>
          </Stack>
        </Stack>
      </Group>
    </Stack>
  );
}
