import React from "react";
import {
  Box,
  Divider,
  Flex,
  Grid,
  Loader,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { Loading } from "../../../../Components/UIState/Loading";
import { Error } from "../../../../Components/UIState/Error";
import { ThreadListItem } from "../ThreadListItem";
import { NoMediaSelected } from "../NoMediaSelected";
import { AssignedTabs } from "../AssignedTabs";
import { useCommonState } from "../Hooks/common.hooks";
import { ChatHeader } from "./Header";
import { DirectMessages } from "./DirectMessages";
import { useIntersection } from "@mantine/hooks";
import { SearchItem } from "../SearchItem";

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

  const containerRef = React.useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.5,
  });

  if (threadsQR.isError) {
    return (
      <Error
        onClickAction={() => threadsQR.refetch()}
        errorText="There was an error loading the threads"
      />
    );
  }

  React.useEffect(() => {
    if (entry?.isIntersecting) {
      threadsQR.fetchNextPage();
    }
  }, [entry?.isIntersecting]);

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
      <Grid.Col style={{ height: "100%" }} span={3} p={0}>
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
                <AssignedTabs count={threadsQR.data.pages[0].count} />
                <Divider />
              </Stack>
              {threadsQR.data.pages.length === 0 ? (
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
                  ref={containerRef}
                >
                  {threadsQR.data.pages.map((page, idx) => (
                    <React.Fragment key={idx}>
                      {page.messages.length > 0 && (
                        <>
                          <Text fz={13} ml={12} c="dimmed">
                            Messages
                          </Text>
                          {page.messages.map((message) => (
                            <Stack>
                              <SearchItem message={message} />
                            </Stack>
                          ))}
                        </>
                      )}
                      <Stack gap={0}>
                        {page.messages.length > 0 && (
                          <Text fz={13} ml={12} c="dimmed">
                            Threads
                          </Text>
                        )}
                        {page.results.map((thread) => (
                          <ThreadListItem
                            key={thread.id}
                            setAvatarColor={setCurrentAvatarColor}
                            thread={thread}
                          />
                        ))}
                      </Stack>
                    </React.Fragment>
                  ))}
                  {threadsQR.data.pages[threadsQR.data.pages.length - 1]
                    .next && (
                    <Stack align="center" ref={ref}>
                      <Loader size="sm" />
                      <Text style={{ textAlign: "center" }} fz={12} c="dimmed">
                        Loading more...
                      </Text>
                    </Stack>
                  )}
                </Box>
              )}
            </>
          )}
        </Stack>
      </Grid.Col>

      <Grid.Col span={9} p={0} style={{ height: "100%" }}>
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
