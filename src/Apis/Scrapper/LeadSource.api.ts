import { useLeadsGenerationGlobalAxios } from "@/Hooks/useAxios";
import { handleRestError, handleRestResponse } from "../response";
import {
  CreateLeadSource,
  GetLeadSource,
  UpdateLeadSourceParams,
} from "@/Interfaces/LeadsGeneration/lead-source.interface";

export const useLeadSourceApi = () => {
  const axiosInstance = useLeadsGenerationGlobalAxios("instagram/lead_sources");

  return {
    getAll: (): Promise<GetLeadSource[]> =>
      axiosInstance.get("/").then(handleRestResponse).catch(handleRestError),
    getOne: (id: string): Promise<GetLeadSource> =>
      axiosInstance
        .get(`/${id}/`)
        .then(handleRestResponse)
        .catch(handleRestError),
    create: (params: CreateLeadSource) =>
      axiosInstance
        .post("/", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    update: (params: UpdateLeadSourceParams) =>
      axiosInstance
        .put(`/${params.id}/`, params.data)
        .then(handleRestResponse)
        .catch(handleRestError),
    remove: (id: string) =>
      axiosInstance
        .delete(`/${id}/`)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
