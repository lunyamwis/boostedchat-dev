import { handleRestError, handleRestResponse } from "../response";
import { useInstagrapiAxios } from "../../Hooks/useAxios";
import {
  BaseGetParamsWithCache,
  GetByUserId,
  GetByUserIdWithRevert,
  GetIdFromUsername,
  GetUserFollowers,
  UserFollower,
  UserInfo,
} from "../../Interfaces/Instagrapi/user.interface";

export const useInstagrapiUser = () => {
  const axiosInstance = useInstagrapiAxios("user");

  return {
    getFollowers: (params: GetUserFollowers): Promise<UserFollower> =>
      axiosInstance
        .post("/followers", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    getFollowing: (params: GetUserFollowers): Promise<UserFollower> =>
      axiosInstance
        .post("/following", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    getUserInfo: (params: BaseGetParamsWithCache): Promise<UserInfo> =>
      axiosInstance
        .post("/info", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    getUserInfoByUsername: (params: BaseGetParamsWithCache) =>
      axiosInstance
        .post("/info-by-username", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    follow: (params: GetByUserId): Promise<boolean> =>
      axiosInstance
        .post("/follow", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    unfollow: (params: GetByUserId): Promise<boolean> =>
      axiosInstance
        .post("/unfollow", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    getIdFromUsername: (params: GetIdFromUsername): Promise<string> =>
      axiosInstance
        .post("/id_from_username", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    getUsernameFromId: (params: GetByUserId): Promise<string> =>
      axiosInstance
        .post("/username_from_id", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    removeFollower: (params: GetByUserId): Promise<boolean> =>
      axiosInstance
        .post("/remove_follower", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    mutePostsFromFollow: (params: GetByUserIdWithRevert): Promise<boolean> =>
      axiosInstance
        .post("/mute_posts_from_follow", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    unmutePostsFromFollower: (params: GetByUserId): Promise<boolean> =>
      axiosInstance
        .post("unmute_posts_from_follow", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    muteStoriesFromFollower: (
      params: GetByUserIdWithRevert
    ): Promise<boolean> =>
      axiosInstance
        .post("/mute_posts_from_follow", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    unmuteStoriesFromFollower: (params: GetByUserId): Promise<boolean> =>
      axiosInstance
        .post("/unmute_posts_from_follow", params)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
