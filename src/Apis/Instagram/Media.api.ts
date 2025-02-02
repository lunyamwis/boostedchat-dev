import { handleRestError, handleRestResponse } from "../response";
import { useLeadsGenerationGlobalAxios } from "../../Hooks/useAxios";
import {
  Media
} from "../../Interfaces/Instagram/media.interface";
export const useMediaApi = () => {
  const axiosInstance = useLeadsGenerationGlobalAxios("instagram/media");

  return {
    createMedia: (params: Media) =>
      axiosInstance
        .post("/", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    downloadMedia: (id: string) =>
      axiosInstance
        .post(`/${id}/download-media/`)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
