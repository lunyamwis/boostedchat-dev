import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import { useReelsApi } from "../../../../Apis/Instagram/Reels.api";
import { CreateReel } from "../../../../Interfaces/Instagram/reel.interface";

export const useReelsWrapperApi = () => {
  const { getAll, create } = useReelsApi();
  const reelsQR = useQuery([queryKeys.instagram.reels.getReels], () =>
    getAll()
  );
  const createReel = useMutation((params: CreateReel) => create(params));

  return {
    reelsQR,
    createReel,
  };
};
