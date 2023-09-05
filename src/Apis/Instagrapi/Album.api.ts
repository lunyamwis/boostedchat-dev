import { handleRestError, handleRestResponse } from "../response";
import { useInstagrapiAxios } from "../../Hooks/useAxios";
import {
  DownloadAlbum,
  DownloadAlbumByUrls,
  UploadAlbum,
  UploadAlbumResult,
} from "../../Interfaces/Instagrapi/album.interface";

export const useInstagrapiAlbum = () => {
  const axiosInstance = useInstagrapiAxios("album");

  return {
    download: (params: DownloadAlbum) =>
      axiosInstance
        .post("/download", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    downloadByUrl: (params: DownloadAlbumByUrls) =>
      axiosInstance
        .post("/download/by_urls", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    upload: (params: UploadAlbum): Promise<UploadAlbumResult> =>
      axiosInstance
        .post("/upload", params)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
