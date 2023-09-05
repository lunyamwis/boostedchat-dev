import { handleRestError, handleRestResponse } from "../response";
import { useInstagrapiAxios } from "../../Hooks/useAxios";
import {
  DownloadStoryByUrl,
  GetBaseStoryParams,
  GetStoryParamsWithAmount,
  GetStoryParamsWithCache,
  GetStoryParamsWithFile,
  GetStoryParamsWithRevert,
  PostMarkAsSeenStory,
} from "../../Interfaces/Instagrapi/story.interface";
import { UploadResult } from "../../Interfaces/Instagrapi/common.interface";

export const useInstagrapiStory = () => {
  const axiosInstance = useInstagrapiAxios("story");

  return {
    userStories: (params: GetStoryParamsWithAmount): Promise<UploadResult[]> =>
      axiosInstance
        .post("/user_stories", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    getStoryInfo: (params: GetStoryParamsWithCache): Promise<UploadResult> =>
      axiosInstance
        .post("/info", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    delete: (params: GetBaseStoryParams): Promise<boolean> =>
      axiosInstance
        .post("/delete", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    markSeen: (params: PostMarkAsSeenStory): Promise<boolean> =>
      axiosInstance
        .post("/seen", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    like: (params: GetStoryParamsWithRevert): Promise<boolean> =>
      axiosInstance
        .post("/like", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    unLike: (params: GetBaseStoryParams): Promise<boolean> =>
      axiosInstance
        .post("/unlike", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    download: (params: GetStoryParamsWithFile) =>
      axiosInstance
        .post("/download", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    downloadByUrl: (params: DownloadStoryByUrl) =>
      axiosInstance
        .post("/download/by_url", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    getStoryPkFromUrl: (url: string) =>
      axiosInstance
        .get(`/pk_from_url?url=${url}`)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
