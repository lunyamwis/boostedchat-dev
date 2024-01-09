import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import { useAccountsApi } from "../../../../Apis/Instagram/Accounts.api";
import {
  CreateAccount,
  UpdateAccountParams,
} from "../../../../Interfaces/Instagram/account.interface";
import { UploadCSV } from "../../../../Interfaces/Instagram/upload.interface";

export const useAccountsWrapperApi = () => {
  const { create } = useAccountsApi();
  const createAccount = useMutation({
    mutationFn: (params: CreateAccount) => create(params),
  });
  return {
    createAccount,
  };
};

export const useUpdateAccount = () => {
  const { update } = useAccountsApi();
  return useMutation({
    mutationFn: (params: UpdateAccountParams) => update(params),
  });
};

export const useBulkUploadAccounts = () => {
  const { upload } = useAccountsApi();
  return useMutation({ mutationFn: (params: UploadCSV) => upload(params) });
};

export const useResetAccount = () => {
  const { resetAccount } = useAccountsApi();
  return useMutation({ mutationFn: (id: string) => resetAccount(id) });
};

export const useGetAccounts = () => {
  const { getAll } = useAccountsApi();
  return useQuery({
    queryKey: [queryKeys.instagram.accounts.getAccounts],
    queryFn: () => getAll(),
  });
};

export const useGetAccount = (accountId: string) => {
  const { getOne } = useAccountsApi();
  return useQuery({
    queryKey: [queryKeys.instagram.accounts.getById, accountId],
    queryFn: () => getOne(accountId),
    enabled: accountId !== "",
  });
};

export const useGetAccountByThreadId = (igThreadId: string | null) => {
  const { getByIgThreadId } = useAccountsApi();
  return useQuery({
    queryKey: [queryKeys.instagram.accounts.getByIgThreadId, igThreadId],
    queryFn: () => getByIgThreadId(igThreadId as string),
    enabled: igThreadId != null,
  });
};

export const useGetAccountFollower = (id: string) => {
  const { getFollowers } = useAccountsApi();
  return useQuery({
    queryKey: [queryKeys.instagram.accounts.getFollowers, id],
    queryFn: () => getFollowers(id),
    enabled: id !== "",
    select: (data) => {
      return Object.values(data).map((account) => {
        return {
          username: account[1][1],
          full_name: account[2][1],
          prof_pic: account[3][1],
        };
      });
    },
  });
};
