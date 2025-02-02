import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import { useMediaApi } from "../../../../Apis/Instagram/Media.api";
import {
  Media
} from "../../../../Interfaces/Instagram/media.interface";

export const useCreateMedia = () => {
  const { createMedia } = useMediaApi();
  const createAccount = useMutation({
    mutationFn: (params: Media) => createMedia(params),
  });
  return {
    createAccount,
  };
};

export const useDownloadMedia = () => {
  const { downloadMedia } = useMediaApi();
  return useMutation({ mutationFn: (id: string) => downloadMedia(id) });
};


