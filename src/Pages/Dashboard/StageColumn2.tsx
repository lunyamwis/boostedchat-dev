import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  ScrollArea,
  Box,
  Title,
  Stack,
  Text,
  Loader
} from "@mantine/core";
import AccountCard from "./AccountCard";
import { Error } from "../../Components/UIState/Error";
import { useIntersection } from "@mantine/hooks";
import { useCommonState } from "../Instagram/Account/Hooks/common.hooks";
import { Loading } from "@/Components/UIState/Loading";
export function StageColumn2({ stage, index }: { stage: string, index: number }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentStage] = useState(stage);
  const { fetQR } = useCommonState(stage);
  const [selectedMessage, setSelectedMessage] = useState<{
    username: string;
    assignedTo: string;
    lastMsgSentAt: string;
    msgSentBy: string;
  } | null>(null);
  const openDrawer = (messageDetails: {
    username: string;
    assignedTo: string;
    lastMsgSentAt: string;
    msgSentBy: string;
  }) => {
    setSelectedMessage(messageDetails);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedMessage(null);
  };

  // const threadsQR = useGetThreads(formattedFilterParams);
  // const fetQR =  getInfiniteAccountsByStage(stage);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.5,
  });

  React.useEffect(() => {
    if (entry?.isIntersecting) {
      console.log("Intersecting");
      fetQR.fetchNextPage();
    }
  }, [entry?.isIntersecting]);

  console.log("entry?.isIntersecting");
  console.log(entry?.isIntersecting);

  if (fetQR.isError) {
    console.log(fetQR.error);
    return (
      <Error
        onClickAction={() => fetQR.refetch()}
        errorText="There was aln error loading the threads"
      />
    );
  }

  // if (fetQR.isFetched) {
  //   console.log("fetQR.data?.pages[0]");
  //   console.log(fetQR.data?.pages[0]);

  // }

  // Initialize queries only once per stage
  // useEffect(() => {
  //   useInfiniteQuery(
  //     {
  //       queryKey: ["accounts", stage],
  //       queryFn: ({ pageParam = 1 }) => useGetAccountsByStageDirectly(stage, pageParam),
  //       initialPageParam: 1,
  //       getNextPageParam: (lastPage, _, lastPageParam) => {
  //         if (lastPage.results.length === 0) {
  //           return undefined;
  //         }
  //         return lastPageParam + 1;
  //       },
  //       getPreviousPageParam: (_, p, firstPageParam) => {
  //         console.log(p);
  //         if (firstPageParam <= 1) {
  //           return undefined;
  //         }
  //         return firstPageParam - 1;
  //       },
  //     }
  //   );
  //   // }
  // }
  // );


  return (
    <>
      <Box
        key={index}
        // ref={containerRef}
        style={{
          minWidth: "300px",
          backgroundColor: "#f8f9fa",
          padding: "10px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          height: "100vh", // This ensures the column takes up the full height of the screen
          overflowY: "auto", // Enable vertical scrolling for each column
          marginRight: "10px", // Optional: adds space between columns
        }}
        ref={containerRef}
      >

        <Box style={{
          position: 'sticky',
          top: 0, backgroundColor: '#dee2e6',//color, //['#f8f9fa', '#f1f3f5', '#e9ecef', '#dee2e6'][index],
          zIndex: 2,
          padding: '10px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <Title order={4} >{currentStage}</Title>
        </Box>

        <Stack gap="sm"
          style={{
            zIndex: 1,
            paddingTop: "10px", // Add padding-top to prevent message cards from overlapping the sticky title
          }}
        >

          {
            fetQR.isPending ? (
              <Loading />
            ) :
              (
                fetQR.data.pages.map((page, cardIndex) => {
                  // return page.data?.results.map((result) =>
                  return page.results.map((result) => {
                    return (

                      <AccountCard
                        key={cardIndex}
                        username={result.igname}
                        assignedTo={result.assigned_to}
                        lastMsgSentAt={result.last_message_at}
                        msgSentBy={result.last_message_sent_by}
                        onClick={() => openDrawer({
                          username: result.igname,
                          assignedTo: result.assigned_to,
                          lastMsgSentAt: result.last_message_at,
                          msgSentBy: result.last_message_sent_by
                        })}
                      />
                    );
                  })
                }
                )




              )






          }


          {fetQR.isPending ? null : fetQR.data.pages[fetQR.data.pages.length - 1]?.next && (
            <Stack align="center" ref={ref}>
              <Loader size="sm" />
              <Text style={{ textAlign: "center" }} fz={12} c="dimmed">
                Loading more...
              </Text>
            </Stack>
          )}

        </Stack>



      </Box>
    </>
  );
};