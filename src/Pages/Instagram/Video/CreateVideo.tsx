import React from "react";
import { FormLayout } from "../../../Layouts/FormLayout";
import { InputRow } from "../../../Components/FormComponents/InputRow";
import { Button, TextInput } from "@mantine/core";
import { ButtonRow } from "../../../Components/FormComponents/ButtonRow";
import { useVideosWrapperApi } from "./Hooks/video.hooks";
import { showNotification } from "@mantine/notifications";
import { AlertTriangle, Check } from "tabler-icons-react";
import { apiErrorMessage } from "../../../Utils/api.util";
import { axiosError } from "../../../Interfaces/general.interface";

export function CreateVideo() {
  const { createVideo } = useVideosWrapperApi();
  const [videoLink, setVideoLink] = React.useState("");
  const [videoName, setVideoName] = React.useState("");
  const [videoId, setVideoId] = React.useState("");

  const handleCreateVideo = () => {
    if (videoLink === "") {
      showNotification({
        color: "orange",
        message: "Please enter the video link",
        icon: <AlertTriangle />,
      });
      return;
    }
    if (videoName === "") {
      showNotification({
        color: "orange",
        message: "Please enter the video name",
        icon: <AlertTriangle />,
      });
      return;
    }
    if (videoId === "") {
      showNotification({
        color: "orange",
        message: "Please enter the video id",
        icon: <AlertTriangle />,
      });
      return;
    }

    createVideo.mutate(
      {
        name: videoName,
        link: videoLink,
        video_id: videoId,
      },
      {
        onSuccess: () => {
          showNotification({
            color: "teal",
            message: "Video created successfully",
            icon: <Check />,
          });
          setVideoLink("");
          setVideoName("");
          setVideoId("");
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
    <FormLayout span={7} title="Create Video">
      <InputRow title="Video Link">
        <TextInput
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
      </InputRow>
      <InputRow title="Video Name">
        <TextInput
          value={videoName}
          onChange={(e) => setVideoName(e.target.value)}
        />
      </InputRow>
      <InputRow title="Video Id">
        <TextInput
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
        />
      </InputRow>
      <ButtonRow>
        <Button loading={createVideo.isLoading} onClick={handleCreateVideo}>
          Create Video
        </Button>
      </ButtonRow>
    </FormLayout>
  );
}
