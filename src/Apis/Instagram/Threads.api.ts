import { handleRestError, handleRestResponse } from "../response";
import { useGlobalAxios } from "../../Hooks/useAxios";
import {
  AssignOperator,
  CreateThreadParams,
  GetThread,
  GetThreadMessage,
  SendDirectMessageManually,
  Thread,
} from "../../Interfaces/Instagram/Threads/thread.interface";
import {
  AddComment,
  AddedCommentRespose,
} from "../../Interfaces/Instagram/photo.interface";

export const useThreadsApi = () => {
  const axiosInstance = useGlobalAxios("instagram/dm");

  return {
    getAll: (): Promise<GetThread[]> =>
      axiosInstance.get("/").then(handleRestResponse).catch(handleRestError),
    getOne: (id: string): Promise<GetThread> =>
      axiosInstance
        .get(`/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    create: (params: CreateThreadParams) =>
      axiosInstance
        .post("/", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    getThreadByIgThreadId: (igThreadId: string): Promise<Thread> =>
      axiosInstance
        .get(`/thread-by-ig-thread/${igThreadId}/`)
        .then(handleRestResponse)
        .catch(handleRestError),
    getThreadMessagesByThreadId: (
      threadId: string
    ): Promise<GetThreadMessage[]> =>
      axiosInstance
        .get(`/${threadId}/get-thread-messages`)
        .then(handleRestResponse)
        .catch(handleRestError),
    getThreadMessagesByIgThreadId: (
      igThreadId: string
    ): Promise<GetThreadMessage[]> =>
      axiosInstance
        .get(`/messages-by-ig-thread/${igThreadId}/`)
        .then(handleRestResponse)
        .catch(handleRestError),
    addComment: (params: AddComment): Promise<AddedCommentRespose> =>
      axiosInstance
        .post(`/${params.id}/add-comment/`, params.data)
        .then(handleRestResponse)
        .catch(handleRestError),
    clearThread: (threadId: string) =>
      axiosInstance
        .delete(`/${threadId}/delete-all-thread-messages`)
        .then(handleRestResponse)
        .catch(handleRestError),
    sendDirectMessage: (params: SendDirectMessageManually) =>
      axiosInstance
        .post(`/${params.id}/send-message-manually/`, params.data)
        .then(handleRestResponse)
        .catch(handleRestError),
    resetThreadCount: (id: string) =>
      axiosInstance
        .post(`/${id}/reset-thread-count/`)
        .then(handleRestResponse)
        .catch(handleRestError),
    getSnapshotByDate: (date: string) =>
      axiosInstance
        .post(`/response-rate/`, { date })
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};

export const useFallbackApi = () => {
  const axiosInstance = useGlobalAxios("instagram/fallback");

  return {
    assignOperator: (params: AssignOperator) =>
      axiosInstance
        .post(`/${params.threadId}/assign-operator/`, params.data)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
