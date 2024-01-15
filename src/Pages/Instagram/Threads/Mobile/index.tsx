import { Box, Flex, ScrollArea, Stack, Text } from "@mantine/core";
import React from "react";
import { Header } from "./Header";
import { useCommonState } from "../Hooks/common.hooks";
import { Loading } from "@/Components/UIState/Loading";
import { ThreadListItem } from "../ThreadListItem";
import { Error } from "@/Components/UIState/Error";
import { MobileDirectMessages } from "./DirectMessages";

export function MobileThreads() {
  const [currentAvatarColor, setCurrentAvatarColor] = React.useState("");

  const { threadsQR, igThreadId } = useCommonState();

  if (threadsQR.isError) {
    return (
      <Error
        onClickAction={() => threadsQR.refetch()}
        errorText="There was an error loading the threads"
      />
    );
  }

  return (
    <Stack h="100%" gap={0}>
      {igThreadId == null ? (
        <>
          <Header />

          {threadsQR.isPending ? (
            <Loading />
          ) : (
            <>
              {threadsQR.data.length === 0 ? (
                <Flex h="100%" justify="center" align="center">
                  <Text c="#444444" fz={14}>
                    No threads
                  </Text>
                </Flex>
              ) : (
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
                        key={thread.id}
                        setAvatarColor={setCurrentAvatarColor}
                        thread={thread}
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </>
          )}
        </>
      ) : (
        <MobileDirectMessages avatarColor={currentAvatarColor} />
      )}
    </Stack>
  );
}
