import { useQualifyingAlgorithmApi } from "@/Apis/Scrapper/QualifyingAlgorithm.api";
import { queryKeys } from "@/Constants/ApiConstants";
import { UpdateQualifyingAlgorithmParams } from "@/Interfaces/LeadsGeneration/qualifying-algorithm.interface";
import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconAlertTriangle, IconCheck, IconX } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  qualifyingAlgorithmId: string | null;
  setQualifyingAlgorithmId: React.Dispatch<React.SetStateAction<string | null>>;
};

export function EditQualifyingAlgorithm({
  isOpen,
  setIsOpen,
  qualifyingAlgorithmId,
  setQualifyingAlgorithmId,
}: Props) {
  const queryClient = useQueryClient();
  const { update, getOne } = useQualifyingAlgorithmApi();
  const [name, setName] = React.useState("");
  const [positiveKeywords, setPositiveKeywords] = React.useState("");
  const [positiveKeywordsComparator, setPositiveKeywordsComparator] =
    React.useState("");
  const [negativeKeywords, setNegativeKeywords] = React.useState("");
  const [negativeKeywordsComparator, setNegativeKeywordsComparator] =
    React.useState("");

  const qualifyingAlgoQR = useQuery({
    queryKey: [
      queryKeys.leadsGeneration.qualifyingAlgos.algoById,
      qualifyingAlgorithmId,
    ],
    queryFn: () => getOne(qualifyingAlgorithmId as string),
    enabled: isOpen && qualifyingAlgorithmId != null,
  });

  const updateQualifyingAlgorithm = useMutation({
    mutationFn: (params: UpdateQualifyingAlgorithmParams) => update(params),
  });

  const handleUpdateQualifyingAlgorithm = () => {
    if (qualifyingAlgorithmId == null) {
      return;
    }

    if (name === "") {
      showNotification({
        title: "Error",
        message: "Please enter the name of the qualifying algorithm",
        color: "orange",
        icon: <IconAlertTriangle size={18} />,
      });
      return;
    }

    if (positiveKeywords === "") {
      showNotification({
        title: "Error",
        message: "Please enter the positive keywords",
        color: "orange",
        icon: <IconAlertTriangle size={18} />,
      });
      return;
    }

    if (positiveKeywordsComparator === "") {
      showNotification({
        title: "Error",
        message: "Please enter the number of positive keywords",
        color: "orange",
        icon: <IconAlertTriangle size={18} />,
      });
      return;
    }

    if (negativeKeywords === "") {
      showNotification({
        title: "Error",
        message: "Please enter the negative keywords",
        color: "orange",
        icon: <IconAlertTriangle size={18} />,
      });
      return;
    }

    if (negativeKeywordsComparator === "") {
      showNotification({
        title: "Error",
        message: "Please enter the number of negative keywords",
        color: "orange",
        icon: <IconAlertTriangle size={18} />,
      });
      return;
    }

    updateQualifyingAlgorithm.mutate(
      {
        id: qualifyingAlgorithmId,
        data: {
          name,
          positive_keywords: positiveKeywords.split(", "),
          number_positive_keywords: positiveKeywordsComparator,
          negative_keywords: negativeKeywords.split(", "),
          number_negative_keywords: negativeKeywordsComparator,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.leadsGeneration.qualifyingAlgos.allAlgos],
          });
          showNotification({
            message: "Qualifying algorithm updated successfully",
            color: "teal",
            icon: <IconCheck />,
          });
          handleClose();
        },
        onError: (err) => {
          showNotification({
            title: "Error",
            message: err.message,
            color: "red",
            icon: <IconX />,
          });
        },
      },
    );
  };

  const handleClose = () => {
    setName("");
    setPositiveKeywords("");
    setPositiveKeywordsComparator("");
    setNegativeKeywords("");
    setNegativeKeywordsComparator("");
    setIsOpen(false);
    setQualifyingAlgorithmId(null);
  };

  React.useEffect(() => {
    if (qualifyingAlgoQR.data == null) {
      return;
    }
    setName(qualifyingAlgoQR.data.name);
    setPositiveKeywords(qualifyingAlgoQR.data.positive_keywords.join(", "));
    setPositiveKeywordsComparator(
      qualifyingAlgoQR.data.number_positive_keywords,
    );
    setNegativeKeywords(qualifyingAlgoQR.data.negative_keywords.join(", "));
    setNegativeKeywordsComparator(
      qualifyingAlgoQR.data.number_negative_keywords,
    );
  }, [qualifyingAlgoQR.data]);

  return (
    <Modal
      size="lg"
      opened={isOpen}
      closeOnEscape={!updateQualifyingAlgorithm.isPending}
      closeOnClickOutside={!updateQualifyingAlgorithm.isPending}
      onClose={handleClose}
      title="Update qualifying algorithm"
    >
      <Stack>
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Algorithm name"
          withAsterisk
        />
        <TextInput
          value={positiveKeywords}
          onChange={(e) => setPositiveKeywords(e.target.value)}
          label="Positive Keywords"
          description="Separate keywords with comma"
          withAsterisk
        />
        <TextInput
          value={positiveKeywordsComparator}
          onChange={(e) => setPositiveKeywordsComparator(e.target.value)}
          label="Number of positive keywords"
          withAsterisk
        />
        <TextInput
          value={negativeKeywords}
          onChange={(e) => setNegativeKeywords(e.target.value)}
          label="Negative keywords"
          withAsterisk
        />
        <TextInput
          value={negativeKeywordsComparator}
          onChange={(e) => setNegativeKeywordsComparator(e.target.value)}
          label="Number of negative keywords"
          withAsterisk
        />
        <Group justify="center">
          <Button
            onClick={handleUpdateQualifyingAlgorithm}
            loading={updateQualifyingAlgorithm.isPending}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
