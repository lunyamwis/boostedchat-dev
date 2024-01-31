import { useLeadsGenerationGlobalAxios } from "@/Hooks/useAxios";
import { handleRestError, handleRestResponse } from "../response";
import {
  CreateQualifyingAlgorithm,
  GetQualifyingAlgorithm,
  UpdateQualifyingAlgorithmParams,
} from "@/Interfaces/LeadsGeneration/qualifying-algorithm.interface";

export const useQualifyingAlgorithmApi = () => {
  const axiosInstance = useLeadsGenerationGlobalAxios(
    "instagram/qualification_algorithms",
  );

  return {
    getAll: (): Promise<GetQualifyingAlgorithm[]> =>
      axiosInstance.get("/").then(handleRestResponse).catch(handleRestError),
    getOne: (id: string): Promise<GetQualifyingAlgorithm> =>
      axiosInstance
        .get(`/${id}/`)
        .then(handleRestResponse)
        .catch(handleRestError),
    create: (params: CreateQualifyingAlgorithm) =>
      axiosInstance
        .post("/", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    update: (params: UpdateQualifyingAlgorithmParams) =>
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
