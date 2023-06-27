import { handleRestError, handleRestResponse } from "../response";
import { useGlobalAxios } from "../../Hooks/useAxios";
import {
  CreateHashtag,
  GetHashtag,
} from "../../Interfaces/Instagram/hashtag.interface";
import { UploadCSV } from "../../Interfaces/Instagram/upload.interface";

export const useHashtagApi = () => {
  const axiosInstance = useGlobalAxios("instagram/hashtag");

  return {
    getAll: (): Promise<GetHashtag[]> =>
      axiosInstance.get("/").then(handleRestResponse).catch(handleRestError),
    getOne: (id: string): Promise<GetHashtag> =>
      axiosInstance
        .get(`/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    create: (params: CreateHashtag) =>
      axiosInstance
        .post("/", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    upload: (params: UploadCSV) =>
      axiosInstance
        .post("/batch-uploads/", params.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(handleRestResponse)
        .catch(handleRestError),
    softRemove: (id: string) =>
      axiosInstance
        .delete(`/soft-remove/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    restore: (id: string) =>
      axiosInstance
        .patch(`/restore/${id}`, null)
        .then(handleRestResponse)
        .catch(handleRestError),
    remove: (id: string) =>
      axiosInstance
        .delete(`/remove/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
