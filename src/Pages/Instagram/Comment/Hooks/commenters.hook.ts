import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import { useLikersCommentersApi } from "../../../../Apis/Instagram/LikersCommenters.api";



export const useGetComments = (page: number) => {
  const { getAllComments } = useLikersCommentersApi();
  return useQuery({
    queryKey: [queryKeys.instagram.comments.getComments, page],
    queryFn: () => getAllComments(page),
  });
};

export const useGetLikes = (page: number) => {
  const { getAllLikes } = useLikersCommentersApi();
  return useQuery({
    queryKey: [queryKeys.instagram.likes.getLikes, page],
    queryFn: () => getAllLikes(page),
  });
};
