import React, { useState } from "react";
import {
  ActionIcon,
  Divider,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Check, Trash, X } from "tabler-icons-react";
import { format, parseISO } from "date-fns";
import {
  ColDef,
  EDGDateFormats,
  IDGFilter,
  TColumnType,
  TDateOperators,
  TFilterOperator,
  TFilterOperatorAndType,
  TNumberOperators,
  TStringOperators,
  TValueOptions,
} from "../datagrid.interface";
import { StringFilters } from "./StringFilters";
import { NumberFilters } from "./NumberFilters";
import { DateFilters } from "./DateFilters";
import { SingleSelectFilters } from "./SingleSelectFilters";
import { useDataGrid } from "../Context/DataGridProvider";
import { mapFilterOperator } from "../datagrid.util";

type Props = {
  visibleTableColumns: { value: string; label: string }[];
  filteredColumn: (ColDef<any> & Pick<IDGFilter, "operator" | "value">) | null;
  setIsCreating?: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormatFilterValue =
  | { type: "string" | "number" | "date" | "dateTime"; value: string }
  | { type: "boolean"; value: boolean }
  | {
    type: "singleSelect";
    value: string;
    options: TValueOptions[] | string[];
  }
  | { type: "actions"; value: null };

const formatFilterValue = (
  payload: FormatFilterValue,
) => {
  if (payload.type === "string" || payload.type === "number") {
    return payload.value;
  }
  if (payload.type === "boolean") {
    return payload.value === true ? "true" : "false";
  }
  if (payload.type === "date") {
    return format(parseISO(payload.value), EDGDateFormats.shortDateWithoutTime);
  }
  if (payload.type === "dateTime") {
    return format(new Date(payload.value), EDGDateFormats.shortDateWithTime);
  }
  if (payload.type === "singleSelect") {
    let mFilterLabel: string = "";
    for (let i = 0; i < payload.options.length; i += 1) {
      const opt: string | TValueOptions = payload.options[i];
      if (typeof opt === "string") {
        mFilterLabel = payload.value;
        break;
      }
      if (opt.value.toString() === payload.value) {
        mFilterLabel = opt.label;
        break;
      }
    }
    return mFilterLabel;
  }
  return "unknown";
};

const getColType = (
  isGenerated: boolean | undefined,
  isRelation: boolean | undefined,
): TColumnType => {
  let colType: TColumnType = "select";
  if (isGenerated) {
    colType = "generated";
  }
  if (isRelation) {
    colType = "relation";
  }
  return colType;
};

export function ColumnFilter({
  visibleTableColumns,
  filteredColumn,
  setIsCreating,
}: Props) {
  const { dispatch, tableColumns } = useDataGrid();

  const [selectedColumnDef, setSelectedColumnDef] = useState<
    null | ColDef<any>
  >(null);
  const [selectedColumnId, setSelectedColumnId] = useState<null | string>(null);
  const [filterOperator, setFilterOperator] = useState<TFilterOperator>("eq");
  const [filterValue, setFilterValue] = React.useState("");
  const [editMode, setEditMode] = React.useState(true);

  const handleSetFilter = () => {
    if (filterValue === "") {
      return;
    }
    if (filterOperator == null) {
      return;
    }
    if (selectedColumnId == null) {
      return;
    }
    const colType = getColType(
      selectedColumnDef?.isGenerated,
      selectedColumnDef?.isRelation,
    );
    dispatch({
      type: "ADD_FILTER",
      payload: {
        columnType: colType,
        filter: {
          value: filterValue,
          operator: filterOperator,
          columnId: selectedColumnId,
        },
      },
    });
    if (setIsCreating) {
      setIsCreating(false);
    }
  };

  const handleRemoveFilter = () => {
    const colType = getColType(
      selectedColumnDef?.isGenerated,
      selectedColumnDef?.isRelation,
    );
    if (setIsCreating) {
      setIsCreating(false);
      return;
    }
    dispatch({
      type: "REMOVE_FILTER",
      payload: { columnId: selectedColumnDef?.id!, columnType: colType },
    });
  };

  React.useEffect(() => {
    if (filteredColumn == null) return;
    setEditMode(false);
    setFilterValue(filteredColumn.value);
    setFilterOperator(filteredColumn.operator);
    setSelectedColumnId(filteredColumn.id);
    setSelectedColumnDef(filteredColumn);
  }, []);

  return editMode
    ? (
      <Group
        sx={{
          padding: "20px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Stack sx={{ flex: 0.9 }}>
          <Select
            label="Column"
            searchable
            data={visibleTableColumns}
            value={selectedColumnId}
            onChange={(val) => {
              setSelectedColumnId(val);
              const mColDef = tableColumns.find(
                (visColDef) => visColDef.id === val,
              );
              setSelectedColumnDef(mColDef ?? null);
            }}
          />
          {selectedColumnDef == null
            ? (
              <Group sx={{ flex: 0.89 }}>
                <Select
                  sx={{ flex: 0.4 }}
                  label="Operator"
                  disabled
                  data={[]}
                />
                <TextInput sx={{ flex: 0.6 }} disabled label="Value" />
              </Group>
            )
            : (
              <Group sx={{ flex: 0.89 }}>
                {(selectedColumnDef.type === "string" ||
                  selectedColumnDef.type == null) && (
                  <StringFilters
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    filterOperator={filterOperator as TStringOperators | null}
                    setFilterOperator={setFilterOperator as React.Dispatch<
                      React.SetStateAction<TStringOperators | null>
                    >}
                  />
                )}
                {selectedColumnDef.type === "number" && (
                  <NumberFilters
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    filterOperator={filterOperator as TNumberOperators | null}
                    setFilterOperator={setFilterOperator as React.Dispatch<
                      React.SetStateAction<TNumberOperators | null>
                    >}
                  />
                )}
                {(selectedColumnDef.type === "date" ||
                  selectedColumnDef.type === "dateTime") && (
                  <DateFilters
                    type={selectedColumnDef.type}
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    filterOperator={filterOperator as TDateOperators}
                    setFilterOperator={setFilterOperator as React.Dispatch<
                      React.SetStateAction<TDateOperators | null>
                    >}
                  />
                )}
                {selectedColumnDef.type === "singleSelect" && (
                  <SingleSelectFilters
                    setFilterValue={setFilterValue}
                    options={selectedColumnDef.valueOptions}
                  />
                )}
              </Group>
            )}
        </Stack>
        <Group sx={{ flex: 0.1 }}>
          <ActionIcon onClick={handleRemoveFilter} radius="xl" color="red">
            <X />
          </ActionIcon>
          <ActionIcon onClick={handleSetFilter} radius="xl" color="teal">
            <Check />
          </ActionIcon>
        </Group>
      </Group>
    )
    : (
      <Stack>
        <Group position="apart">
          <Group sx={{ fontSize: 16 }} spacing={4}>
            <Text>
              {typeof filteredColumn?.header === "string"
                ? filteredColumn?.header
                : selectedColumnDef?.id}
            </Text>
            {filteredColumn?.type && filteredColumn?.operator &&
              filteredColumn?.type !== "actions" &&
              (
                <Text color="dimmed">
                  {mapFilterOperator({
                    type: filteredColumn?.type,
                    operator: filteredColumn?.operator,
                  } as TFilterOperatorAndType)}
                </Text>
              )}
            <Text fw={500}>
              {filteredColumn?.type === "singleSelect"
                ? formatFilterValue({
                  type: "singleSelect",
                  value: filteredColumn?.value ?? "",
                  options: filteredColumn.valueOptions,
                })
                : formatFilterValue({
                  type: filteredColumn?.type ?? "string",
                  value: filteredColumn?.value ?? "",
                } as FormatFilterValue)}
            </Text>
          </Group>
          <Group>
            <ActionIcon onClick={handleRemoveFilter} color="red" radius="xl">
              <Trash strokeWidth={1.2} size={19} />
            </ActionIcon>
          </Group>
        </Group>
        <Divider />
      </Stack>
    );
}
