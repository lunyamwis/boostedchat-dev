import { useQueryClient } from "@tanstack/react-query";
import { useSendDirectMessage } from "./thread.hooks";
import React from "react";
import { queryKeys } from "@/Constants/ApiConstants";

export const useMessageBox = (
  threadId: string | undefined,
  assignedTo: "Robot" | "Human",
) => {
  const [message, setMessage] = React.useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = React.useState(false);

  const [mAssignedTo, setMAssignedTo] = React.useState<"Robot" | "Human">(
    assignedTo,
  );

  const [choiceSelected, setChoiceSelected] = React.useState(false);

  const sendDirectMessage = useSendDirectMessage();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (threadId == null) return;
    if (choiceSelected) {
      setChoiceSelected(false);

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
            queryClient.invalidateQueries({
              queryKey: [queryKeys.instagram.threads.getMessages, threadId],
            });
            setChoiceSelected(false);
            setMessage("");
          },
        },
      );
    }
  }, [choiceSelected, threadId]);

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
  return {
    sendDirectMessage,
    isAssignModalOpen,
    setIsAssignModalOpen,
    setChoiceSelected,
    setMAssignedTo,
    handleSendMessage,
    message,
    setMessage,
  };
};
