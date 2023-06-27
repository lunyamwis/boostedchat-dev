import { handleRestError, handleRestResponse } from "../response";
import { useGlobalAxios } from "../../Hooks/useAxios";
import {
  CreatePhoto,
  GetPhoto,
} from "../../Interfaces/Instagram/photo.interface";
import { Lead } from "../../Interfaces/general.interface";
import { UploadCSV } from "../../Interfaces/Instagram/upload.interface";

export const usePhotosApi = () => {
  const axiosInstance = useGlobalAxios("instagram/photo");

  return {
    getAll: (): Promise<GetPhoto[]> =>
      axiosInstance.get("/").then(handleRestResponse).catch(handleRestError),
    getOne: (id: string): Promise<GetPhoto> =>
      axiosInstance
        .get(`/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    getLikers: (id: string): Promise<Lead> =>
      axiosInstance
        .get(`/${id}/retrieve-likers`)
        .then(handleRestResponse)
        .catch(handleRestError),
    create: (params: CreatePhoto) =>
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
