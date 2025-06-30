import React, { useState } from "react";


import { ExperimentFieldDefinition } from "@/Interfaces/Instagram/Experiments/experiment.interface";
import { DataGrid } from "@/Components/Datagrid";
import { ColDef } from "@/Components/Datagrid/datagrid.interface";
import { useCommonStateForExperimentDetails } from "../Hooks/common.hooks";
import { useLocation } from "react-router-dom";
import AddFieldDefinitionModal from "./AddFieldDefinitionModal";
import { Affix } from "@/Components/Widgets/Affix";
import {
  Card,
  ActionIcon, Tooltip, Loader,
  Text, Badge, Group, Space
} from '@mantine/core';
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { openConfirmModal } from "@mantine/modals";
import { Row } from "@tanstack/react-table";
import { useRemoveFieldDefinition } from "../Hooks/experimentFieldDefinition.hooks";

export function ExperimentDetails() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(1000);
  const { pathname } = useLocation();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editExperimentFieldDefinition, setEditExperimentFieldDefinition] = useState<ExperimentFieldDefinition | null>(null);

  const id = React.useMemo(() => {
    const pathItems = pathname.split('/');
    return pathItems[pathItems.length - 1];
  }, [pathname]);
  // const id = pathItems[pathItems.length - 1]
  const { experimentQR } = useCommonStateForExperimentDetails(id);
  const { deleteFieldDefinition } = useRemoveFieldDefinition();

  function refetchFieldDefinitions() {
    experimentQR.refetch();
    setAddModalOpen(false);
  }

  const handleEditFieldDefinition = React.useCallback((fieldDef: ExperimentFieldDefinition) => {
    setEditExperimentFieldDefinition(fieldDef);
    setAddModalOpen(true);
  }, []);

  const ActionColumn = React.useCallback(
    (props: { row: Row<ExperimentFieldDefinition> }) => (
      <Group>
        <Tooltip label="View Details">
          <ActionIcon
            color="brand"
            variant="light"
            onClick={() => {
              handleEditFieldDefinition(props.row.original)
              // setEditExperimentFieldDefinition(props.row.original);
              // setAddModalOpen(true);
            }}
          >
            <IconPencil size={17} strokeWidth={1.4} />
          </ActionIcon>
        </Tooltip>
        {false ? (
          <Loader size="xs" />
        ) : (
          <Tooltip label="Remove Field">
            <ActionIcon
              color="#FF8282"
              onClick={() => {
                openConfirmModal({
                  title: "Alert",
                  children: (
                    <Text size="sm">
                      This will completely remove this field & it's values. Are you sure you want to proceed?
                    </Text>
                  ),
                  labels: { confirm: "Confirm", cancel: "Cancel" },
                  onConfirm: () => {
                    deleteFieldDefinition.mutate(props.row.original.id, {
                      onSuccess: () => {
                        refetchFieldDefinitions();
                        setEditExperimentFieldDefinition(null);
                      },
                    });
                  },
                });
              }}
            >
              <IconTrash size={17} strokeWidth={1.4} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    ), [],
  );

  const closeAndCleanUp = () => {
    setAddModalOpen(false)
    setEditExperimentFieldDefinition(null);
  }

  const columnDefs: ColDef<ExperimentFieldDefinition>[] = ([
    {
      accessorFn: (_, idx) => idx + 1,
      id: "experiment_number",
      header: "#",
      type: "string",
      visible: true,
    },
    {
      accessorFn: (row) => {
        return row.config.name;
      },
      id: "name",
      header: "Name",
      type: "string",
      visible: true,
    },
    {
      accessorFn: (row) => {
        return row?.field_value
      },
      id: "value",
      header: "Value",
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
      <AddFieldDefinitionModal
        experimentId={id}
        opened={addModalOpen}
        onClose={() => closeAndCleanUp()}
        onSuccess={() => refetchFieldDefinitions()}
        fieldDefinition={editExperimentFieldDefinition}
      />

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{experimentQR?.data?.name}</Text>
          <Badge color="pink">{experimentQR?.data?.status.name}</Badge>
        </Group>

        <Text fw={500} size="lg" mt="md">
          Hypothesis:
        </Text>

        <Text size="sm" c="brand">
          {experimentQR?.data?.hypothesis}
        </Text>

         <Text fw={500} size="md" mt="md">
          Description:
        </Text>

        <Text size="sm" c="dimmed">
          {experimentQR?.data?.description}
        </Text>


      </Card>

      <Space h="md" />

      <DataGrid
        fn={() => {

        }}
        showSearch={false}
        showExportCsv={false}
        showExportExcel={false}
        loading={false} //{accountsQR.isLoading || isLoading}
        tableName={`Custom Fields`}
        data={experimentQR.data?.field_definitions ?? []}
        columns={columnDefs}
        paginationOptions={{
          isManual: true,
          pageIndex: page,
          pageSize: pageSize,
          setPageSize: setPageSize,
          setPageIndex: setPage,
          totalRows: experimentQR.data?.field_definitions?.length ?? 0,
        }}
      />
      <Affix
        tooltipLabel="Add Field Definition"
        onClickAction={() => {
          setEditExperimentFieldDefinition(null);
          setAddModalOpen(true);
        }}
      />
    </>
  );
}


