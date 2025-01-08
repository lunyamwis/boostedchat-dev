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

export const useGetAccountsByStageDirectlyWithFilters = (filterParams: any, page: number) => {
  const { getByStageWithFilters } = useAccountsApi();
  return getByStageWithFilters(filterParams, page);
};

export const useGetAccountThreadDetails = (id: string) => {
  const { getOneWithThreadDetails } = useAccountsApi();
  return useQuery({
    queryKey: [queryKeys.instagram.accounts.getAccountThreadDetails, id],
    queryFn: () => getOneWithThreadDetails(id),
  });
};

export const useGetStageStats = () => {
  const { getActiveStageStats } = useAccountsApi();
  return useQuery({
    queryKey: [queryKeys.instagram.stages.getStageStats],
    queryFn: () => getActiveStageStats(),
  });
};

export const useGetStageStatsWithDateFilters = (filterParams: string) => {
  const { getActiveStageStatsWithFilters } = useAccountsApi();
  return useQuery({
    queryKey: [queryKeys.instagram.stages.getStageStats, filterParams],
    queryFn: () => getActiveStageStatsWithFilters(filterParams),
  });
};


export const useGetAccountThreadDetailsDirectly = (id: string) => {
  const { getOneWithThreadDetails } = useAccountsApi();
  return getOneWithThreadDetails(id);
};

export const getInfiniteAccountsByStage = (stage: string | null) => {
  return useInfiniteQuery(
    {
      queryKey: ["accounts", stage],
      queryFn: ({ pageParam = 1 }) => useGetAccountsByStageDirectly(stage, pageParam),//useGetAccountsByStage(stage, pageParam),
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
        console.log(p)
        if (firstPageParam <= 1) {
          return undefined;
        }
        return firstPageParam - 1;
      },
    }
  );
}

export const getInfiniteAccountsByStageWithFilters = (filterParams: string) => {
  return useInfiniteQuery(
    {
      queryKey: ["accounts", filterParams],
      queryFn: ({ pageParam = 1 }) => useGetAccountsByStageDirectlyWithFilters(filterParams, pageParam),//useGetAccountsByStage(stage, pageParam),
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
        console.log(p)
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

export const useGetMqttHealth = () => {
  const { getMqttHealth } = useAccountsApi();
  return useQuery({
    queryKey: [queryKeys.instagram.mqttHealth.healthStatus],
    queryFn: () => getMqttHealth(),
    refetchInterval: 300000
  });
};

export const useGetMqttLoggedInAccounts = () => {
  const { getLoggedInAccounts } = useAccountsApi();
  return useQuery({
    queryKey: [queryKeys.instagram.mqttHealth.loggedInAccounts],
    queryFn: () => getLoggedInAccounts(),
    refetchInterval: 300000
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
