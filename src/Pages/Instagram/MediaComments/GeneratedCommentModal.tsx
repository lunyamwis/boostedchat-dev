import { Button, Checkbox, Modal, Stack, Text, Textarea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { MediaType, useAddMediaComment } from "./Hooks/mediaComments.hooks";
import { AddComment } from "../../../Interfaces/Instagram/photo.interface";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  generatedComment: string;
  mediaType: MediaType;
  mediaId: string;
};

export function GeneratedCommentModal({
  isOpen,
  setIsOpen,
  generatedComment,
  mediaType,
  mediaId,
}: Props) {
  const queryClient = useQueryClient();
  const [approveComment, setApproveComment] = React.useState(true);
  const [humanComment, setHumanComment] = React.useState("");

  const addMediaComment = useAddMediaComment(mediaType);

  const handleSendComment = () => {
    if (!approveComment && humanComment === "") {
      showNotification({
        message: "Please enter your comment",
        color: "orange",
      });
      return;
    }

    let data: AddComment["data"];

    if (approveComment === true) {
      data = {
        approve: true,
        assign_robot: true,
        generated_response: generatedComment,
      };
    } else {
      data = {
        approve: false,
        assign_robot: false,
        human_response: humanComment,
      };
    }
    addMediaComment.mutate(
      {
        id: mediaId,
        data,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([mediaId, mediaType]);
        },
      }
    );
  };

  return (
    <Modal opened={isOpen} title="Comment" onClose={() => setIsOpen(false)}>
      <Stack>
        <Text>{generatedComment}</Text>
        <Checkbox
          checked={approveComment}
          label="Approve Comment"
          onChange={(e) => setApproveComment(e.target.checked)}
        />
        {!approveComment && (
          <Textarea
            placeholder="Your comment"
            minRows={3}
            value={humanComment}
            onChange={(e) => setHumanComment(e.target.value)}
          />
        )}
        <Button loading={addMediaComment.isLoading} onClick={handleSendComment}>
          Send
        </Button>
      </Stack>
    </Modal>
  );
}
