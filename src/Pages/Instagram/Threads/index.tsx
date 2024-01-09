import React from "react";
import { useGetThreads } from "./Hooks/thread.hooks";
import {
  Box,
  Divider,
  Grid,
  Group,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { Loading } from "../../../Components/UIState/Loading";
import { Error } from "../../../Components/UIState/Error";
import { NoThreads } from "./NoThreads";
import { ThreadListItem } from "./ThreadListItem";
import { DirectMessages } from "./DirectMessages";
import { NoMediaSelected } from "./NoMediaSelected";
import { useSearchParams } from "react-router-dom";
import { ChatHeader } from "./Header";
import { AssignedTabs } from "./AssignedTabs";

export type ThreadDetails = {
  threadId: string;
  igThreadId: string;
  username: string;
  account_id: string;
};

export function Threads() {
  const [searchParams, _] = useSearchParams();
  const [igThreadId, setIgThreadId] = React.useState<string | null>(null);
  const [currentAvatarColor, setCurrentAvatarColor] = React.useState("");

  const threadsQR = useGetThreads();

  React.useEffect(() => {
    const id = searchParams.get("thread");
    setIgThreadId(id);
  }, [searchParams]);

  if (threadsQR.isPending) {
    return <Loading />;
  }

  if (threadsQR.isError) {
    return (
      <Error
        onClickAction={() => threadsQR.refetch()}
        errorText="There was an error loading the threads"
      />
    );
  }

  if (threadsQR.data.length === 0) {
    return <NoThreads />;
  }
  return (
    <Grid
      m={0}
      overflow="hidden"
      styles={{
        inner: {
          height: "100%",
          margin: 0,
        },
      }}
      style={{
        border: "1px solid #00000011",
        borderRadius: "4px",
        backgroundColor: "#FFFFFF",
        height: "98%",
      }}
    >
      <Grid.Col span={3} p={0}>
        <Stack
          py={16}
          style={{
            height: "100%",
          }}
        >
          <ChatHeader />
          <Stack gap={0}>
            <AssignedTabs />
            <Divider />
          </Stack>
          <Box
            component={ScrollArea}
            style={{
              height: 200,
              flexGrow: 1,
              backgroundColor: "#FFFFFF",
            }}
          >
            <Stack gap={0}>
              {threadsQR.data.map((thread) => (
                <ThreadListItem
                  igThreadId={thread.thread_id}
                  key={thread.id}
                  username={thread.username}
                  unreadCount={thread.unread_message_count}
                  lastMessage={thread.last_message_content}
                  lastMessageDate={thread.last_message_at}
                  setAvatarColor={setCurrentAvatarColor}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Grid.Col>

      <Grid.Col span={9} p={0}>
        <Box
          style={{
            borderRadius: 16,
            height: "100%",
          }}
        >
          {igThreadId == null ? (
            <NoMediaSelected />
          ) : (
            <DirectMessages avatarColor={currentAvatarColor} />
          )}
        </Box>
      </Grid.Col>
    </Grid>
  );
}
