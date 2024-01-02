import React from "react";
import { useGetThreads } from "./Hooks/thread.hooks";
import { Box, Divider, Grid, ScrollArea, Stack, Text } from "@mantine/core";
import { Loading } from "../../../Components/UIState/Loading";
import { Error } from "../../../Components/UIState/Error";
import { NoThreads } from "./NoThreads";
import { ThreadListItem } from "./ThreadListItem";
import { DirectMessages } from "./DirectMessages";
import { NoMediaSelected } from "./NoMediaSelected";

export type ThreadDetails = {
  threadId: string;
  igThreadId: string;
  username: string;
  account_id: string;
};

export function Threads() {
  const [currentAvatarColor, setCurrentAvatarColor] = React.useState("");
  const [threadDetails, setThreadDetails] =
    React.useState<ThreadDetails | null>(null);

  const threadsQR = useGetThreads();

  if (threadsQR.isLoading) {
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
      my={8}
      mx={16}
      sx={{
        borderRadius: "4px",
        border: "1px solid #e9e9e9",
        backgroundColor: "#FFFFFF",
        height: "98%",
      }}
    >
      <Grid.Col sm={3} p={0}>
        <Stack
          py={16}
          sx={{
            height: "100%",
            borderRight: "1px solid #f0f0f0",
          }}
        >
          <Text pl={8} fw={500} fz={18}>
            Threads
          </Text>
          <Divider />
          <Box
            component={ScrollArea}
            sx={{ height: 200, flexGrow: 1, backgroundColor: "#FFFFFF" }}
          >
            <Stack spacing={0}>
              {threadsQR.data.map((thread) => (
                <ThreadListItem
                  key={thread.id}
                  threadDetails={{
                    threadId: thread.id,
                    igThreadId: thread.thread_id,
                    username: thread.username,
                    account_id: thread.account_id,
                  }}
                  unreadCount={thread.unread_message_count}
                  lastMessage={thread.last_message_content}
                  lastMessageDate={thread.last_message_at}
                  setThreadDetails={setThreadDetails}
                  setAvatarColor={setCurrentAvatarColor}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Grid.Col>

      <Grid.Col sm={9} p={0}>
        <Box
          sx={{
            borderRadius: 16,
            height: "100%",
          }}
        >
          {threadDetails == null ? (
            <NoMediaSelected />
          ) : (
            <DirectMessages
              threadDetails={threadDetails}
              avatarColor={currentAvatarColor}
            />
          )}
        </Box>
      </Grid.Col>
    </Grid>
  );
}
