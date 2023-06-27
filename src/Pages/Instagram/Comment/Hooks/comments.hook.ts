import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import { useCommentsApi } from "../../../../Apis/Instagram/Comments.api";
import { CreateComment } from "../../../../Interfaces/Instagram/comment.interface";

export const useCommentsWrapperApi = () => {
  const { create } = useCommentsApi();
  const createComment = useMutation((params: CreateComment) => create(params));

  return {
    createComment,
  };
};

export const useGetComments = () => {
  const { getAll } = useCommentsApi();
  return useQuery([queryKeys.instagram.comments.getComments], () => getAll());
};
