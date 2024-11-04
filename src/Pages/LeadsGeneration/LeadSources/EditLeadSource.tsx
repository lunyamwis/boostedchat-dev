import { useLeadSourceApi } from "@/Apis/Scrapper/LeadSource.api";
import { queryKeys } from "@/Constants/ApiConstants";
import {
  CreateLeadSource as CreateLeadSourceParams,
  LeadSourceCriterion,
  UpdateLeadSourceParams,
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  leadSourceId: string | null;
  setLeadSourceId: React.Dispatch<React.SetStateAction<string | null>>;
};

export function EditLeadSource({
  isOpen,
  setIsOpen,
  leadSourceId,
  setLeadSourceId,
}: Props) {
  const queryClient = useQueryClient();
  const { update, getOne } = useLeadSourceApi();
  const [name, setName] = React.useState("");
  const [criterion, setCriterion] = React.useState<string | null>(null);
  const [criterionValues, setCriterionValues] = React.useState("");
  const [criterionValueLabel, setCriterionValueLabel] =
    React.useState<string>("");
  const [useURLInBio, setUseURLInBio] = React.useState(false);
  const [isInfiniteLoop, setIsInfiniteLoop] = React.useState(false);

  const leadSourceQR = useQuery({
    queryKey: [
      queryKeys.leadsGeneration.leadSource.allLeadSources,
      leadSourceId,
    ],
    queryFn: () => getOne(leadSourceId as string),
    enabled: isOpen && leadSourceId != null,
  });

  const updateLeadSource = useMutation({
    mutationFn: (params: UpdateLeadSourceParams) => update(params),
  });

  const handleUpdateLeadSource = () => {
    if (leadSourceId == null) {
      return;
    }

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
      | "external_urls"
      | "estimated_usernames"
    > = {};
    if (criterion === "0" || criterion === "1") {
      optionalData = { account_usernames: criterionValues?.split(", ") };
    }
    if (criterion === "2") {
      optionalData = { hashtags: criterionValues?.split(", ") };
    }
    if (criterion === "3") {
      optionalData = { photo_links: criterionValues?.split(", ") };
    }
    if (criterion === "3") {
      optionalData = { photo_links: criterionValues?.split(", ") };
    }
    if (criterion === "4") {
      optionalData = { estimated_usernames: criterionValues?.split(", ") };
    }
    if (criterion === "5") {
      optionalData = { google_maps_search_keywords: criterionValues };
    }
    if (criterion === "6") {
      optionalData = { external_urls: criterionValues?.split(", ") };
    }

    updateLeadSource.mutate(
      {
        id: leadSourceId,
        data: {
          name,
          criterion: parseInt(criterion) as LeadSourceCriterion,
          enrich_with_url_in_bio: useURLInBio,
          is_infinite_loop: isInfiniteLoop,
          ...optionalData,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.leadsGeneration.leadSource.allLeadSources],
          });
          showNotification({
            message: "The lead source has been updated successfully",
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
    setLeadSourceId(null);
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

  React.useEffect(() => {
    if (leadSourceQR.data == null) {
      return;
    }
    const mLeadSourceCriterion = leadSourceQR.data.criterion;

    setName(leadSourceQR.data.name);
    setCriterion(leadSourceQR.data.criterion.toString());
    setUseURLInBio(leadSourceQR.data.enrich_with_url_in_bio);
    setIsInfiniteLoop(leadSourceQR.data.is_infinite_loop);
    if (mLeadSourceCriterion === 0 || mLeadSourceCriterion === 1) {
      setCriterionValues(leadSourceQR.data.account_usernames?.join(", ") ?? "");
    }
    if (mLeadSourceCriterion === 2) {
      setCriterionValues(leadSourceQR.data.hashtags?.join(", ") ?? "");
    }
    if (mLeadSourceCriterion === 3) {
      setCriterionValues(leadSourceQR.data.photo_links?.join(", ") ?? "");
    }
    if (mLeadSourceCriterion === 5) {
      setCriterionValues(leadSourceQR.data.hashtags?.join(", ") ?? "");
    }
  }, [leadSourceQR.data]);

  return (
    <Modal
      size="lg"
      opened={isOpen}
      closeOnEscape={!updateLeadSource.isPending}
      closeOnClickOutside={!updateLeadSource.isPending}
      onClose={handleClose}
      title="Update lead source"
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
            onClick={handleUpdateLeadSource}
            loading={updateLeadSource.isPending}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
