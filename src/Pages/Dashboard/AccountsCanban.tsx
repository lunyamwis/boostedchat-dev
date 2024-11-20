import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  ScrollArea,
  Box,
  Title,
  Stack
} from "@mantine/core";
import AccountCard from "./AccountCard";
import AccountDrawer from "./AccountDrawer";
import { useGetAccounts, useGetActiveStages, getInfiniteAccountsByStage, useGetAccountsByStageDirectly } from "../Instagram/Account/Hooks/accounts.hook";
import { GetAccount, } from "@/Interfaces/Instagram/account.interface";
import { useQueries } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCommonState } from "../Instagram/Account/Hooks/common.hooks";
// import { StageColumn } from "./StageColumn";
// import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import { StageColumn2 } from "./StageColumn2";

interface ApiResponse {
  id: string;
  assigned_to: string;
  confirmed_problems: string;
  full_name: string | null;
  igname: string;
  status: string;
  outreach: string;
  last_message_at: string;
  last_message_sent_at: string;
  stage: string;
}





export function AccountsCanban() {
  // const columnTitles = ['Column 1', 'Column 2', 'Column 3', 'Column 4'];
  // Column titles and their corresponding stage names
  const columnTitles = [
    { title: "Rapport Building", color: "#f8f9fa" },
    { title: "Needs Assessment", color: "#f1f3f5" },
    { title: "Solution Presentation", color: "#e9ecef" },
    { title: "Closing the Sale", color: "#dee2e6" },
    { title: "Closing II the Sale", color: "#dee2e7" },
  ];

  const mapMessageData = (data: GetAccount) => ({
    username: data.igname,
    assignedTo: data.assigned_to.toLowerCase() === 'Robot' ? 'Robot' : 'Human', // Assuming 'Robot' or 'Human'
    lastMsgSentAt: new Date(data.last_message_sent_at).toLocaleString(), // Formatting the date to a readable string
    msgSentBy: data.last_message_sent_by
  });
  const [stages, setStages] = useState<string[]>([]);
  // const accountsQR = useGetAccounts(1); //NEED TO ADD FETCH ENDPOINTS FOR EACH STAGE WITH SCROLL FETCH MORE ETC
  const stagesQR = useGetActiveStages()
  // const { fetQR, stagesx } = useCommonState();



  // Fetch accounts for each stage once stages are fetched
  // Fetch accounts for each stage
  // console.log(fetQR)
  // const accountQueries = useQueries({
  //   queries: stages.map((stage) => ({
  //     queryKey: ["accounts", stage],
  //     queryFn: () => {
  //       let queryStage
  //       if (stage == 'Null') {
  //         queryStage = null;
  //       } else if (stage == 'Blank') {
  //         queryStage = '';
  //       } else {
  //         queryStage = stage;
  //       }
  //       // const fetQR =  getInfiniteAccountsByStage(queryStage);
  //       // return getInfiniteAccountsByStage(queryStage)//
  //       return useGetAccountsByStageDirectly(queryStage, 1)
  //       // return fetQR;//getInfiniteAccountsByStage(queryStage)
  //     }, // Use direct API function
  //     enabled: !!stages.length, // Enable queries only when stages are available
  //   })),
  // });



  // Aggregate accounts data when all queries complete
  // useEffect(() => {
  //   if (accountQueries.every((query) => query.isSuccess)) {
  //     const aggregatedAccounts = accountQueries.flatMap((query) => {
  //       // return query.data.data?.pages[0].data?.results || []
  //       return query.data.results || []
  //     });
  //     setApiData(aggregatedAccounts);
  //   }
  // }, [accountQueries]);

  // const { getAll } = useAccountsApi();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<{
    username: string;
    assignedTo: string;
    lastMsgSentAt: string;
    msgSentBy: string;
  } | null>(null);

  const [apiData, setApiData] = useState<GetAccount[]>([]);

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



  useEffect(() => {
    if (stagesQR.data) {
      // mapMessageData(accountsQR.data?.results)
      const data: [] = stagesQR.data

      const modStages = data.map((item) => {
        if (item === null) return "Null";
        if (item === "") return "Blank";
        return item;
      });
      const prioritizedStages = ["Prequalified", "Sales Qualified", "Committed"];
      const sortedStages = [
        ...prioritizedStages,
        ...modStages.filter((stage) => !prioritizedStages.includes(stage)),
      ];
      setStages(sortedStages);
    }
  }, [stagesQR.data])

  // Infinite query for each stage

  // const stageQueries = stages.map((stage) => ({
  //   stage,
  //   query: getInfiniteQuery(stage),
  // }));

  // Initialize queries only once per stage
  // useEffect(() => {
  //   stages.forEach((stage) => {
  //     if (!queriesRef.current[stage]) {
  //       queriesRef.current[stage] = useInfiniteQuery(
  //         {
  //           queryKey: ["accounts", stage],
  //           queryFn: ({ pageParam = 1 }) => useGetAccountsByStageDirectly(stage, pageParam),
  //           initialPageParam: 1,
  //           getNextPageParam: (lastPage, _, lastPageParam) => {
  //             if (lastPage.results.length === 0) {
  //               return undefined;
  //             }
  //             return lastPageParam + 1;
  //           },
  //           getPreviousPageParam: (_, p, firstPageParam) => {
  //             console.log(p);
  //             if (firstPageParam <= 1) {
  //               return undefined;
  //             }
  //             return firstPageParam - 1;
  //           },
  //         }
  //       );
  //     }
  //   });
  // }, [stages]);

  // const handleScroll = (event: React.UIEvent<HTMLDivElement>, stage: string) => {
  //   const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
  //   const query = stageQueries.find((q) => q.stage === stage)?.query;

  //   if (query && !query.isFetchingNextPage && scrollTop + clientHeight >= scrollHeight - 50) {
  //     query.fetchNextPage();
  //   }
  // };


  return (
    <Container fluid style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }} >
      <ScrollArea
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          flex: 1,
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            minHeight: "100%",
          }}

        >
          {/* <Grid justify="center" style={{ flex: 1, flexWrap: "nowrap" }} align="stretch" gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}> */}

          {stages.map((stage, index) => (

            // <Box
            //   key={index}
            //   style={{
            //     minWidth: "300px",
            //     backgroundColor: "#f8f9fa",
            //     padding: "10px",
            //     borderRadius: "8px",
            //     display: "flex",
            //     flexDirection: "column",
            //     height: "100vh", // This ensures the column takes up the full height of the screen
            //     overflowY: "auto", // Enable vertical scrolling for each column
            //     marginRight: "10px", // Optional: adds space between columns
            //   }}
            // // onScroll={(e) => handleScroll(e, stage)}
            // >

            //   <Box style={{
            //     position: 'sticky',
            //     top: 0, backgroundColor: '#dee2e6',//color, //['#f8f9fa', '#f1f3f5', '#e9ecef', '#dee2e6'][index],
            //     zIndex: 2,
            //     padding: '10px',
            //     borderRadius: '8px',
            //     textAlign: 'center'
            //   }}>
            //     <Title order={4} >{stage}</Title>
            //   </Box>

            //   <Stack gap="sm"
            //     style={{
            //       zIndex: 1,
            //       paddingTop: "10px", // Add padding-top to prevent message cards from overlapping the sticky title
            //     }}
            //   >
            //     {apiData
            //       .filter((item) => item.stage == stage) // Filter by stage to determine which column
            //       .map((data, cardIndex) => {
            //         // const query = stageQueries.find((q) => q.stage === stage)?.query;
            //         return (
            //           <AccountCard
            //             key={cardIndex}
            //             username={data.igname}
            //             assignedTo={data.assigned_to}
            //             lastMsgSentAt={data.last_message_at}
            //             msgSentBy={data.last_message_sent_by}
            //             onClick={() => openDrawer({
            //               username: data.igname,
            //               assignedTo: data.assigned_to,
            //               lastMsgSentAt: data.last_message_at,
            //               msgSentBy: data.last_message_sent_by
            //             })}
            //           // onClick={() => { 
            //           //   console.log(data);
            //           //   openDrawer(mapMessageData(data)) }}
            //           />
            //         )
            //       }
            //       )}
            //   </Stack>



            //   {/* {StageColumn({stage,index})} */}


            // </Box>
            <StageColumn2 stage={stage} index={index}/>


          ))}

        </Box>
        {/* </Grid> */}
      </ScrollArea>
      {/* Message Drawer */}
      <AccountDrawer
        isOpen={drawerOpen}
        onClose={closeDrawer}
        messageDetails={selectedMessage}
      />
    </Container>

  )
}
