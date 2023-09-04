import { InstagramUser } from "./user.interface";

export interface Mention {
  user: InstagramUser;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Link {
  webUri: string;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  rotation: number;
}

export interface Hashtag {
  hashtag: {
    id: string;
    name: string;
    media_count: number;
    profile_pic_url: string;
  };
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Location {
  location: {
    pk: number;
    name: string;
    phone: string;
    website: string;
    category: string;
    hours: object;
    address: string;
    city: string;
    zip: string;
    lng: number;
    lat: number;
    external_id: number;
    external_id_source: string;
  };
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Sticker {
  id: string;
  type: string;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  rotation: number;
  story_link: {
    url: string;
    link_title: string;
    link_type: string;
    display_url: string;
  };
  extra: object;
}

export interface SponsorTag {
  pk: string;
  username: string;
  full_name: string;
  profile_pic_url: string;
  profile_pic_url_hd: string;
  is_private: true;
  stories: [];
}

export interface UserTag {
  user: InstagramUser;
  x: number;
  y: number;
}

export interface UploadResult {
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
