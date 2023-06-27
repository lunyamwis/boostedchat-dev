import React from "react";
import { FormLayout } from "../../../Layouts/FormLayout";
import { InputRow } from "../../../Components/FormComponents/InputRow";
import { Button, TextInput } from "@mantine/core";
import { ButtonRow } from "../../../Components/FormComponents/ButtonRow";
import { useStorysWrapperApi } from "./Hooks/story.hooks";
import { showNotification } from "@mantine/notifications";
import { AlertTriangle, Check } from "tabler-icons-react";
import { apiErrorMessage } from "../../../Utils/api.util";
import { axiosError } from "../../../Interfaces/general.interface";

export function CreateStory() {
  const { createStory } = useStorysWrapperApi();
  const [storyLink, setStoryLink] = React.useState("");

  const handleCreateStory = () => {
    if (storyLink === "") {
      showNotification({
        color: "orange",
        message: "Please enter the hashtag",
        icon: <AlertTriangle />,
      });
      return;
    }

    createStory.mutate(
      {
        link: storyLink,
      },
      {
        onSuccess: () => {
          showNotification({
            color: "teal",
            message: "Story created successfully",
            icon: <Check />,
          });
          setStoryLink("");
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
    <FormLayout span={7} title="Create Story">
      <InputRow title="Link">
        <TextInput
          value={storyLink}
          onChange={(e) => setStoryLink(e.target.value)}
        />
      </InputRow>
      <ButtonRow>
        <Button onClick={handleCreateStory}>Create Story</Button>
      </ButtonRow>
    </FormLayout>
  );
}
