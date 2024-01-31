import { AssignOperator } from "../../../../Interfaces/Instagram/Threads/thread.interface";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import {
  useFallbackApi,
  useThreadsApi,
} from "../../../../Apis/Instagram/Threads.api";
import {
  CreateThreadParams,
  SendDirectMessageManually,
} from "../../../../Interfaces/Instagram/Threads/thread.interface";
import { AddComment } from "../../../../Interfaces/Instagram/photo.interface";
import { useAuditLogsApi } from "../../../../Apis/Logs/Logs.api";

export const useThreadsWrapperApi = () => {
  const { create } = useThreadsApi();
  const createThread = useMutation({
    mutationFn: (params: CreateThreadParams) => create(params),
  });

  return {
    createThread,
  };
};

export const useGetThreads = (filterParams: string) => {
  const { getAll } = useThreadsApi();
  return useInfiniteQuery({
    refetchOnWindowFocus: true,
    queryKey: [queryKeys.instagram.threads.getAll, filterParams],
    queryFn: ({ pageParam }) => getAll(filterParams, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
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
  });
};

export const useGetThreadByIgThreadId = (igThreadId: string | null) => {
  const { getThreadByIgThreadId } = useThreadsApi();
  return useQuery({
    queryKey: [queryKeys.instagram.threads.byIgThreadId, igThreadId],
    queryFn: () => getThreadByIgThreadId(igThreadId as string),
    enabled: igThreadId != null,
  });
};

export const useGetThreadMessagesByThreadId = (threadId: string) => {
  const { getThreadMessagesByThreadId } = useThreadsApi();
  return useQuery({
    queryKey: [queryKeys.instagram.threads.getMessages, threadId],
    queryFn: () => getThreadMessagesByThreadId(threadId),
    refetchInterval: 45000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
  });
};

export const useGetThreadMessagesByIgThreadId = (igThreadId: string | null) => {
  const { getThreadMessagesByIgThreadId } = useThreadsApi();
  return useQuery({
    queryKey: [queryKeys.instagram.threads.getMessages, igThreadId],
    queryFn: () => getThreadMessagesByIgThreadId(igThreadId as string),
    enabled: igThreadId != null,
    refetchInterval: 45000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
  });
};

export const useSendDirectMessage = () => {
  const { sendDirectMessage } = useThreadsApi();
  return useMutation({
    mutationFn: (params: SendDirectMessageManually) =>
      sendDirectMessage(params),
  });
};

export const useAddDM = () => {
  const { addComment } = useThreadsApi();

  return useMutation({
    mutationFn: (params: AddComment) => {
      return addComment(params);
    },
  });
};

export const useClearThread = () => {
  const { clearThread } = useThreadsApi();
  return useMutation({
    mutationFn: (threadId: string) => clearThread(threadId),
  });
};

export const useResetThreadCount = () => {
  const { resetThreadCount } = useThreadsApi();
  return useMutation({ mutationFn: (id: string) => resetThreadCount(id) });
};

export const useGetAccountStatusAuditLogs = (accountId: string) => {
  const { getStatusChangesLogs } = useAuditLogsApi();

  return useQuery({
    queryKey: [queryKeys.auditLogs.getAll],
    queryFn: () => getStatusChangesLogs(accountId),
  });
};

export const useAssignOperator = () => {
  const { assignOperator } = useFallbackApi();
  return useMutation({
    mutationFn: (params: AssignOperator) => assignOperator(params),
  });
};
