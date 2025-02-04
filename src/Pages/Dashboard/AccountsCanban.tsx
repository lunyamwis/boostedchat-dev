import React, { useEffect, useState } from "react";
import {
  Container,
  ScrollArea,
  Box,
  Group,
  Popover,
  Button,
  TextInput,
  Space,
  Indicator,
  Avatar,
  Modal,
  Alert
} from "@mantine/core";
import {
  IconBrandInstagram,
  IconSearch,
  IconInfoCircle
} from "@tabler/icons-react";
import { useGetActiveStages, useGetMqttHealth, useGetMqttLoggedInAccounts } from "../Instagram/Account/Hooks/accounts.hook";
import { useCreateMedia, useDownloadMedia } from "../LeadsGeneration/Media/hooks/media.hook";
import { StageColumn2 } from "./StageColumn2";
import { DatePicker } from "@mantine/dates";
// import { StatsRingCard } from "./StatsCard";
import { StatsRingCardsRow } from "./StatsHeader";
import { useDebouncedValue } from "@mantine/hooks";
import { Media } from "@/Interfaces/Instagram/media.interface";
import { Link } from "react-router-dom";

export function AccountsCanban() {
  const [stages, setStages] = useState<string[]>([]);
  const stagesQR = useGetActiveStages();
  const mediaQR = useCreateMedia();
  const mediaDownload = useDownloadMedia();
  const [searchQuery, setSearchQuery] = React.useState("");
  const mqttHealthQR = useGetMqttHealth();
  const mqttLoggedInAccountsQR = useGetMqttLoggedInAccounts();
  const [connected_accounts, setConnectedAccounts] = useState<string[]>([]);

  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 700);

  const [opened, setOpened] = useState(false);
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [stringStartDate, setStringStartDate] = useState('');
  const [stringEndDate, setStringEndDate] = useState('');
  const [stringUsername, setStringUsername] = useState('');
  const [dateError, setDateError] = useState(false);
  const [value, setValue] = useState('');
  const [showDownloadStatus, setShowDownloadStatus] = useState(false)
  const [downloadErrorMsg, setDownloadErrorMsg] = useState('');
  const [donwloadStatusError, setDownloadStatusError] = useState(false)
  const [openDownload, setOpenDownload] = useState(false)

  const downloadMedianow = (media_id: string) => {
    // let media_id = data?.id
    mediaDownload.mutateAsync(media_id).then((data2) => {
      console.log("console.log(data2 miutata) dat2amutatt")
      console.log(data2)
      setShowDownloadStatus(true);
      // setDownloadStatusError(false);
      let downloadlink = data2?.download_url
      setDownloadErrorMsg(downloadlink);
      mediaDownload.reset()
    }).catch((error) => {
      console.log("CAUGHTTHE ERROR", error)
      console.log(error.data)
      console.log(error.message)
      setShowDownloadStatus(true)
      setDownloadStatusError(true);
      let downloadError = error.data || error.message
      setDownloadErrorMsg(downloadError);
      mediaQR.createAccount.reset();
    })
  }

  console.log(dateError);

  const openDonwloadMoal = () => {
    setOpenDownload(true);
  }


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

  useEffect(() => {
    console.log(debouncedSearchQuery);
    setStringUsername(debouncedSearchQuery);
  }, [debouncedSearchQuery]);



  const handleClearFilters = () => {
    // Execute your query here with startDate and endDate

    setStartDate(null);
    setEndDate(null);

    setStringStartDate('');
    setStringEndDate('');
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

  useEffect(() => {
    if (mqttHealthQR.data?.mqtt_connected) {
      let accounts = mqttLoggedInAccountsQR.data?.connected_accounts || [];
      if (accounts?.length > 0) {
        setConnectedAccounts(accounts);
      }

    }
  }, [mqttHealthQR.data, mqttLoggedInAccountsQR.data]);


  return (

    <Container fluid style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }} >
      <StatsRingCardsRow stringEndDate={stringEndDate} stringStartDate={stringStartDate} />
      <Space h="xl" />
      <Group style={{ justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        {/* Left Section: Filter Popover */}
        <Modal centered opened={openDownload} onClose={() => {
          setOpenDownload(false); setShowDownloadStatus(false);
          setDownloadStatusError(true);
        }
        } size="auto" title="Generate image download url">
          <>
            <TextInput label="Enter Media url"
              // value={value}
              type="url"
              onChange={(event) => {
                console.log(event.target.value);
                setValue(event.target.value)
              }}
              placeholder="https://www.instagram.com/p/DFdDnu3glrM/" data-autofocus />
            <Button loading={mediaQR.createAccount.isPending || mediaDownload.isPending} fullWidth onClick={() => {
              const meda = { media_type: 'image', media_url: `${value}` } as Media
              mediaQR.createAccount.mutateAsync(meda).then((data) => {
                console.log("console.log(data) data")
                console.log(data)
                downloadMedianow(data.id);
              })
            }} mt="md">
              Generate download link
            </Button>

            <Box w={{ base: 200, sm: 400, lg: 500 }}
              py={{ base: 'xs', sm: 'md', lg: 'xl' }}
              ta="center"
              mx="auto">

              {
                (showDownloadStatus && donwloadStatusError) &&
                <Alert variant="light" color="red" title={downloadErrorMsg} icon={<IconInfoCircle />} />
              }

              {
                (showDownloadStatus && !donwloadStatusError)
                && <Link target="_blank" to={downloadErrorMsg}>
                  Click here to download
                </Link>}

            </Box>
          </>
        </Modal>
        <Group gap={"xs"}>
          <Box px={24}>
            <TextInput
              variant="filled"
              leftSection={<IconSearch size={17} />}
              placeholder="Search by igname..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
          <Popover
            opened={opened}
            onClose={() => setOpened(false)}
            position="bottom-start"
            withArrow
            trapFocus
          >
            <Popover.Target>
              <Button variant="outline" onClick={() => setOpened((prev) => !prev)}>Filter by date</Button>
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
        {/* Right Section: Indicators */}
        <Group >
          <Button onClick={openDonwloadMoal}>Download Media</Button>
          <Indicator inline label={mqttHealthQR.data?.mqtt_connected ? "connected" : "Disconnected"} processing size={16} offset={7} position="bottom-end" color={mqttHealthQR.data?.mqtt_connected ? "green" : "red"} withBorder>
            <Avatar
              size="lg"
              radius="xl"
              key="mqtt"
            >
              MQTT
            </Avatar>
          </Indicator>
          <Space w="xl" />
          <Indicator inline label={connected_accounts.length > 0 ? `${connected_accounts[0]}` : "Not loggedin"} processing size={16} offset={7} position="bottom-end" color={connected_accounts.length > 0 ? "green" : "red"} withBorder>
            <Avatar
              size="lg"
              radius="xl"
            >
              <IconBrandInstagram size="1.5rem" />
            </Avatar>

          </Indicator>
        </Group>

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
            <StageColumn2 stage={stage} stringUsername={stringUsername} stringEndDate={stringEndDate} stringStartDate={stringStartDate} index={index} />
          ))}

        </Box>
      </ScrollArea>
    </Container>

  )
}
