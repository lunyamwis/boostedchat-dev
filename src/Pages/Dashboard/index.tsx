import React from "react";
import { FormLayout } from "../../Layouts/FormLayout";
import { Button, Group, Stack, Text } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useThreadsApi } from "../../Apis/Instagram/Threads.api";
import { joinDatesWithTime } from "../../Utils/dates.util";
import { showNotification } from "@mantine/notifications";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { convertToCSV } from "../../Utils/csv.util";

export function Summary() {
  const [date, setDate] = React.useState<Date | null>(null);
  const [time, setTime] = React.useState<string | undefined>(undefined);
  const timeRef = React.useRef<HTMLInputElement>(null);

  const { getSnapshotByDate: getSnapshotByDateApi } = useThreadsApi();

  const getSnapshotByDate = useMutation({
    mutationFn: (params: string) => getSnapshotByDateApi(params),
  });

  const handleGetSnapshot = () => {
    if (date == null) {
      showNotification({
        message: "Please select a date",
        color: "red",
      });
      return;
    }
    if (time == null) {
      showNotification({
        message: "Please select the time",
        color: "red",
      });
      return;
    }
    getSnapshotByDate.mutate(
      format(joinDatesWithTime(date, time), "yyyy-MM-dd HH:mm:ss"),
      {
        onSuccess: (val) => {
          const d = convertToCSV(val);
          window.open(d, "_blank");
        },
      },
    );
  };

  return (
    <FormLayout span={5} title="Download Snapshot">
      <Stack justify="space-between" mih={320}>
        <Stack mt={48}>
          <Group justify="center">
            <DateInput
              value={date}
              onChange={setDate}
              label="Date"
              placeholder="Select a date"
              maw={400}
            />
            <TimeInput
              label="Time"
              ref={timeRef}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              maw={400}
            />
          </Group>

          <Group justify="center">
            <Button
              loading={getSnapshotByDate.isPending}
              onClick={handleGetSnapshot}
            >
              Download Snapshot
            </Button>
          </Group>
        </Stack>
        <Group justify="center" pb={12}>
          <Text c="dimmed" fz={13}>
            <Text component="span">*</Text>
            Select a date and time to get a snapshot of the leads
          </Text>
        </Group>
      </Stack>
    </FormLayout>
  );
}
