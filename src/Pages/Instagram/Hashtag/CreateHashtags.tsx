import React from "react";
import { FormLayout } from "../../../Layouts/FormLayout";
import { InputRow } from "../../../Components/FormComponents/InputRow";
import { Button, TextInput } from "@mantine/core";
import { ButtonRow } from "../../../Components/FormComponents/ButtonRow";
import { useHashtagsWrapperApi } from "./Hooks/hashtag.hooks";
import { showNotification } from "@mantine/notifications";
import { AlertTriangle, Check } from "tabler-icons-react";
import { apiErrorMessage } from "../../../Utils/api.util";
import { axiosError } from "../../../Interfaces/general.interface";

export function CreateHashtag() {
  const { createHashtag } = useHashtagsWrapperApi();
  const [hashtagId, setHashtagId] = React.useState("");

  const handleCreateHashtag = () => {
    if (hashtagId === "") {
      showNotification({
        color: "orange",
        message: "Please enter the hashtag id",
        icon: <AlertTriangle />,
      });
      return;
    }

    createHashtag.mutate(
      {
        hashtag_id: hashtagId,
      },
      {
        onSuccess: () => {
          showNotification({
            color: "teal",
            message: "Hashtag created successfully",
            icon: <Check />,
          });
          setHashtagId("");
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
    <FormLayout span={7} title="Create Hashtag">
      <InputRow title="Hashtag Id">
        <TextInput
          value={hashtagId}
          onChange={(e) => setHashtagId(e.target.value)}
        />
      </InputRow>
      <ButtonRow>
        <Button loading={createHashtag.isLoading} onClick={handleCreateHashtag}>
          Create Hashtag
        </Button>
      </ButtonRow>
    </FormLayout>
  );
}
