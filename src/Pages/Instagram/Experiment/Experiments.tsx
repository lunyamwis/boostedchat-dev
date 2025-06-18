import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { DataGrid } from "../../../Components/Datagrid";
import { Experiment } from "@/Interfaces/Instagram/Experiments/experiment.interface";
import { useCommonStateForExperiments } from "./Hooks/common.hooks";
// import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Row } from "@tanstack/react-table";
import {
  ActionIcon, Group, Loader, Text, Tooltip,
  Popover,
  Button,
  TextInput,
  Divider,
  Box,
  Radio,
  Flex,
  Select,
  Tabs,
  Space
} from "@mantine/core";
import { IconPencil, IconX, IconSearch, IconExternalLink } from "@tabler/icons-react";
import { openConfirmModal } from "@mantine/modals";
export function Experiments() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(1000);
  const { experimentQR } = useCommonStateForExperiments();
  const navigate = useNavigate();


  const navigateToExperimentDetails = (rowData: Experiment) => {
    navigate(`/instagram/experiment/${rowData.id}`, { state: { list: 'all', outreach_success: 'true' } });
  };

    const ActionColumn = React.useCallback(
      (props: { row: Row<Experiment> }) => (
        <Group>
          <Tooltip label="View Details">
            <ActionIcon
              color="brand"
              variant="light"
              onClick={() => {
                navigate(`${props.row.original.id}`);
              }}
            >
              <IconPencil size={17} strokeWidth={1.4} />
            </ActionIcon>
          </Tooltip>
          { false ? (
            <Loader size="xs" />
          ) : (
            <Tooltip label="Reset Account">
              <ActionIcon
                color="red"
                onClick={() => {
                  openConfirmModal({
                    title: "Alert",
                    children: (
                      <Text size="sm">
                        Resetting the account will delete its thread, scheduled and
                        status. Are you sure you want to proceed?
                      </Text>
                    ),
                    labels: { confirm: "Confirm", cancel: "Cancel" },
                    onConfirm: () => {},
                  });
                }}
              >
                <IconX size={17} strokeWidth={1.4} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      ),
      [navigate],
    );

  const columnDefs: ColDef<Experiment>[] = ([
    {
      accessorFn: (_, idx) => idx + 1,
      id: "experiment_number",
      header: "#",
      type: "string",
      visible: true,
    },
    {
      accessorFn: (row) => row.name,
      id: "name",
      header: "Name",
      type: "string",
      visible: true,
      cell: ({ row }) => (
        <Button justify="flex-start"
          onClick={() => navigateToExperimentDetails(row.original)}
          rightSection={<IconExternalLink size={16} />}
          variant="subtle"
          size="compact-md"
        >
          {row.original.name}
        </Button>)
    },
    {
      accessorFn: (row) => row.version,
      id: "version",
      header: "Version",
      type: "string",
      visible: true,
    },
    {
      accessorFn: (row) => row.status.name,
      id: "status",
      header: "Status",
      type: "string",
      visible: true,
    },
    {
        id: "expander",
        header: "Actions",
        visible: true,
        cell: ActionColumn,
      },
  ]);


  return (
    <>
      <DataGrid
        fn={() => {

        }}
        loading={false} //{accountsQR.isLoading || isLoading}
        tableName={"Experiments"}
        data={experimentQR.data?.results ?? []}
        columns={columnDefs}
        paginationOptions={{
          isManual: true,
          pageIndex: page,
          pageSize: pageSize,
          setPageSize: setPageSize,
          setPageIndex: setPage,
          totalRows: 10//accountsQR.data?.count ?? 0,
        }}
      />
    </>
  );
}


