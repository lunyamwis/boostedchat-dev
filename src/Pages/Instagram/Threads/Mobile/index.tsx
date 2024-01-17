import { Box, Flex, Loader, ScrollArea, Stack, Text } from "@mantine/core";
import React from "react";
import { Header } from "./Header";
import { useCommonState } from "../Hooks/common.hooks";
import { Loading } from "@/Components/UIState/Loading";
import { ThreadListItem } from "../ThreadListItem";
import { Error } from "@/Components/UIState/Error";
import { MobileDirectMessages } from "./DirectMessages";
import { SearchItem } from "../SearchItem";
import { useIntersection } from "@mantine/hooks";

export function MobileThreads() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.5,
  });

  const [currentAvatarColor, setCurrentAvatarColor] = React.useState("");

  const { threadsQR, igThreadId } = useCommonState();

  React.useEffect(() => {
    if (entry?.isIntersecting) {
      threadsQR.fetchNextPage();
    }
  }, [entry?.isIntersecting]);

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
        </>
      ) : (
        <MobileDirectMessages avatarColor={currentAvatarColor} />
      )}
    </Stack>
  );
}
