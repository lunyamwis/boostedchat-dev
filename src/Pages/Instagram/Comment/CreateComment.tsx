import React from "react";
import { FormLayout } from "../../../Layouts/FormLayout";
import { InputRow } from "../../../Components/FormComponents/InputRow";
import { Button, TextInput } from "@mantine/core";
import { ButtonRow } from "../../../Components/FormComponents/ButtonRow";
import { useCommentsWrapperApi } from "./Hooks/comments.hook";
import { showNotification } from "@mantine/notifications";
import { AlertTriangle, Check } from "tabler-icons-react";
import { apiErrorMessage } from "../../../Utils/api.util";
import { axiosError } from "../../../Interfaces/general.interface";

export function CreateComment() {
  const { createComment } = useCommentsWrapperApi();
  const [comment, setComment] = React.useState("");
  const [commentId, setCommentId] = React.useState("");

  const handleCreateComment = () => {
    if (comment === "") {
      showNotification({
        color: "orange",
        message: "Please enter the comment",
        icon: <AlertTriangle />,
      });
      return;
    }
    if (commentId === "") {
      showNotification({
        color: "orange",
        message: "Please enter the comment id",
        icon: <AlertTriangle />,
      });
      return;
    }

    createComment.mutate(
      {
        comment_id: commentId,
        text: comment,
      },
      {
        onSuccess: () => {
          showNotification({
            color: "teal",
            message: "Comment created successfully",
            icon: <Check />,
          });
          setComment("");
          setCommentId("");
        },
        onError: (err) => {
          const errorMessage = apiErrorMessage(err as axiosError);
          showNotification({
            color: "red",
            message: errorMessage,
            icon: <AlertTriangle />,
          });
        },
      }
    );
  };

  return (
    <FormLayout span={7} title="Create Comment">
      <InputRow title="Comment">
        <TextInput
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </InputRow>
      <InputRow title="Comment Id">
        <TextInput
          value={commentId}
          onChange={(e) => setCommentId(e.target.value)}
        />
      </InputRow>
      <ButtonRow>
        <Button onClick={handleCreateComment}>Create Comment</Button>
      </ButtonRow>
    </FormLayout>
  );
}
