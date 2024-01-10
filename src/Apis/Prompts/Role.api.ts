import { handleRestError, handleRestResponse } from "../response";
import { usePromptGlobalAxios } from "../../Hooks/useAxios";
import {
  CreateRole,
  GetRole,
  UpdateRoleParams,
} from "@/Interfaces/Prompts/role.interface";

export const useRoleApi = () => {
  const axiosInstance = usePromptGlobalAxios("roles");

  return {
    getAll: (): Promise<GetRole[]> =>
      axiosInstance.get("/").then(handleRestResponse).catch(handleRestError),
    getOne: (id: string): Promise<GetRole> =>
      axiosInstance
        .get(`/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    create: (params: CreateRole) =>
      axiosInstance
        .post("/", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    update: (params: UpdateRoleParams) =>
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
