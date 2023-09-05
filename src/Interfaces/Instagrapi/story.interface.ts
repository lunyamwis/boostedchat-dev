export interface GetBaseStoryParams {
  session_id: string;
  story_pk: number;
}

export interface GetStoryParamsWithAmount extends GetBaseStoryParams {
  amount: number;
}

export interface GetStoryParamsWithCache extends GetBaseStoryParams {
  use_cache?: boolean;
}

export interface GetStoryParamsWithRevert extends GetBaseStoryParams {
  revert?: boolean;
}

export interface GetStoryParamsWithFile extends GetBaseStoryParams {
  filename?: string;
  folder?: string;
  returnFile?: string;
}

export interface PostMarkAsSeenStory extends GetBaseStoryParams {
  skipped_story_pks?: string[];
}

export interface DownloadStoryByUrl {
  session_id: string;
  url: string;
  filename?: string;
  folder?: string;
  returnFile?: string;
}
