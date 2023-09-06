import React from "react";
import { FormLayout } from "../../../Layouts/FormLayout";
import { InputRow } from "../../../Components/FormComponents/InputRow";
import { Button, TextInput } from "@mantine/core";
import { ButtonRow } from "../../../Components/FormComponents/ButtonRow";
import { useReelsWrapperApi } from "./Hooks/reel.hooks";
import { showNotification } from "@mantine/notifications";
import { AlertTriangle, Check } from "tabler-icons-react";
import { apiErrorMessage } from "../../../Utils/api.util";
import { axiosError } from "../../../Interfaces/general.interface";

export function CreateReel() {
  const { createReel } = useReelsWrapperApi();
  const [reelLink, setReelLink] = React.useState("");
  const [reelName, setReelName] = React.useState("");
  const [reelId, setReelId] = React.useState("");

  const handleCreateReel = () => {
    if (reelLink === "") {
      showNotification({
        color: "orange",
        message: "Please enter the reel link",
        icon: <AlertTriangle />,
      });
      return;
    }
    if (reelName === "") {
      showNotification({
        color: "orange",
        message: "Please enter the reel name",
        icon: <AlertTriangle />,
      });
      return;
    }
    if (reelId === "") {
      showNotification({
        color: "orange",
        message: "Please enter the reel id",
        icon: <AlertTriangle />,
      });
      return;
    }

    createReel.mutate(
      {
        name: reelName,
        link: reelLink,
        reel_id: reelId,
      },
      {
        onSuccess: () => {
          showNotification({
            color: "teal",
            message: "Reel created successfully",
            icon: <Check />,
          });
          setReelLink("");
          setReelName("");
          setReelId("");
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
    <FormLayout span={7} title="Create Reel">
      <InputRow title="Reel link">
        <TextInput
          value={reelLink}
          onChange={(e) => setReelLink(e.target.value)}
        />
      </InputRow>
      <InputRow title="Reel name">
        <TextInput
          value={reelName}
          onChange={(e) => setReelName(e.target.value)}
        />
      </InputRow>
      <InputRow title="Reel id">
        <TextInput value={reelId} onChange={(e) => setReelId(e.target.value)} />
      </InputRow>
      <ButtonRow>
        <Button loading={createReel.isLoading} onClick={handleCreateReel}>
          Create Reel
        </Button>
      </ButtonRow>
    </FormLayout>
  );
}
