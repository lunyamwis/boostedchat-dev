import {
  Hashtag,
  Link,
  Location,
  Mention,
  SponsorTag,
  Sticker,
} from "./common.interface";
import { InstagramUser } from "./user.interface";

export interface UploadAlbumResult {
  pk: string;
  id: string;
  code: string;
  taken_at: string;
  media_type: number;
  product_type: string;
  thumbnail_url: string;
  user: InstagramUser;
  video_url: string;
  video_duration: number;
  sponsor_tags: SponsorTag[];
  mentions: Mention[];
  links: Link[];
  hashtags: Hashtag[];
  locations: Location[];
  stickers: Sticker[];
  medias: [];
}

export interface DownloadAlbum {
  sessionid: string;
  media_pk: string;
  folder?: string;
}

export interface DownloadAlbumByUrls {
  sessionid: string;
  urls: string;
  folder?: string;
}

export interface UploadAlbum {
  sessionid: string;
  file: string;
  caption: string;
  thumbnail?: boolean;
  usertags?: string[];
  location?: object;
}
