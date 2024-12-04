import React, { useEffect, useState } from "react";
import {
  Container,
  ScrollArea,
  Box,
  Group,
  Popover,
  Button,
  TextInput,
  Space
} from "@mantine/core";
import { useGetActiveStages } from "../Instagram/Account/Hooks/accounts.hook";

import { StageColumn2 } from "./StageColumn2";
import { DatePicker } from "@mantine/dates";
// import { StatsRingCard } from "./StatsCard";
import { StatsRingCardsRow } from "./StatsHeader";

export function AccountsCanban() {
  const [stages, setStages] = useState<string[]>([]);
  const stagesQR = useGetActiveStages()

  const [opened, setOpened] = useState(false);
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [stringStartDate, setStringStartDate] = useState('');
  const [stringEndDate, setStringEndDate] = useState('');
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
    const formattedStartDate = startDate ? `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}` : ''
    const formattedEndDate = endDate ? `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}` : ''

    setStringStartDate(formattedStartDate);
    setStringEndDate(formattedEndDate);
    setOpened(false);
  };

  const handleClearFilters = () => {
    // Execute your query here with startDate and endDate
    
    setStartDate(null);
    setEndDate(null);
   
    setStringStartDate('');
    setStringEndDate('');
    setOpened(false);
  };

  console.log(dateError)

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
       <StatsRingCardsRow stringEndDate={stringEndDate} stringStartDate={stringStartDate}/>
       <Space h="xl" />
      <Group style={{ marginBottom: "1rem" }}>
        <Popover
          opened={opened}
          onClose={() => setOpened(false)}
          position="bottom-start"
          withArrow
          trapFocus
        >
          <Popover.Target>
            <Button  variant="outline" onClick={() => setOpened((prev) => !prev)}>Filter</Button>
          </Popover.Target>
          <Popover.Dropdown>
            {/* Form with Start and End Date Inputs */}
            <Group gap="sm">
              <TextInput label="Start Date" readOnly value={startDate?.toLocaleDateString()} onClick={() => setOpened(true)} />
              <TextInput label="End Date" readOnly value={endDate?.toLocaleDateString()} onClick={() => setOpened(true)} />
            </Group>

            {/* Date Pickers for Selecting Dates */}
            <Group gap="sm">
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
            {" "}
            <Button onClick={handleClearFilters}>Clear filters</Button>
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
            <StageColumn2 stage={stage} stringEndDate={stringEndDate} stringStartDate={stringStartDate} index={index} />
          ))}

        </Box>
      </ScrollArea>
    </Container>

  )
}
