interface CommentPrimary {
  text: string;
  comment_id: string;
}

export interface CreateComment extends CommentPrimary {}

export interface GetComment extends CommentPrimary {}

export type MediaCommentResponse = {
  comments: MediaComment[];
  length: number;
};

export type MediaComment = [
  ["pk", string],
  ["text", string],
  [
    "user",
    [
      ["pk", string],
      ["username", string],
      ["full_name", string],
      ["profile_pic_url", string],
      ["profile_pic_url_hd", null | string],
      ["is_private", boolean],
      ["stories", []]
    ]
  ],
  ["created_at_utc", string],
  ["content_type", string],
  ["status", string],
  ["has_liked", boolean],
  ["like_count", number]
];
