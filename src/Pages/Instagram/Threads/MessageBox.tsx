import { ActionIcon, Group, Loader, Textarea } from "@mantine/core";
import React from "react";
import { Send } from "tabler-icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useSendDirectMessage } from "./Hooks/thread.hooks";
import { queryKeys } from "../../../Constants/ApiConstants";

type Props = {
  threadId: string;
};
export function MessageBox({ threadId }: Props) {
  const [message, setMessage] = React.useState("");

  const sendDirectMessage = useSendDirectMessage();
  const queryClient = useQueryClient();

  const handleSendMessage = () => {
    if (message === "") {
      return;
    }
    sendDirectMessage.mutate(
      {
        id: threadId,
        data: {
          approve: false,
          assign_robot: false,
          human_response: message,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            queryKeys.instagram.threads.getMessages,
            threadId,
          ]);
          setMessage("");
        },
      }
    );
  };
  return (
    <Group pl={8} sx={{ borderTop: "1px solid #f0f0f0" }} spacing={0} mih={104}>
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
            <Send strokeWidth={1.4} />
          </ActionIcon>
        )}
      </Group>
    </Group>
  );
}
