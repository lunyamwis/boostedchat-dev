import React from "react";
import { Row } from "@tanstack/react-table";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useScriptRoleApi } from "@/Apis/Prompts/Role.api";
import { GetScriptRole } from "@/Interfaces/Scripts/role.interface";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/Constants/ApiConstants";
import { ColDef } from "@/Components/Datagrid/datagrid.interface";
import { DataGrid } from "@/Components/Datagrid";
import { Affix } from "@/Components/Widgets/Affix";
import { EditRole } from "./EditRole";

export function ScriptRoles() {
  const [updateRoleModalOpen, setUpdateRoleModalOpen] = React.useState(false);
  const [, setNewRoleModalOpen] = React.useState(false);
  const [selectedRoleId, setSelectedRoleId] = React.useState("");

  const { getAll } = useScriptRoleApi();
  const roleQR = useQuery({
    queryKey: [queryKeys.scripts.roles.allRoles],
    queryFn: () => getAll(),
  });

  const ActionColumn = React.useCallback(
    (props: { row: Row<GetScriptRole> }) => (
      <Group>
        <Tooltip label="View Details">
          <ActionIcon
            color="brand"
            variant="light"
            onClick={() => {
              setSelectedRoleId(props.row.original.id);
              setUpdateRoleModalOpen(true);
            }}
          >
            <IconPencil size={17} strokeWidth={1.4} />
          </ActionIcon>
        </Tooltip>
      </Group>
    ),
    [],
  );

  const columns: ColDef<GetScriptRole>[] = React.useMemo(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        id: "no",
        header: "#",
        visible: true,
      },
      {
        accessorFn: (row) => row.name,
        id: "name",
        header: "Instagram Name",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.description,
        id: "description",
        header: "Description",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.tone_of_voice,
        id: "tone_of_voice",
        header: "Tone of Voice",
        visible: true,
        type: "string",
      },
      {
        id: "expander",
        header: "Actions",
        visible: true,
        cell: ActionColumn,
      },
    ],
    [],
  );

  return (
    <>
      <DataGrid
        paginationOptions={{ isManual: false }}
        loading={roleQR.isLoading}
        tableName="Roles"
        data={roleQR.data ?? []}
        columns={columns}
      />
      <Affix
        tooltipLabel="Create new Role"
        onClickAction={() => setNewRoleModalOpen(true)}
      />
      <EditRole
        roleId={selectedRoleId}
        isOpen={updateRoleModalOpen}
        setIsOpen={setUpdateRoleModalOpen}
      />
    </>
  );
}
