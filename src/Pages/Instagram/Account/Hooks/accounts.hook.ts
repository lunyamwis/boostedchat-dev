import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
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

export const useGetAccounts = (page: number) => {
  const { getAll } = useAccountsApi();
  return useQuery({
    queryKey: [queryKeys.instagram.accounts.getAccounts, page],
    queryFn: () => getAll(page),
  });
};

export const useGetAccountsByStage = (stage: any, page: number) => {
  const { getByStage } = useAccountsApi();
  return useQuery({
    queryKey: [queryKeys.instagram.accounts.getAccounts, page],
    queryFn: () => getByStage(stage, page),
  });
};

export const useGetAccountsByStageDirectly = (stage: any, page: number) => {
  const { getByStage } = useAccountsApi();
  return getByStage(stage, page);
};

export const getInfiniteAccountsByStage = (stage: string | null) => {
  console.log(`getInfiniteAccountsByStage1`, stage);
  return useInfiniteQuery(
    {
      queryKey: ["accounts", stage],
      queryFn: ({ pageParam = 1 }) =>   useGetAccountsByStageDirectly(stage, pageParam),//useGetAccountsByStage(stage, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        // if (lastPage?.data?.results.length === 0) {
        //   return undefined;
        // }
        if (lastPage.results.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      getPreviousPageParam: (_, p, firstPageParam) => {
        console.log(p);
        if (firstPageParam <= 1) {
          return undefined;
        }
        return firstPageParam - 1;
      },
    }
  );
}

export const useGetActiveStages = () => {
  const { getActiveStages } = useAccountsApi();
  return useQuery({
    queryKey: [queryKeys.instagram.stages.getAllStages],
    queryFn: () => getActiveStages(),
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
