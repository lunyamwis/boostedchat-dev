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

export function DateField({ title, value, setDate }: Props) {
  return (
    <Grid gutter={16} style={{ margin: 0 }}>
      <Grid.Col py={0} pl={16} pr={0} span={12}>
        <Text
          style={{ fontSize: "0.875rem", fontWeight: 500, marginBottom: 4 }}
        >
          {title}
        </Text>
        <DateInput
          value={value}
          onChange={setDate}
        />
      </Grid.Col>
    </Grid>
  );
}
