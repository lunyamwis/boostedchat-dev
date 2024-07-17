import { handleRestError, handleRestResponse } from "../response";
import { useAPIGlobalAxios } from "../../Hooks/useAxios";
import { User } from "../../Interfaces/UserManagement/user.interface";
import {
  CreateSalesRep,
  GetSalesRep,
  GetSalesRepBulk,
  RegisterDeviceParams
} from "../../Interfaces/UserManagement/salesRep.interface";

export const useSalesRepApi = () => {
  const axiosInstance = useAPIGlobalAxios("sales");

  return {
    getAll: (): Promise<GetSalesRepBulk> =>
      axiosInstance.get("/rep").then(handleRestResponse).catch(handleRestError),
    getAllFlattened: (): Promise<GetSalesRep[]> =>
      axiosInstance
        .get("/rep/all")
        .then(handleRestResponse)
        .catch(handleRestError),
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
    assignSalesRep: (reaction: number) =>
      axiosInstance
        .post("/rep/assign-accounts/", { reaction })
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
    registerDevice: (data: RegisterDeviceParams) => {
      return axiosInstance
        .post('/rep/', {data})
        .then(handleRestResponse)
        .catch(handleRestError)

    },
  };
};
