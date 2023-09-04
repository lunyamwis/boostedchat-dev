import { handleRestError, handleRestResponse } from "../response";
import { useGlobalAxios } from "../../Hooks/useAxios";
import {
  ArchiveMedia,
  DeleteMedia,
  EditMedia,
  GetMediaLikers,
  LikeMedia,
  Oembed,
  PostMediaInfo,
  UnArchiveMedia,
  UnlikeMedia,
  UserMedias,
} from "../../Interfaces/Instagrapi/media.interface";
import { InstagramUser } from "../../Interfaces/Instagrapi/user.interface";

export const useInstagrapiMedia = () => {
  const axiosInstance = useGlobalAxios("media");

  return {
    getById: (mediaId: string) =>
      axiosInstance
        .get(`/id?media_pk${mediaId}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    getByPk: (mediaPk: string) =>
      axiosInstance
        .get(`/pk?media_id${mediaPk}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    getPkFromCode: (code: string) =>
      axiosInstance
        .get(`/pk_from_code?code${code}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    getPkFromUrl: (url: string) =>
      axiosInstance
        .get(`/pk_from_url?url${url}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    mediaInfo: (params: PostMediaInfo) =>
      axiosInstance
        .post("/info", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    userMedias: (params: UserMedias) =>
      axiosInstance
        .post("/user_medias", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    delete: (params: DeleteMedia) =>
      axiosInstance
        .post("/delete", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    edit: (params: EditMedia) =>
      axiosInstance
        .post("/edit", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    userMedia: (params: UserMedias): Promise<InstagramUser> =>
      axiosInstance
        .post("/user", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    oembed: (params: Oembed) =>
      axiosInstance
        .post("/user", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    like: (params: LikeMedia): Promise<boolean> =>
      axiosInstance
        .post("/like", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    unlike: (params: UnlikeMedia): Promise<boolean> =>
      axiosInstance
        .post("/unlike", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    likers: (params: GetMediaLikers): Promise<InstagramUser[]> =>
      axiosInstance
        .post("/likers", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    archive: (params: ArchiveMedia): Promise<boolean> =>
      axiosInstance
        .post("/likers", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    unarchive: (params: UnArchiveMedia): Promise<boolean> =>
      axiosInstance
        .post("/likers", params)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
