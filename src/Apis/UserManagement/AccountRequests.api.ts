import { handleRestError, handleRestResponse } from "../response";
import { useGlobalAxios } from "../../Hooks/useAxios";
import {
  ActivateAccount,
  ApproveAccountRequest,
  GetAccountRequest,
  RejectAccountRequest,
} from "../../Interfaces/UserManagement/accountRequest.interface";

export const useAccountRequestApi = () => {
  const axiosInstance = useGlobalAxios("authentication");

  return {
    getAll: (): Promise<GetAccountRequest[]> =>
      axiosInstance
        .get("/account-request/all")
        .then(handleRestResponse)
        .catch(handleRestError),
    approveRequest: (params: ApproveAccountRequest) =>
      axiosInstance
        .post(`/account-request/approve/${params.request_id}/`, params.data)
        .then(handleRestResponse)
        .catch(handleRestError),
    rejectRequest: (params: RejectAccountRequest) =>
      axiosInstance
        .post(`/account-request/reject/${params.request_id}/`, params.data)
        .then(handleRestResponse)
        .catch(handleRestError),
    activateAccount: (params: ActivateAccount) =>
      axiosInstance
        .post(`/account-request/approve/${params.userId}/`, params.data)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
