export const API_URL = import.meta.env.PROD
  ? "https://app.boostedchat.com/api/v1"
  : "http://localhost:8000/api/v1";

export const queryKeys = {
  instagram: {
    accounts: {
      getAccounts: "get-all-accounts",
      getById: "get-account-by-id",
    },
    comments: {
      getComments: "get-all-comments",
      getById: "get-comment-by-id",
    },
    hashtags: {
      getHashtags: "get-all-hashtags",
      getById: "get-hashtag-by-id",
    },
    photos: {
      getPhotos: "get-all-photos",
      getById: "get-photo-by-id",
    },
    reels: {
      getReels: "get-all-reels",
      getById: "get-reel-by-id",
    },
    stories: {
      getStories: "get-all-stories",
      getById: "get-story-by-id",
    },
    videos: {
      getVideos: "get-all-videos",
      getById: "get-video-by-id",
    },
  },
};
