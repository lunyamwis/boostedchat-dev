import { handleRestError, handleRestResponse } from "../response";
import { useGlobalAxios } from "../../Hooks/useAxios";
import { User } from "../../Interfaces/UserManagement/user.interface";
import {
  CreateSalesRep,
  GetSalesRepBulk,
} from "../../Interfaces/UserManagement/salesRep.interface";

export const useSalesRepApi = () => {
  const axiosInstance = useGlobalAxios("sales");

  return {
    getAll: (): Promise<GetSalesRepBulk> =>
      axiosInstance.get("/rep").then(handleRestResponse).catch(handleRestError),
    getOne: (id: string): Promise<User> =>
      axiosInstance
        .get(`/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    create: (params: CreateSalesRep) =>
      axiosInstance
        .post("/rep/", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    assignSalesRep: () =>
      axiosInstance
        .get("/rep/assign-accounts/")
        .then(handleRestResponse)
        .catch(handleRestError),
    softRemove: (id: string) =>
      axiosInstance
        .delete(`/soft-remove/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    restore: (id: string) =>
      axiosInstance
        .patch(`/restore/${id}`, null)
        .then(handleRestResponse)
        .catch(handleRestError),
    remove: (id: string) =>
      axiosInstance
        .delete(`/remove/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
