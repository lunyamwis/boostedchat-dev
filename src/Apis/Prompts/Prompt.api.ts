import { usePromptGlobalAxios } from "@/Hooks/useAxios";
import { handleRestError, handleRestResponse } from "../response";
import {
  CreatePrompt,
  GetPrompt,
  UpdatePromptParams,
} from "@/Interfaces/Scripts/prompt.interface";

export const usePromptApi = () => {
  const axiosInstance = usePromptGlobalAxios("prompts");

  return {
    getAll: (): Promise<GetPrompt[]> =>
      axiosInstance.get("/").then(handleRestResponse).catch(handleRestError),
    getOne: (id: string): Promise<GetPrompt> =>
      axiosInstance
        .get(`/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    create: (params: CreatePrompt) =>
      axiosInstance
        .post("/", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    update: (params: UpdatePromptParams) =>
      axiosInstance
        .put(`/${params.id}/`, params.data)
        .then(handleRestResponse)
        .catch(handleRestError),
    remove: (id: string) =>
      axiosInstance
        .delete(`/remove/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
