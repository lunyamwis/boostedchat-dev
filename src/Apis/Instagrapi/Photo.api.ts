import { handleRestError, handleRestResponse } from "../response";
import { useInstagrapiAxios } from "../../Hooks/useAxios";
import {
  DownloadPhoto,
  DownloadPhotoByUrl,
  UploadPhoto,
  UploadPhotoByUrl,
  UploadPhotoResult,
  UploadPhotoToStory,
  UploadPhotoToStoryByUrl,
  UploadPhotoToStoryResult,
} from "../../Interfaces/Instagrapi/photo.interface";

export const useInstagrapiPhoto = () => {
  const axiosInstance = useInstagrapiAxios("photo");

  return {
    uploadToStory: (
      params: UploadPhotoToStory
    ): Promise<UploadPhotoToStoryResult> =>
      axiosInstance
        .post("/upload_to_story", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    uploadToStoryByUrl: (
      params: UploadPhotoToStoryByUrl
    ): Promise<UploadPhotoToStoryResult> =>
      axiosInstance
        .post("/upload_to_story/by_url", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    download: (params: DownloadPhoto) =>
      axiosInstance
        .post("/download", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    downloadByUrl: (params: DownloadPhotoByUrl) =>
      axiosInstance
        .post("/download/by_url", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    upload: (params: UploadPhoto): Promise<UploadPhotoResult> =>
      axiosInstance
        .post("/upload", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    uploadByUrl: (params: UploadPhotoByUrl): Promise<UploadPhotoResult> =>
      axiosInstance
        .post("/upload/by_url", params)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
