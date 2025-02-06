import { handleRestError, handleRestResponse } from "../response";
import { useAPIGlobalAxios } from "../../Hooks/useAxios";
import { CommentItem } from "../../Interfaces/Instagram/commentItem.interface";
import { PaginatedQuery } from "../../Interfaces/general.interface";
import { LikeItem } from "@/Interfaces/Instagram/likeItem.interface";

export const useLikersCommentersApi = () => {
  const axiosCommentInstance = useAPIGlobalAxios("instagram/comment");
  const axiosLikersInstance = useAPIGlobalAxios("instagram/like");

  return {
    getAllComments: (page: number): Promise<PaginatedQuery<CommentItem>> =>
      axiosCommentInstance
        .get(`/?page=${page}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    getAllLikes: (page: number): Promise<PaginatedQuery<LikeItem>> =>
      axiosLikersInstance
        .get(`/?page=${page}`)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
