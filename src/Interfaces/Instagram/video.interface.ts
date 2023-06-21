interface VideoPrimary {
  link: string;
  name: string;
  video_id: string;
}

export interface CreateVideo extends VideoPrimary {}

export interface GetVideo extends VideoPrimary {
  id: string;
}
