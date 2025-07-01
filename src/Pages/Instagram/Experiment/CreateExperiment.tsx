import React from "react";
import {
  Alert,
  Button,
  Collapse,
  Modal,
  MultiSelect,
  Select,
  SimpleGrid,
  Textarea,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconAlertTriangle,
  IconCheck,
} from "@tabler/icons-react";
import { useAlert } from "../../../Hooks/useAlert";
import { useExperimentsWrapperApi, useUpdateExperimentDetails } from "./Hooks/experiments.hook";
import { Experiment, ExperimentAssignee, ExperimentStatus } from "@/Interfaces/Instagram/Experiments/experiment.interface";
import { UseQueryResult } from "@tanstack/react-query";
import { PaginatedQuery } from "@/Interfaces/general.interface";
import dayjs from 'dayjs';
import { DateInput } from "@mantine/dates";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status: ExperimentStatus[];
  assignees: ExperimentAssignee[];
  experimentQR: UseQueryResult<PaginatedQuery<Experiment>, Error>
  selectedExperiment?: Experiment;
  cleanUp: () => void
};

export function CreateExperiment({ isOpen, status, experimentQR, selectedExperiment, assignees, setIsOpen, cleanUp }: Props) {
  const { alertInfo, setAlertInfo, showAlert, setShowAlert } = useAlert();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [primary_metric, setPrimaryMetric] = React.useState("");
  const [version, setVersion] = React.useState("");
  const [hypothesis, setHypothesis] = React.useState("");
  const [expected_result, setExpectedResult] = React.useState<string | null>(null);
  const { createExperiment } = useExperimentsWrapperApi();
  const [selectedExperimentStatus, setSelectedExperimentStatus,] = React.useState<ExperimentStatus>({} as ExperimentStatus);
  const [selectedExperimentType, setSelectedExperimentType,] = React.useState<string | null>('auto');
  const [selectedExperimentAssignee, setSelectedExperimentAssignee,] = React.useState<string[] | undefined>([]);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const updateExperimentDetails = useUpdateExperimentDetails();

  // set default status
  React.useEffect(() => {
    if (selectedExperiment) {
      setName(selectedExperiment.name)
      setVersion(selectedExperiment.version)
      setSelectedExperimentStatus(selectedExperiment.status);
      setPrimaryMetric(selectedExperiment.primary_metric ?? '');
      setDescription(selectedExperiment.description ?? '');
      setHypothesis(selectedExperiment.hypothesis ?? '');
      setExpectedResult(selectedExperiment.expected_result ?? null);
      setSelectedExperimentType(selectedExperiment.experiment_type)
      setSelectedExperimentAssignee(
        selectedExperiment.assignees.map((id) => {
          const foundAssignee = assignees.find((assignee) => assignee.id === id);
          return foundAssignee ? foundAssignee.id : '';
        }));
      setStartDate(selectedExperiment.start_date ? new Date(selectedExperiment.start_date) : null)
      setEndDate(selectedExperiment.end_date ? new Date(selectedExperiment.end_date) : null)
    } else {
      if (status.length > 0) {
        let getDraftStatus = status.find((status) => {
          return status.name === 'idea';
        })
        if (getDraftStatus) {
          setSelectedExperimentStatus(getDraftStatus);
        } else {
          // Fallback to the first status if 'draft' is not found
          setSelectedExperimentStatus(status[0]);
        }
      }
    }

  }, [selectedExperiment]

  );


  function onModalClose() {
    setIsOpen(false);
    cleanUp();
    setName('')
    setVersion('')
    setPrimaryMetric('');
    setDescription('');
    setHypothesis('');
    setExpectedResult(null);
    setStartDate(null);
    setEndDate(null);
    setSelectedExperimentAssignee(undefined)
  }

  const handleCreateExperiment = () => {
    setShowAlert(false);
    if (name === "") {
      setShowAlert(true);
      setAlertInfo({
        title: "Error",
        color: "orange",
        message: "Please enter the Experiment name",
      });
      return;
    }

    if (selectedExperiment) {

      updateExperimentDetails.mutate({
        id: selectedExperiment?.id ?? '',
        data: {
          name: name,
          version: version,
          status_id: selectedExperimentStatus.id,
          description: selectedExperiment?.description ?? '',
          primary_metric: primary_metric,
          hypothesis: hypothesis,
          expected_result: expected_result == undefined ? null : expected_result, // Handle empty expected_result
          assignees: selectedExperimentAssignee ? selectedExperimentAssignee : [],
          experiment_type: selectedExperimentType,
          end_date: endDate == null ? null : dayjs(endDate).format('YYYY-MM-DD'),
          start_date: startDate == null ? null : dayjs(startDate).format('YYYY-MM-DD')
        }
      }, {
        onSuccess: () => {
          onModalClose();
          showNotification({
            color: "teal",
            message: "Experiment updated successfully",
            icon: <IconCheck />,
          });
          experimentQR.refetch(); // Refetch the experiments after updating
        },
        onError: (error) => {
          console.error("Update Experiment Error:", error);
        }
      })

    } else {
      createExperiment.mutate(
        {
          name: name,
          description: description,
          primary_metric: primary_metric,
          status_id: selectedExperimentStatus.id,
          hypothesis: hypothesis,
          expected_result: expected_result,
          assignees: selectedExperimentAssignee ? selectedExperimentAssignee : [],
          experiment_type: selectedExperimentType,
          end_date: endDate == null ? null : dayjs(endDate).format('YYYY-MM-DD'),
          start_date: startDate == null ? null : dayjs(startDate).format('YYYY-MM-DD')

        },
        {
          onSuccess: () => {
            onModalClose();
            showNotification({
              color: "teal",
              message: "Experiment created successfully",
              icon: <IconCheck />,
            });
            experimentQR.refetch(); // Refetch the experiments list to update the UI
          },
        }
      );

    }

  };


  return (
    <Modal centered opened={isOpen} onClose={onModalClose} size="xl" title={selectedExperiment ? "Edit Experiment" : "Create Experiment"}>
      <Collapse
        in={showAlert}
        style={{
          marginBottom: showAlert ? 2 : 0,
          marginTop: showAlert ? 1 : 0,
        }}
      >
        <Alert
          icon={<IconAlertTriangle />}
          color="orange"
          title={alertInfo.title}
        >
          {alertInfo.message}
        </Alert>
      </Collapse>
      <>
        <TextInput label="Name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
            // setValue(event.target.value)
          }}
          placeholder="Name" data-autofocus />
        <Textarea label="Description"
          // resize="both"
          style={{ resize: "both" }}
          value={description}
          onChange={(event) => {
            setDescription(event.target.value)
          }}
          placeholder="Experiment description" data-autofocus />
        <Textarea label="Hypothesis"
          // resize="both"
          style={{ resize: "both" }}
          value={hypothesis}
          onChange={(event) => {
            setHypothesis(event.target.value)
          }}
          placeholder="Experiment description" data-autofocus />
        <SimpleGrid cols={3}>

          <TextInput disabled={selectedExperiment ? false : true} label="Version"
            type="text"
            value={version}
            onChange={(event) => {
              setVersion(event.target.value)
            }}
            placeholder="Version" data-autofocus />
          <DateInput
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
            placeholder="Pick a date"
          />
          <DateInput
            label="Start Date"
            value={endDate}
            onChange={setEndDate}
            placeholder="Pick a date"
          />
          <Select
            label="Status"
            placeholder="Pick value"
            data={status.map((status) => ({
              value: status.id,
              label: status.name,
            })) ?? []}
            value={selectedExperimentStatus.id}
            onChange={(event) => {
              let getStatus = status.find((status) => {
                return status.id === event;
              })
              if (getStatus) {
                setSelectedExperimentStatus(getStatus)
              }
            }}
          />
          <Select
            label="Type"
            placeholder="Pick value"
            data={['auto', 'manual']}
            value={selectedExperimentType}
            onChange={(event) => {
              setSelectedExperimentType(event)
            }}
          />
          <Select
            label="Primary Metric"
            placeholder="Pick value"
            data={['Sales Qualified', 'Won']}
            value={primary_metric}
            onChange={(event) => {
              if (event === null) {
                setPrimaryMetric('Sales Qualified')
              } else {
                setPrimaryMetric(event)
              }

            }}
          />


          <MultiSelect
            label="Assignees"
            placeholder="Assign to"
            // data={['React', 'Angular', 'Vue', 'Svelte']}
            value={
              selectedExperimentAssignee?.map((assignee) => {
                return assignee
              })
            }

            onChange={setSelectedExperimentAssignee}

            data={assignees.map((assignee) => ({
              value: assignee.id,
              label: assignee.name,
            })) ?? []}
          />
        </SimpleGrid>

        <Button disabled={false} fullWidth loading={false} onClick={() => {
          handleCreateExperiment();
        }} mt="md">
          {selectedExperiment ? "Update" : "Create"} Experiment
        </Button>

      </>
    </Modal>
  );
}
