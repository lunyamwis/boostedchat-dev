import { handleRestError, handleRestResponse } from "../response";
import { useAPIGlobalAxios } from "../../Hooks/useAxios";
import {
  CreateAccount,
  GetAccount,
  GetSingleAccount,
  GetSingleAccountWithThreadDetails,
  Stat,
  UpdateAccountParams,
} from "../../Interfaces/Instagram/account.interface";
import { Lead, PaginatedQuery } from "../../Interfaces/general.interface";
import { UploadCSV } from "../../Interfaces/Instagram/upload.interface";

export const useAccountsApi = () => {
  const axiosInstance = useAPIGlobalAxios("instagram/account");

  return {
    getAll: (page: number): Promise<PaginatedQuery<GetAccount>> =>
      axiosInstance
        .get(`/?page=${page}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    getByStage: (stage: string, page: number): Promise<PaginatedQuery<GetAccount>> => {
      console.log("stage IN THE QUERY");
      console.log(stage);
      return axiosInstance
        .get(`/?status_param=${stage}&page=${page}`)
        // .get(`/?page=${page}&${stage}`)
        .then(handleRestResponse)
        .catch(handleRestError)
    },
    getByStageWithFilters: (filterParams: string, page: number): Promise<PaginatedQuery<GetAccount>> => {
      // console.log("filterParams IN THE QUERY");
      // console.log(filterParams);
      return axiosInstance
        // .get(`/?status_param=${stage}&page=${page}`)
        .get(`/?${filterParams}&page=${page}`)
        .then(handleRestResponse)
        .catch(handleRestError)
    },
    getActiveStages: (): Promise<any> =>
      axiosInstance
        .get(`/active-stages/`)
        .then(handleRestResponse)
        .catch(handleRestError),
    getActiveStageStats: (): Promise<Stat[]> =>
      axiosInstance
        .get(`/active-stage-stats/`)
        .then(handleRestResponse)
        .catch(handleRestError),
    getActiveStageStatsWithFilters: (filterParams: string): Promise<Stat[]> =>
      axiosInstance
        .get(`/active-stage-stats/?${filterParams}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    getOneWithThreadDetails: (id: string): Promise<GetSingleAccountWithThreadDetails> =>
      axiosInstance
        .get(`/${id}/threads_with_messages/`)
        .then(handleRestResponse)
        .catch(handleRestError),
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
    clearConversation: (id: string): Promise<any> =>
      axiosInstance
        .post(`/${id}/clear-convo/`)
        .then(handleRestResponse)
        .catch(handleRestError),
    addNotes: (id: string, notes:string): Promise<any> =>
      axiosInstance
        .post(`/${id}/add-notes/`,{"notes": notes})
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
      id: string,
    ): Promise<{ status_code: number; potential_buy: number }> =>
      axiosInstance
        .get(`/${id}/potential-buy`)
        .then(handleRestResponse)
        .catch(handleRestError),
    potentialToPromote: (
      id: string,
    ): Promise<{ status_code: number; potential_promote: number }> =>
      axiosInstance
        .get(`/${id}/potential-promote`)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
