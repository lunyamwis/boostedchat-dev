import React, { useEffect, useState } from "react";
import {
  Container,
  ScrollArea,
  Box,
  Group,
  Popover,
  Button,
  TextInput
} from "@mantine/core";
import { useGetActiveStages } from "../Instagram/Account/Hooks/accounts.hook";

import { StageColumn2 } from "./StageColumn2";
import { DatePicker } from "@mantine/dates";

// Define a type for the query result
interface QueryResult {
  startDate: string | null;
  endDate: string | null;
}

export function AccountsCanban() {
  const [stages, setStages] = useState<string[]>([]);
  const stagesQR = useGetActiveStages()

  const [opened, setOpened] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [dateError, setDateError] = useState(false);



  const handleFilterClick = () => {
    // Execute your query here with startDate and endDate
    console.log("Filtering with dates:", startDate, endDate);
    if (startDate && endDate && startDate >= endDate) {
      setDateError(true);
      return;
    }

    setDateError(false);
    // Execute your query her

    // Set query results based on the date range (for demonstration purposes)
    setQueryResult({
      startDate: startDate?.toLocaleDateString() || null,
      endDate: endDate?.toLocaleDateString() || null,
    });
    setOpened(false);
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
      <Group style={{ marginBottom: "1rem" }}>


        {/* Popover for Date Picker */}
        {/* <Popover
          opened={opened}
          onClose={() => setOpened(false)}
          position="bottom"
          withArrow
        >
          <Popover.Target>
            <Button onClick={() => setOpened((prev) => !prev)}>Filter</Button>
          </Popover.Target>
          <Popover.Dropdown>
            <DatePicker  value={selectedDate} onChange={setSelectedDate} />
          </Popover.Dropdown>

        </Popover> */}
        <Popover
          opened={opened}
          onClose={() => setOpened(false)}
          position="bottom-start"
          withArrow
          trapFocus
        >
          <Popover.Target>
           <Button onClick={() => setOpened((prev) => !prev)}>Filter</Button>
          </Popover.Target>
          <Popover.Dropdown>
            {/* Form with Start and End Date Inputs */}
            <Group  gap="sm">
              <TextInput label="Start Date" readOnly value={startDate?.toLocaleDateString()} onClick={() => setOpened(true)} />
              <TextInput label="End Date" readOnly value={endDate?.toLocaleDateString()} onClick={() => setOpened(true)} />
            </Group>

            {/* Date Pickers for Selecting Dates */}
            <Group  gap="sm">
              <DatePicker
                // label="Select Start Date"
                value={startDate}
                onChange={setStartDate}
                // placeholder="Pick start date"
              />
              <DatePicker
                // label="Select End Date"
                value={endDate}
                onChange={setEndDate}
                minDate={startDate || undefined} // Disable dates earlier than the start date
                // placeholder="Pick end date"
              />
            </Group>

            {/* Filter Button */}
            <Button onClick={handleFilterClick}>Filter</Button>
          </Popover.Dropdown>
        </Popover>
      </Group>

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
