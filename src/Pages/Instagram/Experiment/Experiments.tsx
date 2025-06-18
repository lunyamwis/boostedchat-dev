import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { DataGrid } from "../../../Components/Datagrid";
import { Experiment, ExperimentStatus } from "@/Interfaces/Instagram/Experiments/experiment.interface";
import { useCommonStateForExperiments, useCommonStateForExperimentStatus } from "./Hooks/common.hooks";
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
  Space,
  Modal
} from "@mantine/core";
import { IconPencil, IconX, IconSearch, IconExternalLink } from "@tabler/icons-react";
import { openConfirmModal } from "@mantine/modals";
import { set } from "lodash";
import { useUpdateExperimentDetails } from "./Hooks/experiments.hook";
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
  const updateExperimentDetails = useUpdateExperimentDetails();

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
                  onConfirm: () => { },
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

  console.log("Selected Experiment:")
  console.log(selectedExperiment)
  console.log("Experiment QR Data:")
  console.log(experimentStatusQR.data?.results)


  return (
    <>
      {<Modal centered opened={openExperiment} onClose={() => {
        setOpenExperiment(false);
      }
      } size="auto" title="Generate image download url">
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
              // setSelectedExperimentStatus(event.target.value);
              let getStatus = experimentStatusQR.data?.results?.find((status) => {
                return status.id === event;
              })
              if (getStatus) {
                setSelectedExperimentStatus(getStatus)
              }
            }}
          />
          <Button disabled={false} fullWidth loading={false} onClick={() => {
            console.log("Selected Experiment Title:", selectedExperimentTitle);
            console.log("Selected Experiment Version:", selectedExperimentVersion);
            console.log("Selected Experiment Status:", selectedExperimentStatus);
            updateExperimentDetails.mutate({
              id: selectedExperiment?.id ?? '',
              data: {
                name: selectedExperimentTitle,
                version: selectedExperimentVersion,
                status_id: selectedExperimentStatus.id,
                description: selectedExperiment?.description ?? '',
                primary_metric: selectedExperiment?.primary_metric ?? '',
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
        tooltipLabel="Create New Account"
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


