import { handleRestError, handleRestResponse } from "../response";
import { useGlobalAxios } from "../../Hooks/useAxios";
import {
  CreateVideo,
  GetVideo,
} from "../../Interfaces/Instagram/video.interface";
import { Lead } from "../../Interfaces/general.interface";
import { UploadCSV } from "../../Interfaces/Instagram/upload.interface";
import { MediaCommentResponse } from "../../Interfaces/Instagram/comment.interface";
import {
  AddComment,
  GenerateComment,
  GeneratedComment,
} from "../../Interfaces/Instagram/photo.interface";

export const useVideosApi = () => {
  const axiosInstance = useGlobalAxios("instagram/video");

  return {
    getAll: (): Promise<GetVideo[]> =>
      axiosInstance.get("/").then(handleRestResponse).catch(handleRestError),
    getOne: (id: string): Promise<GetVideo> =>
      axiosInstance
        .get(`/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    getLikers: (id: string): Promise<Lead> =>
      axiosInstance
        .get(`/${id}/retrieve-likers`)
        .then(handleRestResponse)
        .catch(handleRestError),
    getComments: (id: string): Promise<MediaCommentResponse> =>
      axiosInstance
        .get(`/${id}/fetch-comments/`)
        .then(handleRestResponse)
        .catch(handleRestError),
    generateComment: (params: GenerateComment): Promise<GeneratedComment> =>
      axiosInstance
        .post(`/${params.id}/generate-comment/`, params.data)
        .then(handleRestResponse)
        .catch(handleRestError),
    addComment: (params: AddComment) =>
      axiosInstance
        .post(`/${params.id}/add-comment/`, params.data)
        .then(handleRestResponse)
        .catch(handleRestError),
    create: (params: CreateVideo) =>
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
