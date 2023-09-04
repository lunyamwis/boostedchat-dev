import { handleRestError, handleRestResponse } from "../response";
import { useInstagrapiAxios } from "../../Hooks/useAxios";
import {
  DownloadClip,
  DownloadClipByUrl,
  UploadClip,
  UploadClipByUrl,
  UploadClipResult,
} from "../../Interfaces/Instagrapi/clip.interface";

export const useInstagrapiClip = () => {
  const axiosInstance = useInstagrapiAxios("clip");

  return {
    download: (params: DownloadClip) =>
      axiosInstance
        .post("/download", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    downloadByUrl: (params: DownloadClipByUrl) =>
      axiosInstance
        .post("/download/by_url", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    upload: (params: UploadClip): Promise<UploadClipResult> =>
      axiosInstance
        .post("/upload", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    uploadByUrl: (params: UploadClipByUrl): Promise<UploadClipResult> =>
      axiosInstance
        .post("/upload/by_url", params)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
