import { usePromptApi } from "@/Apis/Prompts/Prompt.api";
import { queryKeys } from "@/Constants/ApiConstants";
import {
  Box,
  Button,
  CloseButton,
  Group,
  ScrollArea,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useSearchParams } from "react-router-dom";
import classes from "./PromptSummaryItem.module.css";
import { showNotification } from "@mantine/notifications";
import { UpdatePromptParams } from "@/Interfaces/Scripts/prompt.interface";
import { IconCheck } from "@tabler/icons-react";

type Props = {};

export function PromptEditor({}: Props) {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [promptId, setPromptId] = React.useState<null | string>(null);
  const [promptName, setPromptName] = React.useState("");
  const [promptBody, setPromptBody] = React.useState("");

  const { getOne, update } = usePromptApi();

  const promptQR = useQuery({
    queryKey: [queryKeys.scripts.prompts.promptById, promptId],
    queryFn: () => getOne(promptId as string),
    enabled: promptId != null,
  });

  const updatePrompt = useMutation({
    mutationFn: (params: UpdatePromptParams) => update(params),
  });

  const handleUpdatePrompt = () => {
    if (promptQR.data == null || promptId == null) return;
    if (
      promptName === promptQR.data.name &&
      promptBody === promptQR.data.text_data
    ) {
      showNotification({
        color: "red",
        message: "No detail has been updated",
      });
      return;
    }
    updatePrompt.mutate(
      {
        id: promptId,
        data: {
          text_data: promptBody,
          name: promptName,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.scripts.prompts.allPrompts],
          });
          showNotification({
            color: "teal",
            icon: <IconCheck />,
            message: "The prompt has been updated successfully",
          });
        },
      }
    );
  };

  React.useEffect(() => {
    if (searchParams.get("prompt")) {
      setPromptId(searchParams.get("prompt"));
    }
  }, [searchParams.get("prompt")]);

  React.useEffect(() => {
    if (promptQR.data == null) return;
    setPromptName(promptQR.data.name);
    setPromptBody(promptQR.data.text_data);
  }, [promptQR.data]);

  return (
    <Stack className={classes.promptList}>
      <Group justify="space-between">
        <Text>Prompt Editor</Text>
        <CloseButton onClick={() => setSearchParams(undefined)} />
      </Group>
      <Box
        component={ScrollArea}
        offsetScrollbars
        py={24}
        style={{ flexGrow: 1 }}
      >
        <Stack>
          <TextInput
            label="Name"
            value={promptName}
            onChange={(e) => setPromptName(e.target.value)}
          />
          <Textarea
            label="Prompt"
            autosize
            value={promptBody}
            onChange={(e) => setPromptBody(e.target.value)}
          />
        </Stack>
      </Box>
      <Group>
        <Button loading={updatePrompt.isPending} onClick={handleUpdatePrompt}>
          Save
        </Button>
      </Group>
    </Stack>
  );
}
