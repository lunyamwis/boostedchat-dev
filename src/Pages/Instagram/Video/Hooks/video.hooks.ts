import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import { useVideosApi } from "../../../../Apis/Instagram/Video.api";
import { CreateVideo } from "../../../../Interfaces/Instagram/video.interface";

export const useVideosWrapperApi = () => {
  const { create } = useVideosApi();
  const createVideo = useMutation((params: CreateVideo) => create(params));

  return {
    createVideo,
  };
};

export const useGetVideos = () => {
  const { getAll } = useVideosApi();
  return useQuery([queryKeys.instagram.videos.getVideos], () => getAll());
};

export const useGetVideoLikers = (id: string) => {
  const { getLikers } = useVideosApi();
  return useQuery(
    [queryKeys.instagram.videos.getLikers, id],
    () => getLikers(id),
    {
      enabled: id !== "",
      select: (data) => {
        return Object.values(data).map((account) => {
          return {
            username: account[1][1],
            full_name: account[2][1],
            prof_pic: account[3][1],
          };
        });
      },
    }
  );
};
