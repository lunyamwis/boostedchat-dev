import React from "react";
import {
  Avatar,
  Badge,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { formatChatDate, getRandomColor } from "../../../Utils/validator.util";
import { useSearchParams } from "react-router-dom";
import { GetThread } from "@/Interfaces/Instagram/Threads/thread.interface";

type Props = {
  setAvatarColor: React.Dispatch<React.SetStateAction<string>>;
  thread: GetThread;
};

export const mapStage = (stage: number) => {
  const stages = {
    "1": { value: "Rapport Building", color: "blue" },
    "2": { value: "Needs Assessment", color: "orange" },
    "3": { value: "Solution Presentation", color: "blue" },
    "4": { value: "Closing the sale", color: "teal" },
  };
  return stages[stage?.toString() as keyof typeof stages];
};

export function ThreadListItem({ setAvatarColor, thread }: Props) {
  const [searchParams, setSearchParam] = useSearchParams();
  const avatarColor = React.useRef(getRandomColor());
  const theme = useMantineTheme();

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
        onClick={() => {
          const mParams: Record<string, string> = {};
          for (let entry of searchParams.entries()) {
            mParams[entry[0]] = entry[1];
          }
          setSearchParam({ ...mParams, thread: thread.thread_id });
          setAvatarColor(avatarColor.current);
        }}
        style={{ flexWrap: "nowrap", width: "100%" }}
      >
        <Avatar color={avatarColor.current} style={{ flex: "0 1 auto" }}>
          {thread.username?.charAt(0).toUpperCase()}
        </Avatar>
        <Stack gap={12} style={{ flex: "1 1 auto", overflow: "hidden" }}>
          <Stack gap={2} style={{ flex: "1 1 auto", overflow: "hidden" }}>
            <Group justify="space-between">
              <Text style={{ flex: "0 3 auto" }}>{thread.username}</Text>
              <Text
                fz={12}
                c={
                  thread.unread_message_count > 0
                    ? theme.primaryColor
                    : "#8C8C8C"
                }
                fw={thread.unread_message_count > 0 ? 600 : 400}
                style={{ flex: "0 1 auto" }}
              >
                {thread?.last_message_at ? formatChatDate(thread?.last_message_at) : '-'}
              </Text>
            </Group>
            <Group justify="space-between" style={{ flexWrap: "nowrap" }}>
              <Text
                fz={12}
                c={thread.unread_message_count > 0 ? "#4C4C4C" : "#8C8C8C"}
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {thread.last_message_content}
              </Text>
              {thread.unread_message_count > 0 && ( // >0
                <Badge styles={{ label: { overflow: "initial" } }}>
                  {thread.unread_message_count}
                </Badge>
              )}
            </Group>
          </Stack>
          <Group>
            <Badge
              variant="light"
              radius="sm"
              color={thread?.stage ? mapStage(thread?.stage).color : 'gray'}
              styles={{
                label: {
                  fontWeight: 500,
                  textTransform: "capitalize",
                },
              }}
            >
              {mapStage(thread?.stage)?.value}
            </Badge>
            <Badge
              variant="light"
              radius="sm"
              styles={{
                label: {
                  fontWeight: 500,
                  textTransform: "capitalize",
                },
              }}
            >
              {thread.salesrep}
            </Badge>
            <Badge
              color={thread.assigned_to === "Human" ? "orange" : "teal"}
              variant="light"
              radius="sm"
              styles={{
                label: {
                  fontWeight: 500,
                  textTransform: "capitalize",
                },
              }}
            >
              {thread.assigned_to}
            </Badge>
          </Group>
        </Stack>
      </Group>
    </Stack>
  );
}
