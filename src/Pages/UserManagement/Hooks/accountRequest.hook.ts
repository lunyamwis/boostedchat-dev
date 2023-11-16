import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../Constants/ApiConstants";
import { useAccountRequestApi } from "../../../Apis/UserManagement/AccountRequests.api";
import {
  ApproveAccountRequest,
  RejectAccountRequest,
} from "../../../Interfaces/UserManagement/accountRequest.interface";

export const useGetAccountRequests = () => {
  const { getAll } = useAccountRequestApi();
  return useQuery([queryKeys.accountRequests.getAll], () => getAll());
};

export const useApproveAccountRequest = () => {
  const { approveRequest } = useAccountRequestApi();

  return useMutation((params: ApproveAccountRequest) => approveRequest(params));
};

export const useRejectAccountRequest = () => {
  const { rejectRequest } = useAccountRequestApi();

  return useMutation((params: RejectAccountRequest) => rejectRequest(params));
};
