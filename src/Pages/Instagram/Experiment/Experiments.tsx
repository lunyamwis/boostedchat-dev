import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { DataGrid } from "../../../Components/Datagrid";
import { Experiment, ExperimentStatus } from "@/Interfaces/Instagram/Experiments/experiment.interface";
import { useCommonStateForExperimentAssignees, useCommonStateForExperiments, useCommonStateForExperimentStatus } from "./Hooks/common.hooks";
import { useNavigate } from "react-router-dom";
import { Row } from "@tanstack/react-table";
import {
  ActionIcon, Group, Loader, Text, Tooltip,
  Button,
  Popover,
  TextInput,
  Divider,
  Box,
  Radio,
  Select,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import {
  IconPencil, IconExternalLink, IconTrash, IconCopy,
  IconSearch
} from "@tabler/icons-react";
import { openConfirmModal } from "@mantine/modals";
import {
  useDuplicateExperiment, useRemoveExperiment,
  // useUpdateExperimentDetails 
} from "./Hooks/experiments.hook";
import { CreateExperiment } from "./CreateExperiment";
import { Affix } from "@/Components/Widgets/Affix";
import { useDebouncedValue } from "@mantine/hooks";
export function Experiments() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(1000);
  const { experimentQR, setFilterParams, filterParams } = useCommonStateForExperiments();
  const { experimentStatusQR } = useCommonStateForExperimentStatus();
  const { experimentAssigneeQR } = useCommonStateForExperimentAssignees();
  const navigate = useNavigate();
  const [selectedExperiment, setSelectedExperiment] = React.useState<Experiment | undefined>(undefined);
  const [experimentStatus, setExperimentStatus] = React.useState<string | undefined>(undefined);
  const deleteExperiment = useRemoveExperiment()
  const duplicateExperiment = useDuplicateExperiment();
  // const updateExperimentDetails = useUpdateExperimentDetails();
  const [isCreateExperimentModalOpen, setIsCreateExperimentModalOpen] = React.useState(false);
  const [opened, setOpened] = React.useState(false);
  const [value, setValue] = React.useState<[Date | null, Date | null]>([null, null]);
  const [experiment_type, setExperimentType] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 700);
  const [selectedExperimentStatus, setSelectedExperimentStatus,] = React.useState<ExperimentStatus | null>(null);

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

  const handleClearFilters = () => {
    // Execute your query here with startDate and endDate
    setOpened(false);
    setExperimentType('all');
    setValue([null, null]);

    setFilterParams(
      {
        ...filterParams,
        end_at_lt: "",
        experiment_status: "",
        name: "",
        experiment_type: "",
        start_at_gte: "",
        primary_metric: "",
        page: page,
      }
    );

  };

  const handleFilterClick = () => {
    const formattedStartDate = value[0] ? `${value[0].getFullYear()}-${String(value[0].getMonth() + 1).padStart(2, '0')}-${String(value[0].getDate()).padStart(2, '0')}` : ''
    const formattedEndDate = value[1] ? `${value[1].getFullYear()}-${String(value[1].getMonth() + 1).padStart(2, '0')}-${String(value[1].getDate()).padStart(2, '0')}` : ''//formattedStartDate

    setOpened(false);
    setFilterParams(
      {
        ...filterParams,
        start_at_gte: formattedStartDate,
        end_at_lt: formattedEndDate,
        page: page,
        name: searchQuery,
        experiment_status: selectedExperimentStatus?.name || "",
        experiment_type: experiment_type
        // primary_metric
      }
    );
  };

  React.useEffect(() => {
    console.log("searchQuery");
    console.log(searchQuery);
    setFilterParams({
      ...filterParams,
      name: searchQuery,
    })
  }, [debouncedSearchQuery]);

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
    <>   <Group gap={"xs"}>
      <Box px={24}>
        <TextInput
          variant="filled"
          leftSection={<IconSearch size={17} />}
          placeholder="Search by igname..."
          value={searchQuery}
          // rightSection={icon}
          onChange={
            (e) => setSearchQuery(e.target.value)
          }
        />
      </Box>
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position="bottom-start"
        withArrow
        trapFocus
      >
        <Popover.Target>
          <Button variant="outline" onClick={() => setOpened((prev) => !prev)}>Filter Data</Button>
        </Popover.Target>
        <Popover.Dropdown>
          {/* Form with Start and End Date Inputs */}

          <Box style={{ margin: "10px" }}>
            <Radio.Group
              value={experiment_type}
              onChange={setExperimentType}
              name="QualifedStatus"
              label="Experiment type"
            >
              <Group>
                <Radio value="all" label="All" />
                <Radio value="manual" label="Manual" />
                <Radio value="auto" label="Auto" />
              </Group>


            </Radio.Group>

          </Box>
          <Box title="Experiment stage" style={{ margin: "10px" }}>
            <Select
              clearable
              label="Experiment stage"
              placeholder="Select a stage"

              data={experimentStatusQR.data?.results.map((status) => ({
                value: status.id,
                label: status.name,
              })) ?? []}
              value={selectedExperimentStatus?.id}
              onChange={(event) => {
                let getStatus = experimentStatusQR.data?.results.find((status) => {
                  return status.id === event;
                })
                if (getStatus) {
                  setSelectedExperimentStatus(getStatus)
                }
              }}
              defaultValue={null}
            />
          </Box>

          <Group gap="sm">
            <TextInput label="Start Date" readOnly value={value[0]?.toLocaleDateString()} onClick={() => setOpened(true)} />
            <TextInput label="End Date" readOnly value={value[1]?.toLocaleDateString()} onClick={() => setOpened(true)} />
          </Group>

          {/* Date Pickers for Selecting Dates */}
          <Group gap="sm">
            <DatePicker type="range" allowSingleDateInRange value={value} onChange={setValue} />
          </Group>

          {/* Filter Button */}
          <Button onClick={handleFilterClick}>Apply Filter</Button>
          {" "}
          <Button onClick={handleClearFilters}>Clear filters</Button>
        </Popover.Dropdown>
      </Popover>
      <Group>
        <Text fw={700} size="xl" >Experiment type: </Text> <Text fw={500} size="xl" > {experiment_type} </Text>
        <Text fw={700} size="xl" >Stage: </Text> <Text fw={500} size="xl" > {selectedExperimentStatus?.name} </Text>
        <Text fw={700} size="xl" >Date: </Text>
        <Text fw={500} size="xl" >{value[0]?.toLocaleDateString()}</Text> - <Text fw={500} size="xl">{value[1]?.toLocaleDateString()}</Text>
      </Group>
    </Group>
      <Divider my="md" />
      <DataGrid
        fn={() => {

        }}
        loading={experimentQR.isPending}
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


