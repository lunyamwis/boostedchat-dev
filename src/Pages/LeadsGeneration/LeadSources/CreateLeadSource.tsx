import { useLeadSourceApi } from "@/Apis/Scrapper/LeadSource.api";
import { queryKeys } from "@/Constants/ApiConstants";
import {
  CreateLeadSource as CreateLeadSourceParams,
  LeadSourceCriterion,
} from "@/Interfaces/LeadsGeneration/lead-source.interface";
import {
  Button,
  Checkbox,
  Group,
  Modal,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconAlertTriangle, IconCheck, IconX } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CreateLeadSource({ isOpen, setIsOpen }: Props) {
  const queryClient = useQueryClient();
  const { create } = useLeadSourceApi();
  const [name, setName] = React.useState("");
  const [criterion, setCriterion] = React.useState<string | null>(null);
  const [criterionValues, setCriterionValues] = React.useState("");
  const [criterionValueLabel, setCriterionValueLabel] =
    React.useState<string>("");
  const [useURLInBio, setUseURLInBio] = React.useState(false);
  const [isInfiniteLoop, setIsInfiniteLoop] = React.useState(false);

  const createLeadSource = useMutation({
    mutationFn: (params: CreateLeadSourceParams) => create(params),
  });

  const handleCreateLeadSource = () => {
    if (name === "") {
      showNotification({
        title: "Error",
        message: "Please enter the name of the lead source",
        color: "orange",
        icon: <IconAlertTriangle size={18} />,
      });
      return;
    }
    if (criterion == null) {
      showNotification({
        title: "Error",
        message: "Please select a criterion",
        color: "orange",
        icon: <IconAlertTriangle size={18} />,
      });
      return;
    }
    let optionalData: Pick<
      CreateLeadSourceParams,
      | "account_usernames"
      | "photo_links"
      | "hashtags"
      | "google_maps_search_keywords"
    > = {};
    if (criterion === "0" || criterion === "1") {
      optionalData = { account_usernames: criterionValues.split(", ") };
    }
    if (criterion === "2") {
      optionalData = { hashtags: criterionValues.split(", ") };
    }
    if (criterion === "3") {
      optionalData = { photo_links: criterionValues.split(", ") };
    }
    if (criterion === "5") {
      optionalData = { google_maps_search_keywords: criterionValues };
    }

    createLeadSource.mutate(
      {
        name,
        criterion: parseInt(criterion) as LeadSourceCriterion,
        enrich_with_url_in_bio: useURLInBio,
        is_infinite_loop: isInfiniteLoop,
        ...optionalData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.leadsGeneration.leadSource.allLeadSources],
          });
          showNotification({
            message: "The lead source has been created successfully",
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
    setCriterion(null);
    setCriterionValues("");
    setUseURLInBio(false);
    setIsInfiniteLoop(false);
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (criterion == null) return;
    if (criterion === "0") {
      setCriterionValueLabel("Account usernames");
      return;
    }
    if (criterion === "1") {
      setCriterionValueLabel("Account username(s)");
      return;
    }
    if (criterion === "2") {
      setCriterionValueLabel("Enter hashtag(s)");
      return;
    }
    if (criterion === "3") {
      setCriterionValueLabel("Enter photo URL(s)");
      return;
    }
    if (criterion === "4") {
      setCriterionValueLabel("Account usernames");
      return;
    }
    if (criterion === "5") {
      setCriterionValueLabel("Google Maps keywords");
      return;
    }
    if (criterion === "6") {
      setCriterionValueLabel("External URL(s)");
      return;
    }
  }, [criterion]);

  return (
    <Modal
      size="lg"
      opened={isOpen}
      closeOnEscape={!createLeadSource.isPending}
      closeOnClickOutside={!createLeadSource.isPending}
      onClose={handleClose}
      title="Create new lead source"
    >
      <Stack>
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Source name"
          withAsterisk
        />
        <Select
          value={criterion}
          onChange={(val) => {
            setCriterion(val);
          }}
          data={[
            { value: "0", label: "Similar accounts" },
            { value: "1", label: "Followers of an account" },
            { value: "2", label: "Posts with a hashtag" },
            { value: "3", label: "Interacted with a photo" },
            { value: "4", label: "Enriched from Instagram" },
            { value: "5", label: "Google Maps location" },
            { value: "6", label: "External URL" },
          ]}
          label="Criterion"
          withAsterisk
        />
        {criterion != null && (
          <TextInput
            value={criterionValues}
            onChange={(e) => setCriterionValues(e.target.value)}
            label={criterionValueLabel}
            description="Separate with comma if more than one"
            withAsterisk
          />
        )}
        <Checkbox
          label="Enrich with URL in bio"
          checked={useURLInBio}
          onChange={(e) => setUseURLInBio(e.target.checked)}
        />
        <Checkbox
          label="Use Infinite Loop"
          checked={isInfiniteLoop}
          onChange={(e) => setIsInfiniteLoop(e.target.checked)}
        />
        <Group justify="center">
          <Button
            onClick={handleCreateLeadSource}
            loading={createLeadSource.isPending}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
