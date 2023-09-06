import { useMutation, useQuery } from "@tanstack/react-query";
import { usePhotosApi } from "../../../../Apis/Instagram/Photos.api";
import { queryKeys } from "../../../../Constants/ApiConstants";
import { useVideosApi } from "../../../../Apis/Instagram/Video.api";
import { useStoriesApi } from "../../../../Apis/Instagram/Story.api";
import { useReelsApi } from "../../../../Apis/Instagram/Reels.api";
import {
  AddComment,
  GenerateComment,
  GetPhoto,
} from "../../../../Interfaces/Instagram/photo.interface";
import { GetVideo } from "../../../../Interfaces/Instagram/video.interface";
import { GetReel } from "../../../../Interfaces/Instagram/reel.interface";
import { useAuditLogsApi } from "../../../../Apis/Logs/Logs.api";
import {
  AuditChange,
  AuditLog,
} from "../../../../Interfaces/Logs/logs.interface";

export type MediaType = "photo" | "video" | "reel" | "story";

export const useGetMediaComments = (id: string, mediaType: MediaType) => {
  const { getComments: getPhotoComments } = usePhotosApi();
  const { getComments: getVideoComments } = useVideosApi();
  const { getComments: getStoryComments } = useStoriesApi();
  const { getComments: getReelComments } = useReelsApi();

  return useQuery(
    [queryKeys.instagram.photos.getComments, id],
    () => {
      if (mediaType === "photo") {
        return getPhotoComments(id);
      }
      if (mediaType === "video") {
        return getVideoComments(id);
      }
      if (mediaType === "story") {
        return getStoryComments(id);
      }
      return getReelComments(id);
    },
    {
      enabled: id !== "",
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      // refetchInterval: 12000,
      select: (data) => {
        return { ...data, comments: data.comments.reverse() };
      },
    }
  );
};

export const useGetMedia = (mediaType: MediaType) => {
  const { getAll: getPhotos } = usePhotosApi();
  const { getAll: getVideos } = useVideosApi();
  const { getAll: getReels } = useReelsApi();

  return useQuery<GetPhoto[] | GetVideo[] | GetReel[]>(
    [queryKeys.instagram.media.getAll, mediaType],
    () => {
      if (mediaType === "photo") {
        return getPhotos();
      }
      if (mediaType === "video") {
        return getVideos();
      }
      return getReels();
    }
  );
};

export const useGenerateMediaComment = (mediaType: MediaType) => {
  const { generateComment: generatePhotoComment } = usePhotosApi();
  const { generateComment: generateVideoComment } = useVideosApi();
  const { generateComment: generateReelComment } = useReelsApi();

  return useMutation((params: GenerateComment) => {
    if (mediaType === "photo") {
      return generatePhotoComment(params);
    }
    if (mediaType === "video") {
      return generateVideoComment(params);
    }
    return generateReelComment(params);
  });
};

export const useAddMediaComment = (mediaType: MediaType) => {
  const { addComment: addPhotoComment } = usePhotosApi();
  const { addComment: addVideoComment } = useVideosApi();
  const { addComment: addReelComment } = useReelsApi();

  return useMutation((params: AddComment) => {
    if (mediaType === "photo") {
      return addPhotoComment(params);
    }
    if (mediaType === "video") {
      return addVideoComment(params);
    }
    return addReelComment(params);
  });
};

export const useGetAuditLogs = () => {
  const { getAll } = useAuditLogsApi();

  return useQuery([queryKeys.auditLogs.getAll], () => getAll(), {
    select: (data) => {
      const mData: AuditLog[] = [];
      for (let i = data.length - 1; i >= 0; i--) {
        const parsedAction: AuditChange = JSON.parse(data[i].changes);
        if (parsedAction["status"]) {
          mData.push(data[i]);
        }
      }
      return mData;
    },
  });
};
