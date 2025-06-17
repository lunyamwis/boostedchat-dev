import { handleRestError, handleRestResponse } from "../response";
import { Experiment } from "@/Interfaces/Instagram/Experiments/experiment.interface";
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
  }
}