import React from "react";
import {
  Alert,
  Button,
  Collapse,
  Group,
  Modal,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconAlertTriangle,
  IconCheck,
} from "@tabler/icons-react";
import { useAlert } from "../../../Hooks/useAlert";
import { useExperimentsWrapperApi } from "./Hooks/experiments.hook";
import { Experiment, ExperimentStatus } from "@/Interfaces/Instagram/Experiments/experiment.interface";
import { UseQueryResult } from "@tanstack/react-query";
import { PaginatedQuery } from "@/Interfaces/general.interface";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status: ExperimentStatus[];
  experimentQR: UseQueryResult<PaginatedQuery<Experiment>, Error>
};

export function CreateExperiment({ isOpen, setIsOpen, status, experimentQR }: Props) {
  const { alertInfo, setAlertInfo, showAlert, setShowAlert } = useAlert();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [primary_metric, setPrimaryMetric] = React.useState("");
  const { createExperiment } = useExperimentsWrapperApi();
  const [selectedExperimentStatus, setSelectedExperimentStatus,] = React.useState<ExperimentStatus>({} as ExperimentStatus);


  // set default status
  React.useEffect(() => {
    if (status.length > 0) {
      let getDraftStatus = status.find((status) => {
        return status.name === 'draft';
      })
      if (getDraftStatus) {
        setSelectedExperimentStatus(getDraftStatus);
      } else {
        // Fallback to the first status if 'draft' is not found
        setSelectedExperimentStatus(status[0]);
      }
    }
  }, []
  );
  const handleCreateAccount = () => {
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

    createExperiment.mutate(
      {
        name: name,
        description: description,
        primary_metric: primary_metric,
        status_id: selectedExperimentStatus.id,
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
          // Optionally, you can refetch experiments or perform any other action
        },
        // onError: (err) => {
        //   const errorMessage = err.message;
        //   showNotification({
        //     color: "red",
        //     message: errorMessage,
        //     icon: <IconAlertTriangle />,
        //   });
        // },
      }
    );
  };


  function onModalClose() {
    setName("");
    setDescription("");
    setIsOpen(false);

  }
  return (
    <Modal
      opened={isOpen}
      onClose={() => {
        onModalClose();
      }}
      title="Create New Account"
    >
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
      <Stack p={20}>
        <TextInput
          label="Name"
          withAsterisk={true}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          label="Description"
          placeholder="Your hypothesis or description of the experiment"
          withAsterisk={true}
          value={description}
          resize="both"
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextInput
          label="Prinamy Metric"
          withAsterisk={true}
          required
          value={primary_metric}
          onChange={(e) => setPrimaryMetric(e.target.value)}
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
            console.log(event);
            // setSelectedExperimentStatus(event.target.value);
            let getStatus = status.find((status) => {
              return status.id === event;
            })
            if (getStatus) {
              setSelectedExperimentStatus(getStatus)
            }
          }}
        />

        <Group justify="center">
          <Button
            // loading={createAccount.isPending}
            onClick={handleCreateAccount}
          >
            Create Experiment
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
