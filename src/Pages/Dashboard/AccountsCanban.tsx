import React, { useEffect, useState } from "react";
import {
  Container,
  ScrollArea,
  Box
} from "@mantine/core";
import AccountDrawer from "./AccountDrawer";
import { useGetActiveStages } from "../Instagram/Account/Hooks/accounts.hook";

import { StageColumn2 } from "./StageColumn2";


export function AccountsCanban() {
  // const columnTitles = ['Column 1', 'Column 2', 'Column 3', 'Column 4'];
  // Column titles and their corresponding stage names
  // const columnTitles = [
  //   { title: "Rapport Building", color: "#f8f9fa" },
  //   { title: "Needs Assessment", color: "#f1f3f5" },
  //   { title: "Solution Presentation", color: "#e9ecef" },
  //   { title: "Closing the Sale", color: "#dee2e6" },
  //   { title: "Closing II the Sale", color: "#dee2e7" },
  // ];

  const [stages, setStages] = useState<string[]>([]);
  // const accountsQR = useGetAccounts(1); //NEED TO ADD FETCH ENDPOINTS FOR EACH STAGE WITH SCROLL FETCH MORE ETC
  const stagesQR = useGetActiveStages()
  // const { fetQR, stagesx } = useCommonState();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<{
    username: string;
    assignedTo: string;
    lastMsgSentAt: string;
    msgSentBy: string;
  } | null>(null);

  // const openDrawer = (messageDetails: {
  //   username: string;
  //   assignedTo: string;
  //   lastMsgSentAt: string;
  //   msgSentBy: string;
  // }) => {
  //   setSelectedMessage(messageDetails);
  //   setDrawerOpen(true);
  // };

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
          }}>
          {stages.map((stage, index) => (
            <StageColumn2 stage={stage} index={index} />
          ))}

        </Box>
      </ScrollArea>
      <AccountDrawer
        isOpen={drawerOpen}
        onClose={closeDrawer}
        messageDetails={selectedMessage}
      />
    </Container>

  )
}
