import { Group, Select } from "@mantine/core";
import { DatePickerInput, DateTimePicker } from "@mantine/dates";
import { format } from "date-fns";
import React from "react";
import { TDateOperators } from "../datagrid.interface";

type Props = {
  type: "date" | "dateTime";
  filterOperator: TDateOperators | null;
  setFilterOperator: React.Dispatch<
    React.SetStateAction<TDateOperators | null>
  >;
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
};

export function DateFilters({
  type,
  filterOperator,
  setFilterOperator,
  filterValue,
  setFilterValue,
}: Props) {
  const [dateFilterValue, setDateFilterValue] = React.useState<Date | null>(
    filterValue === "" ? null : new Date(filterValue),
  );
  return (
    <Group align="center">
      <Select
        data={[
          { value: "eq", label: "On" },
          { value: "ne", label: "Not on" },
          { value: "gt", label: "After" },
          { value: "gte", label: "On or After" },
          { value: "lt", label: "Before" },
          { value: "lte", label: "On or Before" },
        ]}
        value={filterOperator ?? "eq"}
        onChange={(val) => setFilterOperator((val as TDateOperators) ?? "eq")}
        label="Operator"
        sx={{ flex: 0.4 }}
      />
      {type === "date"
        ? (
          <DatePickerInput
            value={dateFilterValue}
            onChange={(val) => {
              setDateFilterValue(val);
              setFilterValue(format(val ?? new Date(), "yyyy-MM-dd hh:mm:ss"));
            }}
            label="Value"
            sx={{ flex: 0.6 }}
          />
        )
        : (
          <DateTimePicker
            valueFormat="DD MMM YYYY hh:mm A"
            value={dateFilterValue}
            onChange={(val) => {
              setDateFilterValue(val);
              setFilterValue(format(val ?? new Date(), "yyyy-MM-dd hh:mm:ss"));
            }}
            label="Value"
            sx={{ flex: 0.6 }}
          />
        )}
    </Group>
  );
}
