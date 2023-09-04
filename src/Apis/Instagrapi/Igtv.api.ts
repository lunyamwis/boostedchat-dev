import { handleRestError, handleRestResponse } from "../response";
import { useInstagrapiAxios } from "../../Hooks/useAxios";
import {
  DownloadIgTv,
  DownloadIgTvByUrl,
  UploadIgTv,
  UploadIgTvByUrl,
  UploadIgTvResult,
} from "../../Interfaces/Instagrapi/igtv.interface";

export const useInstagrapiIgTv = () => {
  const axiosInstance = useInstagrapiAxios("igtv");

  return {
    download: (params: DownloadIgTv) =>
      axiosInstance
        .post("/download", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    downloadByUrl: (params: DownloadIgTvByUrl) =>
      axiosInstance
        .post("/download/by_url", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    upload: (params: UploadIgTv): Promise<UploadIgTvResult> =>
      axiosInstance
        .post("/upload", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    uploadByUrl: (params: UploadIgTvByUrl): Promise<UploadIgTvResult> =>
      axiosInstance
        .post("/upload/by_url", params)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
