import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  ScrollArea,
  Box,
  Title,
  Stack
} from "@mantine/core";
import AccountCard from "./AccountCard";
import AccountDrawer from "./AccountDrawer";
import { useGetAccounts, useGetActiveStages } from "../Instagram/Account/Hooks/accounts.hook";
import { useAccountsApi } from "@/Apis/Instagram/Accounts.api";
import { GetAccount, } from "@/Interfaces/Instagram/account.interface";

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
  const accountsQR = useGetAccounts(1); //NEED TO ADD FETCH ENDPOINTS FOR EACH STAGE WITH SCROLL FETCH MORE ETC
  const stagesQR = useGetActiveStages()
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
    console.log("accountsQR.data?.results OOOOOO");
    console.log(accountsQR.data?.results)
    if (accountsQR.data?.results) {
      console.log("accountsQR.data?.results");
      // mapMessageData(accountsQR.data?.results)
      const data: GetAccount[] = accountsQR.data?.results
      setApiData(data);
    }
  }, [accountsQR.data?.results])

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

  // console.log("selectedMessage");
  // console.log(selectedMessage);

  // console.log(stages);

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

            <Box
              key={index}
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
            >

              {/* <Grid.Col
                  key={index}
                  span={{ base: 12, md: 6, lg: 3 }}
                  style={{
                    backgroundColor: color,// ['#f8f9fa', '#f1f3f5', '#e9ecef', '#dee2e6'][index],
                    padding: '10px',
                    borderRadius: '8px',
                    height: '100vh',
                    // minWidth: "300px", // Set a fixed width for each column for horizontal scroll
                    display: "flex",
                    flexDirection: "column",
                  }}
                > */}
              {/* Sticky Title */}
              <Box style={{
                position: 'sticky',
                top: 0, backgroundColor: '#dee2e6',//color, //['#f8f9fa', '#f1f3f5', '#e9ecef', '#dee2e6'][index],
                zIndex: 2,
                padding: '10px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <Title order={4} >{stage}</Title>
              </Box>
              {/* <ScrollArea style={{ height: '100%' }}> */}
              <Stack gap="sm"
                style={{
                  zIndex: 1,
                  paddingTop: "10px", // Add padding-top to prevent message cards from overlapping the sticky title
                }}
              >
                {apiData
                  .filter((item) => item.stage == stage) // Filter by stage to determine which column
                  .map((data, cardIndex) => (
                    <AccountCard
                      key={cardIndex}
                      username={data.igname}
                      assignedTo={data.assigned_to}
                      lastMsgSentAt={data.last_message_at}
                      msgSentBy={data.last_message_sent_by}
                      onClick={() => openDrawer({
                        username: data.igname,
                        assignedTo: data.assigned_to,
                        lastMsgSentAt: data.last_message_at,
                        msgSentBy: data.last_message_sent_by
                      })}
                    // onClick={() => { 
                    //   console.log(data);
                    //   openDrawer(mapMessageData(data)) }}
                    />
                  ))}
              </Stack>
              {/* </ScrollArea> */}

              {/* </Grid.Col> */}
            </Box>

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