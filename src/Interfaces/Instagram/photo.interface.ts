interface PhotoPrimary {
  link: string;
  name: string;
  photo_id: string;
}

export interface CreatePhoto extends PhotoPrimary {}

export interface GetPhoto extends PhotoPrimary {
  id: string;
}

export interface AddComment {
  id: string;
  data:
    | {
        approve: true;
        assign_robot: boolean;
        generated_response: string;
      }
    | {
        approve: false;
        assign_robot: boolean;
        human_response: string;
      };
}

export interface GenerateComment {
  id: string;
  data: {
    text: string;
  };
}
export interface GeneratedComment {
  status: number;
  generated_comment: string;
  text: string;
  photo: string;
  success: boolean;
}

export interface AddedCommentRespose {
  status: number;
  message: string;
}
