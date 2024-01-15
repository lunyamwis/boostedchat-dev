import { handleRestError, handleRestResponse } from "../response";
import { useAPIGlobalAxios } from "../../Hooks/useAxios";
import {
  CreateAccount,
  GetAccount,
  GetSingleAccount,
  UpdateAccountParams,
} from "../../Interfaces/Instagram/account.interface";
import { Lead } from "../../Interfaces/general.interface";
import { UploadCSV } from "../../Interfaces/Instagram/upload.interface";

export const useAccountsApi = () => {
  const axiosInstance = useAPIGlobalAxios("instagram/account");

  return {
    getAll: (): Promise<GetAccount[]> =>
      axiosInstance.get("/").then(handleRestResponse).catch(handleRestError),
    getOne: (id: string): Promise<GetSingleAccount> =>
      axiosInstance
        .get(`/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    getByIgThreadId: (igThreadId: string): Promise<GetSingleAccount> =>
      axiosInstance
        .get(`/account-by-ig-thread/${igThreadId}/`)
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
    upload: (params: UploadCSV) =>
      axiosInstance
        .post("/batch-uploads/", params.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(handleRestResponse)
        .catch(handleRestError),
    update: (params: UpdateAccountParams) =>
      axiosInstance
        .put(`/${params.id}/`, params.data)
        .then(handleRestResponse)
        .catch(handleRestError),
    resetAccount: (id: string) =>
      axiosInstance
        .post(`/${id}/reset-account/`)
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
    potentialToBuy: (
      id: string
    ): Promise<{ status_code: number; potential_buy: number }> =>
      axiosInstance
        .get(`/${id}/potential-buy`)
        .then(handleRestResponse)
        .catch(handleRestError),
    potentialToPromote: (
      id: string
    ): Promise<{ status_code: number; potential_promote: number }> =>
      axiosInstance
        .get(`/${id}/potential-promote`)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
