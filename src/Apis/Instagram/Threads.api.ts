import { handleRestError, handleRestResponse } from "../response";
import { useGlobalAxios } from "../../Hooks/useAxios";
import {
  CreateThreadParams,
  GeneratedResponse,
  GenerateResponseParams,
  GetDirectMessage,
  GetThread,
  GetThreadMessage,
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
    getThreadMessages: (threadId: string): Promise<GetThreadMessage[]> =>
      axiosInstance
        .get(`/${threadId}/get-thread-messages`)
        .then(handleRestResponse)
        .catch(handleRestError),
    getMessages: (threadId: string): Promise<GetDirectMessage[]> =>
      axiosInstance
        .get(`/${threadId}/fetch-messages/`)
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
    sendDirectMessage: (params: AddComment) =>
      axiosInstance
        .post(`/${params.id}/send-message/`, params.data)
        .then(handleRestResponse)
        .catch(handleRestError),
    generateResponse: (
      params: GenerateResponseParams
    ): Promise<GeneratedResponse> =>
      axiosInstance
        .post(`/${params.id}/generate-respons/`, params.data)
        .then(handleRestResponse)
        .catch(handleRestError),
    checkResponses: () =>
      axiosInstance
        .get(`/check-respons/`)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
