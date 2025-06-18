import { handleRestError, handleRestResponse } from "../response";
import { ExperimentStatus } from "@/Interfaces/Instagram/Experiments/experiment.interface";
import { useAPIGlobalAxios } from "../../Hooks/useAxios";
import { PaginatedQuery } from "../../Interfaces/general.interface";
export const useExperimentStatusApi = () => {
  const axiosInstance = useAPIGlobalAxios("instagram/experiment_status");

  return {
    getAllExperimentStatus: (): Promise<PaginatedQuery<ExperimentStatus>> =>
      axiosInstance
        .get('')
        .then(handleRestResponse)
        .catch(handleRestError),
      }
}