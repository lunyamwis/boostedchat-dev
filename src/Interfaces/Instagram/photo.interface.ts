interface PhotoPrimary {
  link: string;
  name: string;
  photo_id: string;
}

export interface CreatePhoto extends PhotoPrimary {}

export interface GetPhoto extends PhotoPrimary {}
