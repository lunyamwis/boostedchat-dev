import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import { useThreadsApi } from "../../../../Apis/Instagram/Threads.api";
import {
  CreateThreadParams,
  GenerateResponseParams,
} from "../../../../Interfaces/Instagram/Threads/thread.interface";
import { AddComment } from "../../../../Interfaces/Instagram/photo.interface";

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

export const useGetDirectMessages = (threadId: string) => {
  const { getMessages } = useThreadsApi();
  return useQuery(
    [queryKeys.instagram.threads.getMessages, threadId],
    () => getMessages(threadId),
    {
      select: (data) => data.reverse(),
      refetchInterval: 45000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useCheckResponse = () => {
  const { checkResponses } = useThreadsApi();
  return useQuery(
    [queryKeys.instagram.threads.getMessages],
    () => checkResponses(),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useSendDirectMessage = () => {
  const { sendDirectMessage } = useThreadsApi();
  return useMutation((params: AddComment) => sendDirectMessage(params));
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
