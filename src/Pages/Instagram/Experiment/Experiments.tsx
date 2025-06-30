import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { DataGrid } from "../../../Components/Datagrid";
import { Experiment } from "@/Interfaces/Instagram/Experiments/experiment.interface";
import { useCommonStateForExperimentAssignees, useCommonStateForExperiments, useCommonStateForExperimentStatus } from "./Hooks/common.hooks";
import { useNavigate } from "react-router-dom";
import { Row } from "@tanstack/react-table";
import {
  ActionIcon, Group, Loader, Text, Tooltip,
  Button,
} from "@mantine/core";
import { IconPencil, IconExternalLink, IconTrash, IconCopy, 
  // IconPlayerPlayFilled 
} from "@tabler/icons-react";
import { openConfirmModal } from "@mantine/modals";
import { useDuplicateExperiment, useRemoveExperiment, 
  // useUpdateExperimentDetails 
} from "./Hooks/experiments.hook";
import { CreateExperiment } from "./CreateExperiment";
import { Affix } from "@/Components/Widgets/Affix";
export function Experiments() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(1000);
  const { experimentQR } = useCommonStateForExperiments();
  const { experimentStatusQR } = useCommonStateForExperimentStatus();
  const { experimentAssigneeQR } = useCommonStateForExperimentAssignees();
  const navigate = useNavigate();
  const [selectedExperiment, setSelectedExperiment] = React.useState<Experiment | undefined>(undefined);
  const [experimentStatus, setExperimentStatus] = React.useState<string | undefined>(undefined);
  const deleteExperiment = useRemoveExperiment()
  const duplicateExperiment = useDuplicateExperiment();
  // const updateExperimentDetails = useUpdateExperimentDetails();
  const [isCreateExperimentModalOpen, setIsCreateExperimentModalOpen] = React.useState(false);

  const navigateToExperimentDetails = (rowData: Experiment) => {
    navigate(`/instagram/experiment/${rowData.id}`, { state: { list: 'all', outreach_success: 'true' } });
  };



  const handleEditExperiment = React.useCallback((experiment: Experiment) => {
    setExperimentStatus('edit');
    setSelectedExperiment(experiment);
    setIsCreateExperimentModalOpen(true);
  }, []);

  const cleanUp = () => {
    setExperimentStatus(undefined);
    setSelectedExperiment(undefined);
  }

  const handleNewExperiment = () => {
    setIsCreateExperimentModalOpen(true)
  }

  React.useEffect(() => {
    if (experimentStatus !== null) {
      switch (experimentStatus) {
        case 'edit':
          setIsCreateExperimentModalOpen(true);
          break;
        case 'new':
          setSelectedExperiment(undefined);
          setIsCreateExperimentModalOpen(true);
          break;
        default:
          break;
      }
    }
  }, [experimentStatus]);

  const ActionColumn = React.useCallback(
    (props: { row: Row<Experiment> }) => (
      <Group>
        <Tooltip label="View Details">
          <ActionIcon
            color="brand"
            variant="light"
            onClick={() => {
              handleEditExperiment(props.row.original)
            }}
          >
            <IconPencil size={17} strokeWidth={1.4} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Duplicate Experiment">
          <ActionIcon
            color="grape"
            variant="light"
            onClick={() => {
              openConfirmModal({
                title: "Alert",
                children: (
                  <Text size="sm">
                    This will duplicate the experiment. Are you sure you want to proceed?
                  </Text>
                ),
                labels: { confirm: "Confirm", cancel: "Cancel" },
                onConfirm: () => {
                  duplicateExperiment.mutate(props.row.original.id, {
                    onSuccess: () => {
                      experimentQR.refetch(); // Refetch the experiments after deletion
                    },
                    onError: (error) => {
                      console.error("Delete Experiment Error:", error);
                    }
                  })
                },
              });
            }}
          >
            <IconCopy size={17} strokeWidth={1.4} />
          </ActionIcon>
        </Tooltip>


        {/* <Tooltip label="Start Experiment">
          <ActionIcon
            color="brand"
            variant="light"
            onClick={() => {
              openConfirmModal({
                title: "Alert",
                children: (
                  <Text size="sm">
                    This will start the experiment. Are you sure you want to proceed?
                  </Text>
                ),
                labels: { confirm: "Confirm", cancel: "Cancel" },
                onConfirm: () => {
                  console.log("SET THE START DATE");
                  console.log("SET THE STATUS TO MEASURING");
                },
              });
            }}
          >
            <IconPlayerPlayFilled size={17} strokeWidth={1.4} />
          </ActionIcon>
        </Tooltip> */}


        {false ? (
          <Loader size="xs" />
        ) : (
          <Tooltip label="Delete">
            <ActionIcon
              color="#FF8282"
              variant="light"
              onClick={() => {
                openConfirmModal({
                  title: "Alert",
                  children: (
                    <Text size="sm">
                      This will completely remove this experiment & all it's data. Are you sure you want to proceed?
                    </Text>
                  ),
                  labels: { confirm: "Confirm", cancel: "Cancel" },
                  onConfirm: () => {
                    deleteExperiment.mutate(props.row.original.id, {
                      onSuccess: () => {
                        experimentQR.refetch(); // Refetch the experiments after deletion
                      },
                      onError: (error) => {
                        console.error("Delete Experiment Error:", error);
                      }
                    })
                  },
                });
              }}
            >
              <IconTrash size={17} strokeWidth={1.4} />
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
      accessorFn: (row) => row.experiment_type,
      id: "type",
      header: "Exp Type",
      type: "string",
      visible: true,
    },
    {
      accessorFn: (row) => row.version,
      id: "version",
      header: "EXP ID",
      type: "string",
      visible: true,
    },
    {
      accessorFn: (row) => row.primary_metric,
      id: "primary_metric",
      header: "Primary Metric",
      type: "string",
      visible: true,
    },
    {
      accessorFn: (row) => row.expected_result,
      id: "expected_size",
      header: "Opt size weekly",
      type: "string",
      visible: true,
    },
    {
      accessorFn: (row) => row.actual_result,
      id: "actual_result",
      header: "Actual Result",
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
          totalRows: experimentQR.data?.count ?? 0,
        }}
      />
      <Affix
        tooltipLabel="Create New Experiment"
        onClickAction={() => handleNewExperiment()}
      />
      {<CreateExperiment
        isOpen={isCreateExperimentModalOpen}
        setIsOpen={setIsCreateExperimentModalOpen}
        status={experimentStatusQR.data?.results ?? []}
        experimentQR={experimentQR}
        selectedExperiment={selectedExperiment}
        assignees={experimentAssigneeQR.data?.results ?? []}
        cleanUp={cleanUp}
      />}
    </>
  );
}


