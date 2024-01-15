import { handleRestError, handleRestResponse } from "../response";
import { usePromptGlobalAxios } from "../../Hooks/useAxios";
import {
  CreateScriptRole,
  GetScriptRole,
  UpdateScriptRoleParams,
} from "@/Interfaces/Scripts/role.interface";

export const useScriptRoleApi = () => {
  const axiosInstance = usePromptGlobalAxios("roles");

  return {
    getAll: (): Promise<GetScriptRole[]> =>
      axiosInstance.get("/").then(handleRestResponse).catch(handleRestError),
    getOne: (id: string): Promise<GetScriptRole> =>
      axiosInstance
        .get(`/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    create: (params: CreateScriptRole) =>
      axiosInstance
        .post("/", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    update: (params: UpdateScriptRoleParams) =>
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
