interface StoryPrimary {
  link: string;
}

export interface CreateStory extends StoryPrimary {}

export interface GetStory extends StoryPrimary {
  id: string;
}
