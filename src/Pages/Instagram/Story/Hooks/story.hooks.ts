import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import { useStoriesApi } from "../../../../Apis/Instagram/Story.api";
import { CreateStory } from "../../../../Interfaces/Instagram/story.interface";

export const useStorysWrapperApi = () => {
  const { getAll, create } = useStoriesApi();
  const storiesQR = useQuery([queryKeys.instagram.stories.getStories], () =>
    getAll()
  );
  const createStory = useMutation((params: CreateStory) => create(params));

  return {
    storiesQR,
    createStory,
  };
};
