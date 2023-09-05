import { handleRestError, handleRestResponse } from "../response";
import { useInstagrapiAxios } from "../../Hooks/useAxios";
import {
  DownloadVideo,
  DownloadVideoByUrl,
  UploadVideo,
  UploadVideoByUrl,
  UploadVideoResult,
  UploadVideoToStory,
  UploadVideoToStoryByUrl,
  UploadVideoToStoryResult,
} from "../../Interfaces/Instagrapi/video.interface";

export const useInstagrapiVideo = () => {
  const axiosInstance = useInstagrapiAxios("video");

  return {
    uploadToStory: (
      params: UploadVideoToStory
    ): Promise<UploadVideoToStoryResult> =>
      axiosInstance
        .post("/upload_to_story", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    uploadToStoryByUrl: (
      params: UploadVideoToStoryByUrl
    ): Promise<UploadVideoToStoryResult> =>
      axiosInstance
        .post("/upload_to_story/by_url", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    download: (params: DownloadVideo) =>
      axiosInstance
        .post("/download", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    downloadByUrl: (params: DownloadVideoByUrl) =>
      axiosInstance
        .post("/download/by_url", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    upload: (params: UploadVideo): Promise<UploadVideoResult> =>
      axiosInstance
        .post("/upload", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    uploadByUrl: (params: UploadVideoByUrl): Promise<UploadVideoResult> =>
      axiosInstance
        .post("/upload/by_url", params)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
