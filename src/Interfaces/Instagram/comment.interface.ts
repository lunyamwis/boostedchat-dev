interface CommentPrimary {
  text: string;
  comment_id: string;
}

export interface CreateComment extends CommentPrimary {}

export interface GetComment extends CommentPrimary {}
