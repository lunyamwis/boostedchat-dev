import React from "react";
import { Grid, Text } from "@mantine/core";
import { DateInput } from '@mantine/dates';

type Props = {
  title: string;
  // date: Date | null;
  value: Date | null;
  valueFormat?: string | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

export function DateField({ title, value, setDate, valueFormat }: Props) {
  return (
    <Grid gutter={16} style={{ margin: 0 }} align="center">
      <Grid.Col py={0} pl={16} pr={0} span={5}>
        <Text
          style={{ fontSize: "0.875rem", fontWeight: 500, textAlign: "right" }}
        >
          {title}:
        </Text>
      </Grid.Col>
      <Grid.Col py={0} pl={16} pr={0} span={7}>
        <DateInput
          value={value}
          onChange={setDate}
        />
      </Grid.Col>
    </Grid>

  );
}
