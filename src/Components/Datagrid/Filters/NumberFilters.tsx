import { Group, NumberInput, Select } from "@mantine/core";
import React from "react";
import { TNumberOperators } from "../datagrid.interface";

type Props = {
  filterOperator: TNumberOperators | null;
  setFilterOperator: React.Dispatch<
    React.SetStateAction<TNumberOperators | null>
  >;
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
};

export function NumberFilters({
  filterOperator,
  setFilterOperator,
  filterValue,
  setFilterValue,
}: Props) {
  const [numberFilterValue, setNumberFilterValue] = React.useState<"" | number>(
    filterValue === "" ? "" : parseInt(filterValue, 10),
  );

  return (
    <Group>
      <Select
        label="Operator"
        data={[
          { value: "eq", label: "Equals" },
          { value: "ne", label: "Not Equal" },
          { value: "gt", label: "Greater than" },
          { value: "gte", label: "Greater than or Equal to" },
          { value: "lt", label: "Less than" },
          { value: "lte", label: "Less than or Equal to" },
        ]}
        value={filterOperator ?? "eq"}
        onChange={(val: TNumberOperators | null) =>
          setFilterOperator(val ?? "eq")}
        sx={{ flex: 0.7 }}
      />
      <NumberInput
        hideControls
        value={numberFilterValue}
        onChange={(val) => {
          setFilterValue(val.toString());
          setNumberFilterValue(val);
        }}
        label="Value"
        sx={{ flex: 0.3 }}
      />
    </Group>
  );
}
