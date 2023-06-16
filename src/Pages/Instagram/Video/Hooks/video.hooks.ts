import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import { useVideosApi } from "../../../../Apis/Instagram/Video.api";
import { CreateVideo } from "../../../../Interfaces/Instagram/video.interface";

export const useVideosWrapperApi = () => {
  const { getAll, create } = useVideosApi();
  const videosQR = useQuery([queryKeys.instagram.videos.getVideos], () =>
    getAll()
  );
  const createVideo = useMutation((params: CreateVideo) => create(params));

  return {
    videosQR,
    createVideo,
  };
};
