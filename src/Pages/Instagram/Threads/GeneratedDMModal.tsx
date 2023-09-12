import { Button, Checkbox, Modal, Stack, Text, Textarea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { AddComment } from "../../../Interfaces/Instagram/photo.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useSendDirectMessage } from "./Hooks/thread.hooks";
import { queryKeys } from "../../../Constants/ApiConstants";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  generatedResponse: string;
  threadId: string;
};

export function GeneratedMessageModal({
  isOpen,
  setIsOpen,
  generatedResponse,
  threadId,
}: Props) {
  const queryClient = useQueryClient();
  const [approveResponse, setApproveComment] = React.useState(true);
  const [humanMessage, setHumanComment] = React.useState("");

  const sendDirectMessage = useSendDirectMessage();

  const handleSendComment = () => {
    if (!approveResponse && humanMessage === "") {
      showNotification({
        message: "Please enter your comment",
        color: "orange",
      });
      return;
    }

    let data: AddComment["data"];

    if (approveResponse === true) {
      data = {
        approve: true,
        assign_robot: true,
        generated_response: generatedResponse,
      };
    } else {
      data = {
        approve: false,
        assign_robot: false,
        human_response: humanMessage,
      };
    }
    sendDirectMessage.mutate(
      {
        id: threadId,
        data,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            queryKeys.instagram.threads.getMessages,
            threadId,
          ]);
          setHumanComment("");
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <Modal opened={isOpen} title="Comment" onClose={() => setIsOpen(false)}>
      <Stack>
        <Text>{generatedResponse}</Text>
        <Checkbox
          checked={approveResponse}
          label="Approve Message"
          onChange={(e) => setApproveComment(e.target.checked)}
        />
        {!approveResponse && (
          <Textarea
            placeholder="Your message..."
            minRows={3}
            value={humanMessage}
            onChange={(e) => setHumanComment(e.target.value)}
          />
        )}
        <Button
          loading={sendDirectMessage.isLoading}
          onClick={handleSendComment}
        >
          Send
        </Button>
      </Stack>
    </Modal>
  );
}
