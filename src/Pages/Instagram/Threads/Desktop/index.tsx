import React from "react";
import {
  Box,
  Divider,
  Flex,
  Grid,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { Loading } from "../../../../Components/UIState/Loading";
import { Error } from "../../../../Components/UIState/Error";
import { ThreadListItem } from "../ThreadListItem";
import { DirectMessages } from "../DirectMessages";
import { NoMediaSelected } from "../NoMediaSelected";
import { AssignedTabs } from "../AssignedTabs";
import { useCommonState } from "../Hooks/common.hooks";
import { ChatHeader } from "./Header";

export type ThreadDetails = {
  threadId: string;
  igThreadId: string;
  username: string;
  account_id: string;
};

export function DesktopThreads() {
  const [currentAvatarColor, setCurrentAvatarColor] = React.useState("");
  const { threadsQR, filterParams, setFilterParams, igThreadId } =
    useCommonState();

  if (threadsQR.isError) {
    return (
      <Error
        onClickAction={() => threadsQR.refetch()}
        errorText="There was an error loading the threads"
      />
    );
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
          pb={16}
          style={{
            height: "100%",
          }}
        >
          <ChatHeader
            setFilterParams={setFilterParams}
            filterParams={filterParams}
          />
          {threadsQR.isPending ? (
            <Loading />
          ) : (
            <>
              <Stack gap={0}>
                <AssignedTabs count={threadsQR.data.length} />
                <Divider />
              </Stack>
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
