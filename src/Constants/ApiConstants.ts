export const API_URL = import.meta.env.PROD
  ? "http://api.boostedchat.com"
  : "http://localhost:8001/api/v1";

export const queryKeys = {
  users: {
    getAll: "get-all-users",
  },
  salesReps: {
    getAll: "get-all-sales-representatives",
  },
  leads: {
    getAll: "get-all-leads",
  },
  instagram: {
    media: {
      getAll: "get-all-media",
      getComments: "media-comments",
    },
    accounts: {
      getAccounts: "get-all-accounts",
      getById: "get-account-by-id",
      getFollowers: "get-account-followers",
      potentiaToBuy: "potential-to-buy",
      potentialToPromote: "potential-to-promote",
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
      getLikers: "get-photo-likers",
      getComments: "get-comments",
    },
    reels: {
      getReels: "get-all-reels",
      getById: "get-reel-by-id",
      getLikers: "get-reel-likers",
    },
    stories: {
      getStories: "get-all-stories",
      getById: "get-story-by-id",
      getViewers: "get-story-viewers",
    },
    videos: {
      getVideos: "get-all-videos",
      getById: "get-video-by-id",
      getLikers: "get-video-likers",
    },
  },
  auditLogs: {
    getAll: "all-audit-logs",
  },
};
