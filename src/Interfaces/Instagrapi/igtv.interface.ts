import {
  Hashtag,
  Link,
  Location,
  Mention,
  SponsorTag,
  Sticker,
} from "./common.interface";
import { InstagramUser } from "./user.interface";

export interface UploadIgTvResult {
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

export interface DownloadIgTv {
  sessionid: string;
  media_pk: string;
  folder?: string;
  returnFile?: boolean;
}

export interface DownloadIgTvByUrl {
  sessionid: string;
  url: string;
  folder?: string;
  returnFile?: boolean;
}

export interface UploadIgTv {
  sessionid: string;
  file: string;
  caption: string;
  title: string;
  thumbnail?: boolean;
  usertags?: string[];
  location?: object;
}

export interface UploadIgTvByUrl {
  sessionid: string;
  url: string;
  caption: string;
  title: string;
  thumbnail?: boolean;
  usertags?: string[];
  location?: object;
}
