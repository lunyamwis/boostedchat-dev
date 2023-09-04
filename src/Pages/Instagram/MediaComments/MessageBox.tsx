import { ActionIcon, Group, Loader, Textarea } from "@mantine/core";
import React from "react";
import { Send } from "tabler-icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { MediaType, useAddMediaComment } from "./Hooks/mediaComments.hooks";

type Props = {
  mediaId: string;
  mediaType: MediaType;
};
export function MessageBox({ mediaId, mediaType }: Props) {
  const [comment, setComment] = React.useState("");

  const queryClient = useQueryClient();
  const addMediaComment = useAddMediaComment(mediaType);

  const handleMakeComment = () => {
    if (comment === "") {
      return;
    }
    addMediaComment.mutate(
      {
        id: mediaId,
        data: {
          approve: false,
          assign_robot: false,
          human_response: comment,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([mediaId, mediaType]);
          setComment("");
        },
      }
    );
  };
  return (
    <Group pl={8} sx={{ borderTop: "1px solid #f0f0f0" }} spacing={0} mih={104}>
      <Textarea
        variant="unstyled"
        placeholder="Your comment..."
        autoFocus
        minRows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ flex: 1 }}
      />
      <Group px={16} position="center">
        {addMediaComment.isLoading ? (
          <ActionIcon size="xl" radius="xl" variant="light" color="brand">
            <Loader size="sm" variant="dots" />
          </ActionIcon>
        ) : (
          <ActionIcon
            size="xl"
            radius="xl"
            variant="light"
            color="brand"
            onClick={handleMakeComment}
          >
            <Send strokeWidth={1.4} />
          </ActionIcon>
        )}
      </Group>
    </Group>
  );
}
