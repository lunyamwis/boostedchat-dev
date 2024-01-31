import React from "react";
import { Grid, Stack } from "@mantine/core";
import { useDirectMessages } from "../../Hooks/direct_messages.hooks";
import { DirectMessagesHeader } from "./Header";
import { ThreadsBody } from "./Body";
import { AccountDetails } from "./AccountDetails";

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
      <Grid
        styles={{ inner: { height: "100%" } }}
        style={{ flex: 1, margin: 0 }}
        overflow="hidden"
        gutter={0}
      >
        <Grid.Col style={{ height: "100%" }} span={8}>
          <ThreadsBody
            threadQR={threadQR}
            viewport={viewport}
            formattedThreads={formattedThreads}
            accountQR={accountQR}
            messagesQR={messagesQR}
            avatarColor={avatarColor}
          />
        </Grid.Col>
        <Grid.Col style={{ height: "100%" }} span={4}>
          <AccountDetails accountQR={accountQR} avatarColor={avatarColor} />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
