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
  const createAccount = useMutation((params: CreateAccount) => create(params));
  return {
    createAccount,
  };
};

export const useUpdateAccount = () => {
  const { update } = useAccountsApi();
  return useMutation((params: UpdateAccountParams) => update(params));
};

export const useBulkUploadAccounts = () => {
  const { upload } = useAccountsApi();
  return useMutation((params: UploadCSV) => upload(params));
};

export const useResetAccount = () => {
  const { resetAccount } = useAccountsApi();
  return useMutation((id: string) => resetAccount(id));
};

export const useGetAccounts = () => {
  const { getAll } = useAccountsApi();
  return useQuery([queryKeys.instagram.accounts.getAccounts], () => getAll());
};

export const useGetAccount = (accountId: string) => {
  const { getOne } = useAccountsApi();
  return useQuery(
    [queryKeys.instagram.accounts.getById, accountId],
    () => getOne(accountId),
    {
      enabled: accountId !== "",
    }
  );
};

export const useGetAccountByThreadId = (igThreadId: string | null) => {
  const { getByIgThreadId } = useAccountsApi();
  return useQuery(
    [queryKeys.instagram.accounts.getByIgThreadId, igThreadId],
    () => getByIgThreadId(igThreadId as string),
    {
      enabled: igThreadId != null,
    }
  );
};

export const useGetAccountFollower = (id: string) => {
  const { getFollowers } = useAccountsApi();
  return useQuery(
    [queryKeys.instagram.accounts.getFollowers, id],
    () => getFollowers(id),
    {
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
    }
  );
};

export const useGetPotentialToBuy = (id: string) => {
  const { potentialToBuy } = useAccountsApi();
  return useQuery(
    [queryKeys.instagram.accounts.potentiaToBuy, id],
    () => potentialToBuy(id),
    {
      enabled: false,
      retry: false,
    }
  );
};

export const useGetPotentialToPromote = (id: string) => {
  const { potentialToPromote } = useAccountsApi();
  return useQuery(
    [queryKeys.instagram.accounts.potentialToPromote, id],
    () => potentialToPromote(id),
    {
      enabled: false,
      retry: false,
    }
  );
};
