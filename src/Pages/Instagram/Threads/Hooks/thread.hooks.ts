import { AssignOperator } from "../../../../Interfaces/Instagram/Threads/thread.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import {
  useFallbackApi,
  useThreadsApi,
} from "../../../../Apis/Instagram/Threads.api";
import {
  CreateThreadParams,
  GenerateResponseParams,
  SendDirectMessageManually,
} from "../../../../Interfaces/Instagram/Threads/thread.interface";
import { AddComment } from "../../../../Interfaces/Instagram/photo.interface";
import { useAuditLogsApi } from "../../../../Apis/Logs/Logs.api";

export const useThreadsWrapperApi = () => {
  const { create } = useThreadsApi();
  const createThread = useMutation((params: CreateThreadParams) =>
    create(params)
  );

  return {
    createThread,
  };
};

export const useGetThreads = () => {
  const { getAll } = useThreadsApi();
  return useQuery([queryKeys.instagram.threads.getAll], () => getAll());
};

export const useGetThreadByIgThreadId = (igThreadId: string | null) => {
  const { getThreadByIgThreadId } = useThreadsApi();
  return useQuery(
    [queryKeys.instagram.threads.byIgThreadId, igThreadId],
    () => getThreadByIgThreadId(igThreadId as string),
    {
      enabled: igThreadId != null,
    }
  );
};

export const useGetThreadMessagesByThreadId = (threadId: string) => {
  const { getThreadMessagesByThreadId } = useThreadsApi();
  return useQuery(
    [queryKeys.instagram.threads.getMessages, threadId],
    () => getThreadMessagesByThreadId(threadId),
    {
      refetchInterval: 45000,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
    }
  );
};

export const useGetThreadMessagesByIgThreadId = (igThreadId: string | null) => {
  const { getThreadMessagesByIgThreadId } = useThreadsApi();
  return useQuery(
    [queryKeys.instagram.threads.getMessages, igThreadId],
    () => getThreadMessagesByIgThreadId(igThreadId as string),
    {
      enabled: igThreadId != null,
      refetchInterval: 45000,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
    }
  );
};

export const useSendDirectMessage = () => {
  const { sendDirectMessage } = useThreadsApi();
  return useMutation((params: SendDirectMessageManually) =>
    sendDirectMessage(params)
  );
};

export const useAddDM = () => {
  const { addComment } = useThreadsApi();

  return useMutation((params: AddComment) => {
    return addComment(params);
  });
};

export const useGenerateMessage = () => {
  const { generateResponse } = useThreadsApi();

  return useMutation((params: GenerateResponseParams) => {
    return generateResponse(params);
  });
};

export const useClearThread = () => {
  const { clearThread } = useThreadsApi();
  return useMutation((threadId: string) => clearThread(threadId));
};

export const useResetThreadCount = () => {
  const { resetThreadCount } = useThreadsApi();
  return useMutation((id: string) => resetThreadCount(id));
};

export const useGetAccountStatusAuditLogs = (accountId: string) => {
  const { getStatusChangesLogs } = useAuditLogsApi();

  return useQuery(
    [queryKeys.auditLogs.getAll],
    () => getStatusChangesLogs(accountId),
    {}
  );
};

export const useAssignOperator = () => {
  const { assignOperator } = useFallbackApi();
  return useMutation((params: AssignOperator) => assignOperator(params));
};
