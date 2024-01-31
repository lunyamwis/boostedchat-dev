import { useOutreachScheduleApi } from "@/Apis/Scrapper/OutreachSchedule.api";
import { queryKeys } from "@/Constants/ApiConstants";
import { TIMEZONES } from "@/Constants/GeneralConstants";
import {
  Timezones,
  UpdateOutreachScheduleParams,
} from "@/Interfaces/LeadsGeneration/outreach-schedule.interface";
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { DateTimePicker, TimeInput } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import {
  IconAlertTriangle,
  IconCalendar,
  IconCheck,
  IconClock,
  IconX,
} from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatISO, parseISO } from "date-fns";
import React from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  outreachScheduleId: string | null;
  setOutreachScheduleId: React.Dispatch<React.SetStateAction<string | null>>;
};

export function EditOutreachSchedule({
  isOpen,
  setIsOpen,
  outreachScheduleId,
  setOutreachScheduleId,
}: Props) {
  const queryClient = useQueryClient();
  const { update, getOne } = useOutreachScheduleApi();
  const [name, setName] = React.useState("");
  const [timezone, setTimezone] = React.useState<Timezones | null>(null);
  const [outreachCapacity, setOutreachCapacity] = React.useState<
    number | string
  >("");
  const [outreachStartTime, setOutreachStartTime] = React.useState<
    string | undefined
  >(undefined);
  const [outreachEndTime, setOutreachEndTime] = React.useState<
    string | undefined
  >(undefined);
  const [scraperStartTime, setScraperStartTime] = React.useState<Date | null>(
    null,
  );
  const [scraperEndTime, setScraperEndTime] = React.useState<Date | null>(null);

  const startTimeRef = React.useRef<HTMLInputElement>(null);
  const endTimeRef = React.useRef<HTMLInputElement>(null);

  const outreachScheduleQR = useQuery({
    queryKey: [
      queryKeys.leadsGeneration.outreachSchedule.outreachScheduleById,
      outreachScheduleId,
    ],
    queryFn: () => getOne(outreachScheduleId as string),
    enabled: isOpen && outreachScheduleId != null,
  });

  const updateOutreachSchedule = useMutation({
    mutationFn: (params: UpdateOutreachScheduleParams) => update(params),
  });

  const handleUpdateOutreachSchedule = () => {
    console.log(outreachScheduleId);
    if (outreachScheduleId == null) {
      return;
    }

    if (name === "") {
      showNotification({
        title: "Error",
        message: "Please enter the name of the outreach schedule",
        color: "orange",
        icon: <IconAlertTriangle size={18} />,
      });
      return;
    }
    if (timezone == null) {
      showNotification({
        title: "Error",
        message: "Please select the outreach timezone",
        color: "orange",
        icon: <IconAlertTriangle size={18} />,
      });
      return;
    }
    if (outreachCapacity === "") {
      showNotification({
        title: "Error",
        message: "Please enter the number of leads to be reached out to",
        color: "orange",
        icon: <IconAlertTriangle size={18} />,
      });
      return;
    }
    if (outreachStartTime == null) {
      showNotification({
        title: "Error",
        message: "Please enter the time outreach is to start",
        color: "orange",
        icon: <IconAlertTriangle size={18} />,
      });
      return;
    }
    if (outreachEndTime == null) {
      showNotification({
        title: "Error",
        message: "Please enter the time that outreach is to end",
        color: "orange",
        icon: <IconAlertTriangle size={18} />,
      });
      return;
    }
    if (scraperStartTime == null) {
      showNotification({
        title: "Error",
        message: "Please enter the date and time that scraping is to start",
        color: "orange",
        icon: <IconAlertTriangle size={18} />,
      });
      return;
    }
    if (scraperEndTime == null) {
      showNotification({
        title: "Error",
        message: "Please enter the date and time that scraping is to end",
        color: "orange",
        icon: <IconAlertTriangle size={18} />,
      });
      return;
    }

    updateOutreachSchedule.mutate(
      {
        id: outreachScheduleId,
        data: {
          name,
          outreach_capacity: outreachCapacity as number,
          outreach_starttime: outreachStartTime,
          outreach_endtime: outreachEndTime,
          scrapper_starttime: formatISO(scraperStartTime),
          scrapper_endtime: formatISO(scraperEndTime),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [
              queryKeys.leadsGeneration.outreachSchedule.allOutreachSchedules,
            ],
          });
          showNotification({
            message: "Outreach schedule updated successfully",
            color: "teal",
            icon: <IconCheck />,
          });
          handleClose();
        },
        onError: (err) => {
          showNotification({
            title: "Error",
            message: err.message,
            color: "red",
            icon: <IconX />,
          });
        },
      },
    );
  };

  const handleClose = () => {
    setName("");
    setTimezone(null);
    setOutreachCapacity("");
    setOutreachStartTime(undefined);
    setOutreachEndTime(undefined);
    setScraperStartTime(null);
    setScraperEndTime(null);
    setIsOpen(false);
    setOutreachScheduleId(null);
  };

  React.useEffect(() => {
    if (outreachScheduleQR.data == null) {
      return;
    }
    setName(outreachScheduleQR.data.name);
    setTimezone(outreachScheduleQR.data.timezone);
    setOutreachCapacity(outreachScheduleQR.data.outreach_capacity);
    setOutreachStartTime(outreachScheduleQR.data.outreach_starttime);
    setOutreachEndTime(outreachScheduleQR.data.outreach_endtime);
    setScraperStartTime(parseISO(outreachScheduleQR.data.scrapper_starttime));
    setScraperEndTime(parseISO(outreachScheduleQR.data.scrapper_endtime));
  }, [outreachScheduleQR.data]);

  return (
    <Modal
      size="lg"
      opened={isOpen}
      closeOnEscape={!updateOutreachSchedule.isPending}
      closeOnClickOutside={!updateOutreachSchedule.isPending}
      onClose={handleClose}
      title="Update outreach schedule"
    >
      <Stack>
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Outreach Schedule name"
          withAsterisk
        />
        <Select
          value={timezone as string | null}
          onChange={(val) => setTimezone(val as Timezones | null)}
          data={TIMEZONES}
          label="Timezone"
          searchable
          withAsterisk
        />
        <TextInput
          value={outreachCapacity}
          onChange={(e) => setOutreachCapacity(e.target.value)}
          label="Leads per sales rep per day"
          withAsterisk
        />
        <Group>
          <TimeInput
            style={{ flex: 1 }}
            value={outreachStartTime}
            label="Outreach start time"
            onChange={(e) => setOutreachStartTime(e.target.value)}
            ref={startTimeRef}
            rightSection={
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => startTimeRef.current?.showPicker()}
              >
                <IconClock stroke={1.5} />
              </ActionIcon>
            }
          />
          <TimeInput
            style={{ flex: 1 }}
            label="Outreach end time"
            value={outreachEndTime}
            onChange={(e) => setOutreachEndTime(e.target.value)}
            ref={endTimeRef}
            rightSection={
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => endTimeRef.current?.showPicker()}
              >
                <IconClock stroke={1.5} />
              </ActionIcon>
            }
          />
        </Group>
        <Group>
          <DateTimePicker
            value={scraperStartTime}
            onChange={(val) => setScraperStartTime(val)}
            rightSection={<IconCalendar stroke={1.5} />}
            label="Scraping start time"
            placeholder="Choose"
            style={{ flex: 1 }}
          />
          <DateTimePicker
            value={scraperEndTime}
            onChange={(val) => setScraperEndTime(val)}
            rightSection={<IconCalendar stroke={1.5} />}
            placeholder="Choose"
            style={{ flex: 1 }}
            label="Scraping end time"
          />
        </Group>
        <Group justify="center">
          <Button
            onClick={handleUpdateOutreachSchedule}
            loading={updateOutreachSchedule.isPending}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
