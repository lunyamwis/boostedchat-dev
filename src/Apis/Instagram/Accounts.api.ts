import { handleRestError, handleRestResponse } from "../response";
import { useGlobalAxios } from "../../Hooks/useAxios";
import {
  CreateAccount,
  GetAccount,
} from "../../Interfaces/Instagram/account.interface";
import { Lead } from "../../Interfaces/general.interface";

export const useAccountsApi = () => {
  const axiosInstance = useGlobalAxios("instagram/account");

  return {
    getAll: (): Promise<GetAccount[]> =>
      axiosInstance.get("/").then(handleRestResponse).catch(handleRestError),
    getOne: (id: string): Promise<GetAccount> =>
      axiosInstance
        .get(`/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    getFollowers: (id: string): Promise<Lead> =>
      axiosInstance
        .get(`/${id}/extract-followers`)
        .then(handleRestResponse)
        .catch(handleRestError),
    create: (params: CreateAccount) =>
      axiosInstance
        .post("/", params)
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
