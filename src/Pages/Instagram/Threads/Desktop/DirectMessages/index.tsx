import React from "react";
import { Grid, Stack } from "@mantine/core";
import { useDirectMessages } from "../../Hooks/direct_messages.hooks";
import { DirectMessagesHeader } from "./Header";
import { ThreadsBody } from "./Body";

type Props = {
  avatarColor: string;
};

export function DirectMessages({ avatarColor }: Props) {
  const {
    accountQR,
    threadQR,
    igThreadId,
    messagesQR,
    viewport,
    formattedThreads,
  } = useDirectMessages();

  return (
    <Stack justify="space-between" gap={0} style={{ height: "100%" }}>
      <DirectMessagesHeader
        igThreadId={igThreadId}
        accountQR={accountQR}
        avatarColor={avatarColor}
      />
      <Grid styles={{ inner: { height: "100%" } }} style={{ flex: 1 }}>
        <Grid.Col span={12}>
          <ThreadsBody
            threadQR={threadQR}
            viewport={viewport}
            formattedThreads={formattedThreads}
            accountQR={accountQR}
            messagesQR={messagesQR}
            avatarColor={avatarColor}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
