import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import { useHashtagApi } from "../../../../Apis/Instagram/Hashtag.api";
import { CreateHashtag } from "../../../../Interfaces/Instagram/hashtag.interface";
import { UploadCSV } from "../../../../Interfaces/Instagram/upload.interface";

export const useHashtagsWrapperApi = () => {
  const { create } = useHashtagApi();
  const createHashtag = useMutation((params: CreateHashtag) => create(params));
  return {
    createHashtag,
  };
};

export const useBulkUploadHashtags = () => {
  const { upload } = useHashtagApi();
  return useMutation((params: UploadCSV) => upload(params));
};

export const useGetHashtags = () => {
  const { getAll } = useHashtagApi();
  return useQuery([queryKeys.instagram.hashtags.getHashtags], () => getAll());
};
