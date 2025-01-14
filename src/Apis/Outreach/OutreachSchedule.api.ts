import { useAPIGlobalAxios } from "@/Hooks/useAxios";
import { handleRestError, handleRestResponse } from "../response";
import {
  // CreateOutreachSchedule,
  // GetOutreachSchedule,
  Outreach
  // UpdateOutreachScheduleParams,
} from "@/Interfaces/Outreach/outreach.interface";
import { 
  // Lead, 
  PaginatedQuery } from "../../Interfaces/general.interface";

export const useOutreachApi = () => {
  const axiosInstance = useAPIGlobalAxios("outreaches/periodic-tasks");

  return {
    getAll: (): Promise<PaginatedQuery<Outreach>> =>
      axiosInstance.get("/").then(handleRestResponse).catch(handleRestError),
    // getOne: (id: string): Promise<GetOutreachSchedule> =>
    //   axiosInstance
    //     .get(`/${id}/`)
    //     .then(handleRestResponse)
    //     .catch(handleRestError),
    // create: (params: CreateOutreachSchedule) =>
    //   axiosInstance
    //     .post("/", params)
    //     .then(handleRestResponse)
    //     .catch(handleRestError),
    // update: (params: UpdateOutreachScheduleParams) =>
    //   axiosInstance
    //     .put(`/${params.id}/`, params.data)
    //     .then(handleRestResponse)
    //     .catch(handleRestError),
    // remove: (id: string) =>
    //   axiosInstance
    //     .delete(`/${id}/`)
    //     .then(handleRestResponse)
    //     .catch(handleRestError),
  };
};
