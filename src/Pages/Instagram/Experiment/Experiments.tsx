import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { DataGrid } from "../../../Components/Datagrid";
import { Experiment, ExperimentStatus } from "@/Interfaces/Instagram/Experiments/experiment.interface";
import { useCommonStateForExperiments, useCommonStateForExperimentStatus } from "./Hooks/common.hooks";
import { useNavigate } from "react-router-dom";
import { Row } from "@tanstack/react-table";
import {
  ActionIcon, Group, Loader, Text, Tooltip,
  Button,
  TextInput,
  Box,
  Select,
  Modal,
  Textarea,
  SimpleGrid
} from "@mantine/core";
import { IconPencil, IconExternalLink, IconTrash } from "@tabler/icons-react";
import { openConfirmModal } from "@mantine/modals";
import { useRemoveExperiment, useUpdateExperimentDetails } from "./Hooks/experiments.hook";
import { CreateExperiment } from "./CreateExperiment";
import { Affix } from "@/Components/Widgets/Affix";
export function Experiments() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(1000);
  const { experimentQR } = useCommonStateForExperiments();
  const { experimentStatusQR } = useCommonStateForExperimentStatus();
  const navigate = useNavigate();
  const [openExperiment, setOpenExperiment] = React.useState(false);
  const [selectedExperiment, setSelectedExperiment] = React.useState<Experiment | null>(null);
  const [selectedExperimentTitle, setSelectedExperimentTitle,] = React.useState<string>('');
  const [selectedExperimentVersion, setSelectedExperimentVersion,] = React.useState<string>('');
  const [selectedExperimentStatus, setSelectedExperimentStatus,] = React.useState<ExperimentStatus>({} as ExperimentStatus);
  const [selectedExperimentPrimaryMetric, setSelectedExperimentPrimaryMetric,] = React.useState<string>('');
  const [selectedExperimentDescription, setSelectedExperimentDescription,] = React.useState<string>('');
  const updateExperimentDetails = useUpdateExperimentDetails();
  const deleteExperiment = useRemoveExperiment()

  const [isCreateExperimentModalOpen, setIsCreateExperimentModalOpen] =
    React.useState(false);

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
              // navigate(`${props.row.original.id}`);
              setOpenExperiment(true);
              setSelectedExperiment(props.row.original);
              setSelectedExperimentTitle(props.row.original.name)
              setSelectedExperimentVersion(props.row.original.version)
              setSelectedExperimentStatus(props.row.original.status);
              setSelectedExperimentPrimaryMetric(props.row.original.primary_metric ?? '');
              setSelectedExperimentDescription(props.row.original.description ?? '');
            }}
          >
            <IconPencil size={17} strokeWidth={1.4} />
          </ActionIcon>
        </Tooltip>
        {false ? (
          <Loader size="xs" />
        ) : (
          <Tooltip label="Reset Account">
            <ActionIcon

              color="#FF8282"
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
      {<Modal centered opened={openExperiment} onClose={() => {
        setOpenExperiment(false);
      }
      } size="xl" title="Edit Experiment">
        <>
          <TextInput label="Name"
            type="text"
            value={selectedExperimentTitle}
            onChange={(event) => {
              console.log(event.target.value);
              setSelectedExperimentTitle(event.target.value)
              // setValue(event.target.value)
            }}
            placeholder="Name" data-autofocus />
          <Textarea label="Description"
            resize="both"
            value={selectedExperimentDescription}
            onChange={(event) => {
              setSelectedExperimentDescription(event.target.value)
            }}
            placeholder="Experiment description" data-autofocus />
          <SimpleGrid cols={3}>
            <TextInput label="Version"
              type="text"
              value={selectedExperimentVersion}
              onChange={(event) => {
                console.log(event.target.value);
                setSelectedExperimentVersion(event.target.value)
                // setValue(event.target.value)
              }}
              placeholder="Version" data-autofocus />
            <Select
              label="Status"
              placeholder="Pick value"
              data={experimentStatusQR.data?.results?.map((status) => ({
                value: status.id,
                label: status.name,
              })) ?? []}
              value={selectedExperimentStatus.id}
              onChange={(event) => {
                console.log(event);
                let getStatus = experimentStatusQR.data?.results?.find((status) => {
                  return status.id === event;
                })
                if (getStatus) {
                  setSelectedExperimentStatus(getStatus)
                }
              }}
            />
            <TextInput label="Primary Metric"
              type="text"
              value={selectedExperimentPrimaryMetric}
              onChange={(event) => {
                console.log(event.target.value);
                setSelectedExperimentPrimaryMetric(event.target.value)
              }}
              placeholder="Primary Metric" data-autofocus />
          </SimpleGrid>



          <Button disabled={false} fullWidth loading={false} onClick={() => {
            console.log("Selected Experiment Title:", selectedExperimentTitle);
            console.log("Selected Experiment Version:", selectedExperimentVersion);
            console.log("Selected Experiment Status:", selectedExperimentStatus);
            console.log("Selected Experiment Primary Metric:", selectedExperimentPrimaryMetric);
            updateExperimentDetails.mutate({
              id: selectedExperiment?.id ?? '',
              data: {
                name: selectedExperimentTitle,
                version: selectedExperimentVersion,
                status_id: selectedExperimentStatus.id,
                description: selectedExperiment?.description ?? '',
                primary_metric: selectedExperimentPrimaryMetric,
              }
            }, {
              onSuccess: (data) => {
                console.log("Update Experiment Success:", data);
                setOpenExperiment(false);
                experimentQR.refetch(); // Refetch the experiments after updating
              },
              onError: (error) => {
                console.error("Update Experiment Error:", error);
              }
            })

          }} mt="md">
            Update
          </Button>

          <Box w={{ base: 200, sm: 400, lg: 500 }}
            py={{ base: 'xs', sm: 'md', lg: 'xl' }}
            ta="center"
            mx="auto">

            {/* {
              (showDownloadStatus && donwloadStatusError) &&
              <Alert variant="light" color="red" title={downloadErrorMsg} icon={<IconInfoCircle />} />
            } */}



          </Box>
        </>
      </Modal>}
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
      <Affix
        tooltipLabel="Create New Experiment"
        onClickAction={() => setIsCreateExperimentModalOpen(true)}
      />
      <CreateExperiment
        isOpen={isCreateExperimentModalOpen}
        setIsOpen={setIsCreateExperimentModalOpen}
        status={experimentStatusQR.data?.results ?? []}
        experimentQR={experimentQR}
      />
    </>
  );
}


