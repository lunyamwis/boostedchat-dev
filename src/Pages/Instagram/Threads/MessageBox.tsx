import { ActionIcon, Group, Loader, Textarea } from "@mantine/core";
import React from "react";
import { IconSend } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useSendDirectMessage } from "./Hooks/thread.hooks";
import { queryKeys } from "../../../Constants/ApiConstants";
import { SendAndAssignModal } from "./SendAndAssignModal";

type Props = {
  threadId: string;
  assignedTo: "Robot" | "Human";
};

export function MessageBox({ threadId, assignedTo }: Props) {
  const [message, setMessage] = React.useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = React.useState(false);

  const [mAssignedTo, setMAssignedTo] = React.useState<"Robot" | "Human">(
    assignedTo
  );

  const [choiceSelected, setChoiceSelected] = React.useState(false);

  const sendDirectMessage = useSendDirectMessage();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (choiceSelected) {
      console.log("A choice has been selected", choiceSelected);
      setChoiceSelected(false);
      console.log(mAssignedTo);

      sendDirectMessage.mutate(
        {
          id: threadId,
          data: {
            assigned_to: mAssignedTo,
            message,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([
              queryKeys.instagram.threads.getMessages,
              threadId,
            ]);
            setChoiceSelected(false);
            setMessage("");
          },
        }
      );
    }
  }, [choiceSelected]);

  const handleSendMessage = () => {
    if (message === "") {
      return;
    }
    if (assignedTo === "Human") {
      // Conversation is assigned to human, so continue
      setChoiceSelected(true);
    } else {
      // conversation is assigned to robot, ask if human wants to take over.
      setIsAssignModalOpen(true);
    }
  };

  return (
    <>
      <Group
        pl={8}
        sx={{ borderTop: "1px solid #f0f0f0" }}
        spacing={0}
        mih={104}
      >
        <Textarea
          variant="unstyled"
          placeholder="Your message..."
          autoFocus
          minRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ flex: 1 }}
        />
        <Group px={16} position="center">
          {sendDirectMessage.isLoading ? (
            <ActionIcon size="xl" radius="xl" variant="light" color="brand">
              <Loader size="sm" variant="dots" />
            </ActionIcon>
          ) : (
            <ActionIcon
              size="xl"
              radius="xl"
              variant="light"
              color="brand"
              onClick={handleSendMessage}
            >
              <IconSend strokeWidth={1.4} />
            </ActionIcon>
          )}
        </Group>
      </Group>
      <SendAndAssignModal
        isOpen={isAssignModalOpen}
        setIsOpen={setIsAssignModalOpen}
        setChoiceSelected={setChoiceSelected}
        setAssignedTo={setMAssignedTo}
      />
    </>
  );
}
