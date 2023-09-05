import {
  Hashtag,
  Link,
  Location,
  Mention,
  SponsorTag,
  Sticker,
  UserTag,
} from "./common.interface";
import { InstagramUser } from "./user.interface";

export interface UploadPhotoToStory {
  sessionid: string;
  file: string;
  as_video?: boolean;
  caption?: string;
  mentions?: string[];
  locations?: string[];
  links?: string[];
  hashtags?: string[];
  stickers?: string[];
}

export interface UploadPhotoToStoryByUrl {
  sessionid: string;
  url: string;
  as_video?: boolean;
  caption?: string;
  mentions?: string[];
  locations?: string[];
  links?: string[];
  hashtags?: string[];
  stickers?: string[];
}

export interface UploadPhotoToStoryResult {
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

export interface DownloadPhoto {
  sessionid: string;
  media_pk: string;
  folder?: string;
  returnFile?: boolean;
}

export interface DownloadPhotoByUrl {
  sessionid: string;
  url: string;
  folder?: string;
  returnFile?: boolean;
}

export interface UploadPhoto {
  sessionid: string;
  file: string;
  caption: string;
  thumbnail?: boolean;
  usertags?: string[];
  location?: object;
}

export interface UploadPhotoByUrl {
  sessionid: string;
  url: string;
  caption: string;
  thumbnail?: boolean;
  usertags?: string[];
  location?: object;
}

export interface UploadPhotoResult {
  pk: string;
  id: string;
  code: string;
  taken_at: string;
  media_type: number;
  image_versions2: number;
  product_type: string;
  thumbnail_url: string;
  location: Location;
  user: InstagramUser;
  comment_count: number;
  comments_disabled: boolean;
  commenting_disabled_for_viewer: boolean;
  like_count: number;
  play_count: number;
  has_liked: boolean;
  caption_text: string;
  accessibility_caption: string;
  usertags: UserTag[];
  sponsor_tags: SponsorTag[];
  video_url: string;
  view_count: number;
  video_duration: number;
  title: string;
  resources: [];
  clips_metadata: object;
}
