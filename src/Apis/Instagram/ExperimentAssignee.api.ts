import { handleRestError, handleRestResponse } from "../response";
import { ExperimentAssignee } from "@/Interfaces/Instagram/Experiments/experiment.interface";
import { useAPIGlobalAxios } from "../../Hooks/useAxios";
import { PaginatedQuery } from "../../Interfaces/general.interface";
export const useExperimentAssigneeApi = () => {
  const axiosInstance = useAPIGlobalAxios("instagram/experiment_assignees");

  return {
    getAllExperimentAssignees: (): Promise<PaginatedQuery<ExperimentAssignee>> =>
      axiosInstance
        .get('')
        .then(handleRestResponse)
        .catch(handleRestError),
      }
}