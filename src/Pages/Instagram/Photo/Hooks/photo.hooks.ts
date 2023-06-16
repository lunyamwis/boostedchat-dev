import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import { usePhotosApi } from "../../../../Apis/Instagram/Photos.api";
import { CreatePhoto } from "../../../../Interfaces/Instagram/photo.interface";

export const usePhotosWrapperApi = () => {
  const { getAll, create } = usePhotosApi();
  const photosQR = useQuery([queryKeys.instagram.photos.getPhotos], () =>
    getAll()
  );
  const createPhoto = useMutation((params: CreatePhoto) => create(params));

  return {
    photosQR,
    createPhoto,
  };
};
