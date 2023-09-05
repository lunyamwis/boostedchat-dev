export interface PostMediaInfo {
  sessionid: string;
  pk: string;
}

export interface UserMedias {
  sessionid: string;
  user_id: string;
  amount?: number;
}

export interface DeleteMedia {
  sessionid: string;
  media_id: string;
}

export interface EditMedia {
  sessionid: string;
  media_id: string;
  caption: string;
  title: string;
  usertags: string[];
  location: object;
}

export interface GetMediaUser {
  sessionid: string;
  media_pk: string;
}

export interface Oembed {
  sessionid: string;
  url: string;
}

export interface LikeMedia {
  sessionid: string;
  media_id: string;
  revert?: boolean;
}

export interface UnlikeMedia {
  sessionid: string;
  media_id: string;
}

export interface SeenMedia {
  sessionid: string;
  media_ids: string;
  skipped_medias_ids: string[];
}

export interface GetMediaLikers {
  sessionid: string;
  media_id: string;
}

export interface ArchiveMedia {
  sessionid: string;
  media_id: string;
  revert?: boolean;
}

export interface UnArchiveMedia {
  sessionid: string;
  media_id: string;
  revert?: boolean;
}
