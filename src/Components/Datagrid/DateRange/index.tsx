import React from "react";
import { Group, Select } from "@mantine/core";
import {
  DatePickerInput,
  MonthPickerInput,
  YearPickerInput,
} from "@mantine/dates";
import { Calendar } from "tabler-icons-react";
import {
  addDays,
  addMonths,
  addYears,
  parse,
  subDays,
  subMilliseconds,
} from "date-fns";
import { useDidUpdate } from "@mantine/hooks";
import { EDGDateFormats, TDataGridDateRangeTypes } from "../datagrid.interface";
import { useDataGrid } from "../Context/DataGridProvider";

export function DataGridDatePicker() {
  const { dispatch, endDate, startDate, dateRangeType } = useDataGrid();
  const today = new Date();

  const [dateType, setDateType] = React.useState<TDataGridDateRangeTypes>(
    dateRangeType,
  );
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    startDate
      ? parse(startDate, EDGDateFormats.dgDateFormat, new Date())
      : new Date(),
  );
  const [selectedDateRange, setSelectedDateRange] = React.useState<
    [Date | null, Date | null]
  >([
    startDate
      ? parse(startDate, EDGDateFormats.dgDateFormat, new Date())
      : subDays(today, 7),
    endDate ? parse(endDate, EDGDateFormats.dgDateFormat, new Date()) : today,
  ]);

  const [dateRange, setDateRange] = React.useState<
    [Date | null | "All", Date | null | "All"]
  >([
    startDate
      ? parse(startDate, EDGDateFormats.dgDateFormat, new Date())
      : subDays(today, 21),
    endDate
      ? parse(endDate, EDGDateFormats.dgDateFormat, new Date())
      : subMilliseconds(addDays(today, 1), 1),
  ]);

  useDidUpdate(() => {
    dispatch({
      type: "SET_DATE_RANGE",
      payload: {
        dateRangeType: dateType,
        startDate: dateRange[0],
        endDate: dateRange[1],
      },
    });
  }, [dateRange]);

  return (
    <Group sx={{ flexWrap: "nowrap" }} mx={16}>
      <Select
        sx={{ flex: 0.4 }}
        data={["All Time", "Year", "Month", "Date", "Date Range"]}
        label="Type"
        value={dateType}
        onChange={(val) => {
          setDateType((val as TDataGridDateRangeTypes) ?? "Date Range");
          setSelectedDateRange([null, null]);
          setSelectedDate(null);
          if (val === "All Time") {
            setDateRange(["All", "All"]);
          } else {
            setDateRange([null, null]);
          }
        }}
      />
      {dateType !== "All Time" &&
        (
          <>
            {dateType === "Year" && (
              <YearPickerInput
                sx={{ flex: 0.6 }}
                icon={<Calendar size="1.1rem" strokeWidth={1.5} />}
                label="Year"
                placeholder="Choose"
                value={selectedDate}
                error={selectedDate == null}
                onChange={(val) => {
                  if (val == null) return;
                  setSelectedDate(val);
                  setDateRange([val, subMilliseconds(addYears(val, 1), 1)]);
                }}
              />
            )}
            {dateType === "Month" && (
              <MonthPickerInput
                sx={{ flex: 0.6 }}
                label="Month"
                placeholder="Choose"
                icon={<Calendar size="1.1rem" strokeWidth={1.5} />}
                value={selectedDate}
                error={selectedDate == null}
                onChange={(val) => {
                  if (val == null) return;
                  setSelectedDate(val);
                  setDateRange([val, subMilliseconds(addMonths(val, 1), 1)]);
                }}
              />
            )}
            {dateType === "Date" && (
              <DatePickerInput
                sx={{ flex: 0.6 }}
                label="Date"
                placeholder="Choose"
                error={selectedDate == null}
                icon={<Calendar size="1.1rem" strokeWidth={1.5} />}
                value={selectedDate}
                onChange={(val) => {
                  if (val == null) return;
                  setSelectedDate(val);
                  setDateRange([val, subMilliseconds(addDays(val, 1), 1)]);
                }}
              />
            )}
            {dateType === "Date Range" && (
              <DatePickerInput
                sx={{ flex: 0.6 }}
                type="range"
                error={dateRange[0] === null || dateRange[1] === null}
                label="Date Range"
                placeholder="Choose"
                value={selectedDateRange}
                onChange={(val) => {
                  setSelectedDateRange(val);
                  if (val[0] == null || val[1] == null) return;
                  setDateRange([
                    val[0],
                    subMilliseconds(addDays(val[1], 1), 1),
                  ]);
                }}
              />
            )}
          </>
        )}
    </Group>
  );
}
