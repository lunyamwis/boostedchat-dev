import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import { usePhotosApi } from "../../../../Apis/Instagram/Photos.api";
import { CreatePhoto } from "../../../../Interfaces/Instagram/photo.interface";
import { UploadCSV } from "../../../../Interfaces/Instagram/upload.interface";

export const usePhotosWrapperApi = () => {
  const { create } = usePhotosApi();
  const createPhoto = useMutation((params: CreatePhoto) => create(params));

  return {
    createPhoto,
  };
};

export const useBulkUploadPhotos = () => {
  const { upload } = usePhotosApi();
  return useMutation((params: UploadCSV) => upload(params));
};

export const useGetPhotos = () => {
  const { getAll } = usePhotosApi();
  return useQuery([queryKeys.instagram.photos.getPhotos], () => getAll());
};

export const useGetPhotoLikers = (id: string) => {
  const { getLikers } = usePhotosApi();
  return useQuery(
    [queryKeys.instagram.photos.getLikers, id],
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
