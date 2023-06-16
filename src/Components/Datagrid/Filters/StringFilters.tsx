import { Group, Select, TextInput } from "@mantine/core";
import React from "react";
import { TStringOperators } from "../datagrid.interface";

type Props = {
  filterOperator: TStringOperators | null;
  setFilterOperator: React.Dispatch<
    React.SetStateAction<TStringOperators | null>
  >;
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
};

export function StringFilters({
  filterOperator,
  setFilterOperator,
  filterValue,
  setFilterValue,
}: Props) {
  return (
    <Group align="center">
      <Select
        data={[
          { value: "eq", label: "Is" },
          { value: "ilike", label: "Contains" },
        ]}
        value={filterOperator ?? "eq"}
        onChange={(val) => setFilterOperator((val as "eq" | "ilike") ?? "eq")}
        label="Operator"
        sx={{ flex: 0.4 }}
      />
      <TextInput
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        label="Value"
        sx={{ flex: 0.6 }}
      />
    </Group>
  );
}
