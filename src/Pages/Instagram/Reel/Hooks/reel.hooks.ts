import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import { useReelsApi } from "../../../../Apis/Instagram/Reels.api";
import { CreateReel } from "../../../../Interfaces/Instagram/reel.interface";

export const useReelsWrapperApi = () => {
  const { create } = useReelsApi();
  const createReel = useMutation((params: CreateReel) => create(params));

  return {
    createReel,
  };
};

export const useGetReels = () => {
  const { getAll } = useReelsApi();
  return useQuery([queryKeys.instagram.reels.getReels], () => getAll());
};

export const useGetReelLikers = (id: string) => {
  const { getLikers } = useReelsApi();
  return useQuery(
    [queryKeys.instagram.reels.getLikers, id],
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
