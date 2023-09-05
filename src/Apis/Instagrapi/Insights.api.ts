import { handleRestError, handleRestResponse } from "../response";
import { useInstagrapiAxios } from "../../Hooks/useAxios";
import {
  GetAccountInsights,
  GetMediaInsights,
} from "../../Interfaces/Instagrapi/insights.interface";

export const useInstagrapiAlbum = () => {
  const axiosInstance = useInstagrapiAxios("insights");

  return {
    getAccountInsights: (params: GetAccountInsights) =>
      axiosInstance
        .post("/account", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    getMediaInsights: (params: GetMediaInsights) =>
      axiosInstance
        .post("/media", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    mediaFeed: () =>
      axiosInstance
        .post("/media_feed_all")
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
