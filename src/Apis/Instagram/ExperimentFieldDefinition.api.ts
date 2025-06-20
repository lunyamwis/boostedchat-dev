import { handleRestError, handleRestResponse } from "../response";
import { CreateExperimentFieldDefinition, ExperimentFieldDefinition, UpdateExperimentFieldDefinitionParams } from "@/Interfaces/Instagram/Experiments/experiment.interface";
import { useAPIGlobalAxios } from "../../Hooks/useAxios";
import { PaginatedQuery } from "../../Interfaces/general.interface";


export const useExperimentFieldDefinitionApi = () => {
  const axiosInstance = useAPIGlobalAxios("instagram/experiment_fields");

  return {
    getFieldDefinitions: (): Promise<PaginatedQuery<ExperimentFieldDefinition>> =>
      axiosInstance
        .get('')
        .then(handleRestResponse)
        .catch(handleRestError),
      
    getOneExperimentFieldDefinition: (id: string): Promise<ExperimentFieldDefinition> =>
      axiosInstance
        .get(`/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    create: (params: CreateExperimentFieldDefinition) =>
      axiosInstance
        .post(`/`, params)
        .then(handleRestResponse)
        .catch(handleRestError),
    update: (params: UpdateExperimentFieldDefinitionParams) =>
      axiosInstance
        .put(`/${params.id}/`, params.data)
        .then(handleRestResponse)
        .catch(handleRestError),
    removeFieldDefinition: (id: string) =>
      axiosInstance
        .delete(`/${id}/`)
        .then(handleRestResponse)
        .catch(handleRestError),
  }
}