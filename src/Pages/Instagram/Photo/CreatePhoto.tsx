import React from "react";
import { FormLayout } from "../../../Layouts/FormLayout";
import { InputRow } from "../../../Components/FormComponents/InputRow";
import { Button, TextInput } from "@mantine/core";
import { ButtonRow } from "../../../Components/FormComponents/ButtonRow";
import { usePhotosWrapperApi } from "./Hooks/photo.hooks";
import { showNotification } from "@mantine/notifications";
import { AlertTriangle, Check } from "tabler-icons-react";
import { apiErrorMessage } from "../../../Utils/api.util";
import { axiosError } from "../../../Interfaces/general.interface";

export function CreatePhoto() {
  const { createPhoto } = usePhotosWrapperApi();
  const [photoName, setPhotoName] = React.useState("");
  const [photoLink, setPhotoLink] = React.useState("");
  const [photoId, setPhotoId] = React.useState("");

  const handleCreatePhoto = () => {
    if (photoName === "") {
      showNotification({
        color: "orange",
        message: "Please enter the photo name",
        icon: <AlertTriangle />,
      });
      return;
    }
    if (photoLink === "") {
      showNotification({
        color: "orange",
        message: "Please enter the photo link",
        icon: <AlertTriangle />,
      });
      return;
    }
    if (photoId === "") {
      showNotification({
        color: "orange",
        message: "Please enter the photo id",
        icon: <AlertTriangle />,
      });
      return;
    }

    createPhoto.mutate(
      {
        link: photoLink,
        name: photoName,
        photo_id: photoId,
      },
      {
        onSuccess: () => {
          showNotification({
            color: "teal",
            message: "Photo created successfully",
            icon: <Check />,
          });
          setPhotoName("");
          setPhotoLink("");
          setPhotoId("");
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
    <FormLayout span={7} title="Create Photo">
      <InputRow title="Photo Name">
        <TextInput
          value={photoName}
          onChange={(e) => setPhotoName(e.target.value)}
        />
      </InputRow>
      <InputRow title="Link">
        <TextInput
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
      </InputRow>
      <InputRow title="Photo id">
        <TextInput
          value={photoId}
          onChange={(e) => setPhotoId(e.target.value)}
        />
      </InputRow>
      <ButtonRow>
        <Button onClick={handleCreatePhoto}>Create Photo</Button>
      </ButtonRow>
    </FormLayout>
  );
}
