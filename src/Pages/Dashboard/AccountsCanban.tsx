import React, { useEffect, useState } from "react";
import {
  Container,
  ScrollArea,
  Box
} from "@mantine/core";
import { useGetActiveStages } from "../Instagram/Account/Hooks/accounts.hook";

import { StageColumn2 } from "./StageColumn2";


export function AccountsCanban() {
  const [stages, setStages] = useState<string[]>([]);
  const stagesQR = useGetActiveStages()

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
    </Container>

  )
}
