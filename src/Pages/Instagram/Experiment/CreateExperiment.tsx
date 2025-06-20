import React from "react";
import {
  Alert,
  Button,
  Collapse,
  Group,
  Modal,
  Select,
  SimpleGrid,
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
import { useExperimentsWrapperApi, useUpdateExperimentDetails } from "./Hooks/experiments.hook";
import { Experiment, ExperimentStatus } from "@/Interfaces/Instagram/Experiments/experiment.interface";
import { UseQueryResult } from "@tanstack/react-query";
import { PaginatedQuery } from "@/Interfaces/general.interface";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status: ExperimentStatus[];
  experimentQR: UseQueryResult<PaginatedQuery<Experiment>, Error>
  selectedExperiment?: Experiment;
};

export function CreateExperiment({ isOpen, setIsOpen, status, experimentQR, selectedExperiment }: Props) {
  const { alertInfo, setAlertInfo, showAlert, setShowAlert } = useAlert();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [primary_metric, setPrimaryMetric] = React.useState("");
  const [version, setVersion] = React.useState("");
  const { createExperiment } = useExperimentsWrapperApi();
  const [selectedExperimentStatus, setSelectedExperimentStatus,] = React.useState<ExperimentStatus>({} as ExperimentStatus);
  const updateExperimentDetails = useUpdateExperimentDetails();

  // set default status
  React.useEffect(() => {
    if (selectedExperiment) {
      setName(selectedExperiment.name)
      setVersion(selectedExperiment.version)
      setSelectedExperimentStatus(selectedExperiment.status);
      setPrimaryMetric(selectedExperiment.primary_metric ?? '');
      setDescription(selectedExperiment.description ?? '');
    } else {
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

    if (selectedExperiment) {

      updateExperimentDetails.mutate({
        id: selectedExperiment?.id ?? '',
        data: {
          name: name,
          version: version,
          status_id: selectedExperimentStatus.id,
          description: selectedExperiment?.description ?? '',
          primary_metric: primary_metric,
        }
      }, {
        onSuccess: (data) => {
          console.log("Update Experiment Success:", data);
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
        }
      );

    }

  };


  function onModalClose() {
    setName("");
    setDescription("");
    setIsOpen(false);

  }
  // return (
  //   <Modal
  //     opened={isOpen}
  //     onClose={() => {
  //       onModalClose();
  //     }}
  //     title="Create New Experiment"
  //   >
  // <Collapse
  //   in={showAlert}
  //   style={{
  //     marginBottom: showAlert ? 2 : 0,
  //     marginTop: showAlert ? 1 : 0,
  //   }}
  // >
  //   <Alert
  //     icon={<IconAlertTriangle />}
  //     color="orange"
  //     title={alertInfo.title}
  //   >
  //     {alertInfo.message}
  //   </Alert>
  // </Collapse>
  //     <Stack p={20}>
  //       <TextInput
  //         label="Name"
  //         withAsterisk={true}
  //         required
  //         value={name}
  //         onChange={(e) => setName(e.target.value)}
  //       />
  //       <Textarea
  //         label="Description"
  //         placeholder="Your hypothesis or description of the experiment"
  //         withAsterisk={true}
  //         value={description}
  //         resize="both"
  //         onChange={(e) => setDescription(e.target.value)}
  //       />
  //       <TextInput
  //         label="Prinamy Metric"
  //         withAsterisk={true}
  //         required
  //         value={primary_metric}
  //         onChange={(e) => setPrimaryMetric(e.target.value)}
  //       />

  //       <Select
  //         label="Status"
  //         placeholder="Pick value"
  //         data={status.map((status) => ({
  //           value: status.id,
  //           label: status.name,
  //         })) ?? []}
  //         value={selectedExperimentStatus.id}
  //         onChange={(event) => {
  //           console.log(event);
  //           // setSelectedExperimentStatus(event.target.value);
  //           let getStatus = status.find((status) => {
  //             return status.id === event;
  //           })
  //           if (getStatus) {
  //             setSelectedExperimentStatus(getStatus)
  //           }
  //         }}
  //       />

  //       <Group justify="center">
  //         <Button
  //           // loading={createAccount.isPending}
  //           onClick={handleCreateAccount}
  //         >
  //           Create Experiment
  //         </Button>
  //       </Group>
  //     </Stack>
  //   </Modal>
  // );

  return (
    <Modal centered opened={isOpen} onClose={onModalClose} size="xl" title="Edit Experiment">
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
            console.log(event.target.value);
            setName(event.target.value)
            // setValue(event.target.value)
          }}
          placeholder="Name" data-autofocus />
        <Textarea label="Description"
          resize="both"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value)
          }}
          placeholder="Experiment description" data-autofocus />
        <SimpleGrid cols={3}>
          <TextInput disabled={selectedExperiment ? false : true} label="Version"
            type="text"
            value={version}
            onChange={(event) => {
              console.log(event.target.value);
              setVersion(event.target.value)
            }}
            placeholder="Version" data-autofocus />
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
              let getStatus = status.find((status) => {
                return status.id === event;
              })
              if (getStatus) {
                setSelectedExperimentStatus(getStatus)
              }
            }}
          />
          <TextInput label="Primary Metric"
            type="text"
            value={primary_metric}
            onChange={(event) => {
              console.log(event.target.value);
              setPrimaryMetric(event.target.value)
            }}
            placeholder="Primary Metric" data-autofocus />
        </SimpleGrid>

        <Button disabled={false} fullWidth loading={false} onClick={() => {
          handleCreateAccount();
        }} mt="md">
          {selectedExperiment ? "Update" : "Create"} Experiment
        </Button>

      </>
    </Modal>
  );
}
