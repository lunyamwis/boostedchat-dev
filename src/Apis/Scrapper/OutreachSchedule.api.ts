import { useLeadsGenerationGlobalAxios } from "@/Hooks/useAxios";
import { handleRestError, handleRestResponse } from "../response";
import {
  CreateOutreachSchedule,
  GetOutreachSchedule,
  UpdateOutreachScheduleParams,
} from "@/Interfaces/LeadsGeneration/outreach-schedule.interface";

export const useOutreachScheduleApi = () => {
  const axiosInstance = useLeadsGenerationGlobalAxios("instagram/schedulers");

  return {
    getAll: (): Promise<GetOutreachSchedule[]> =>
      axiosInstance.get("/").then(handleRestResponse).catch(handleRestError),
    getOne: (id: string): Promise<GetOutreachSchedule> =>
      axiosInstance
        .get(`/${id}/`)
        .then(handleRestResponse)
        .catch(handleRestError),
    create: (params: CreateOutreachSchedule) =>
      axiosInstance
        .post("/", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    update: (params: UpdateOutreachScheduleParams) =>
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
