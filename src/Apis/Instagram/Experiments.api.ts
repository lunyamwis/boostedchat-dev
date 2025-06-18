import { handleRestError, handleRestResponse } from "../response";
import { Experiment, UpdateExperimentParams, CreateExperiment, ExperimentFieldDefinition } from "@/Interfaces/Instagram/Experiments/experiment.interface";
import { useAPIGlobalAxios } from "../../Hooks/useAxios";
import { PaginatedQuery } from "../../Interfaces/general.interface";
export const useExperimentsApi = () => {
  const axiosInstance = useAPIGlobalAxios("instagram/experiments");

  return {
    getExperiments: (): Promise<PaginatedQuery<Experiment>> =>
      axiosInstance
        .get('')
        .then(handleRestResponse)
        .catch(handleRestError),
    getOneExperiment: (id: string): Promise<Experiment> =>
      axiosInstance
        .get(`/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    getExperimentFieldDefinitions: (id: string): Promise<PaginatedQuery<ExperimentFieldDefinition>> =>
      axiosInstance
        .get(`/${id}/experiment_fields/`)
        .then(handleRestResponse)
        .catch(handleRestError),
    create: (params: CreateExperiment) =>
      axiosInstance
        .post(`/`, params)
        .then(handleRestResponse)
        .catch(handleRestError),
    update: (params: UpdateExperimentParams) =>
      axiosInstance
        .put(`/${params.id}/`, params.data)
        .then(handleRestResponse)
        .catch(handleRestError),
  }
}