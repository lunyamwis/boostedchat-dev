import { ActionIcon, Group, Loader, Textarea } from "@mantine/core";
import React from "react";
import { IconSend } from "@tabler/icons-react";
import { SendAndAssignModal } from "./SendAndAssignModal";
import { useMessageBox } from "./Hooks/message.hooks";

type Props = {
  threadId: string | undefined;
  assignedTo: "Robot" | "Human";
};

export function MessageBox({ threadId, assignedTo }: Props) {
  const {
    message,
    setMessage,
    sendDirectMessage,
    isAssignModalOpen,
    setIsAssignModalOpen,
    setChoiceSelected,
    setMAssignedTo,
    handleSendMessage,
  } = useMessageBox(threadId, assignedTo);

  return (
    <>
      <Group
        pl={8}
        style={{ borderTop: "1px solid #f0f0f0" }}
        gap={0}
        mih={104}
      >
        <Textarea
          variant="unstyled"
          placeholder="Your message..."
          autoFocus
          minRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: 1 }}
        />
        {threadId != null && (
          <Group px={16} justify="center">
            {sendDirectMessage.isPending ? (
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
        )}
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
