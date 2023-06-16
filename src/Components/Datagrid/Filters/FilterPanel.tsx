import { Button, Group, Stack } from "@mantine/core";
import React from "react";
import { Plus } from "tabler-icons-react";
import { ColumnFilter } from ".";
import { ColDef, IDGFilter } from "../datagrid.interface";

type Props = {
  filteredVisibleColumns: {
    visibleColumns: { value: string; label: string }[];
    filteredColumns: Array<ColDef<any> & Pick<IDGFilter, "operator" | "value">>;
  };
};

export function FilterPanel({ filteredVisibleColumns }: Props) {
  const [isCreating, setIsCreating] = React.useState(false);
  return (
    <Stack px={20}>
      {filteredVisibleColumns.filteredColumns.map((filteredColumn) => (
        <ColumnFilter
          key={filteredColumn.id}
          filteredColumn={filteredColumn}
          visibleTableColumns={filteredVisibleColumns.visibleColumns}
        />
      ))}
      {isCreating && (
        <ColumnFilter
          filteredColumn={null}
          visibleTableColumns={filteredVisibleColumns.visibleColumns}
          setIsCreating={setIsCreating}
        />
      )}
      <Group position="left">
        <Button
          leftIcon={<Plus />}
          disabled={isCreating}
          onClick={() => setIsCreating(true)}
          variant="subtle"
        >
          New Filter
        </Button>
      </Group>
    </Stack>
  );
}
