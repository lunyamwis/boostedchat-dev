import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import React from "react";
import { useSendDirectMessage } from "./Hooks/thread.hooks";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAssignedTo: React.Dispatch<React.SetStateAction<"Human" | "Robot">>;
  setChoiceSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

export function SendAndAssignModal({
  isOpen,
  setIsOpen,
  setAssignedTo,
  setChoiceSelected,
}: Props) {
  const sendDirectMessage = useSendDirectMessage();

  return (
    <Modal
      opened={isOpen}
      size="lg"
      title="Alert"
      onClose={() => setIsOpen(false)}
    >
      <Stack spacing={48}>
        <Text>Would you like to take over this conversation?</Text>
        <Group position="right">
          <Button
            variant="outline"
            loading={sendDirectMessage.isLoading}
            onClick={() => {
              setChoiceSelected(true);
              setAssignedTo("Robot");
              setIsOpen(false);
            }}
          >
            No, let the bot continue
          </Button>
          <Button
            loading={sendDirectMessage.isLoading}
            onClick={() => {
              setChoiceSelected(true);
              setAssignedTo("Human");
              setIsOpen(false);
            }}
          >
            Yes, I want to take over
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
