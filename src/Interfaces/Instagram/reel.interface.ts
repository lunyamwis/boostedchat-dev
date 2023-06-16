interface ReelPrimary {
  reel_id: string;
  name: string;
  link: string;
}

export interface CreateReel extends ReelPrimary {}

export interface GetReel extends ReelPrimary {}
