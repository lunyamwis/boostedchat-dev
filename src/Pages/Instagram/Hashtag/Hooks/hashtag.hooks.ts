import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import { useHashtagApi } from "../../../../Apis/Instagram/Hashtag.api";
import { CreateHashtag } from "../../../../Interfaces/Instagram/hashtag.interface";

export const useHashtagsWrapperApi = () => {
  const { getAll, create } = useHashtagApi();
  const hashtagsQR = useQuery([queryKeys.instagram.hashtags.getHashtags], () =>
    getAll()
  );
  const createHashtag = useMutation((params: CreateHashtag) => create(params));

  return {
    hashtagsQR,
    createHashtag,
  };
};
