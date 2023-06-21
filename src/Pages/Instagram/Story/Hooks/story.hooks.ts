import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import { useStoriesApi } from "../../../../Apis/Instagram/Story.api";
import { CreateStory } from "../../../../Interfaces/Instagram/story.interface";

export const useStorysWrapperApi = () => {
  const { create } = useStoriesApi();
  const createStory = useMutation((params: CreateStory) => create(params));

  return {
    createStory,
  };
};

export const useGetStories = () => {
  const { getAll } = useStoriesApi();
  return useQuery([queryKeys.instagram.stories.getStories], () => getAll());
};

export const useGetStoryLikers = (id: string) => {
  const { getViewers } = useStoriesApi();
  return useQuery(
    [queryKeys.instagram.stories.getViewers, id],
    () => getViewers(id),
    {
      enabled: id !== "",
      select: (data) => {
        return Object.values(data).map((account) => {
          return {
            username: account[1][1],
            full_name: account[2][1],
            prof_pic: account[3][1],
          };
        });
      },
    }
  );
};
