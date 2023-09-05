export interface InstagramUser {
  pk: string;
  username: string;
  full_name: string;
  profile_pic_url: string;
  profile_pic_url_hd: string;
  is_private: boolean;
  stories: string[];
}

interface BaseGetParams {
  sessionid: string;
  user_id: string;
}

export interface BaseGetParamsWithCache extends BaseGetParams {
  use_cache?: boolean;
}

export interface GetUserFollowers extends BaseGetParams {
  use_cache?: boolean;
  amount?: number;
}

export interface UserFollower {
  additionalProp1: InstagramUser;
  additionalProp2: InstagramUser;
  additionalProp3: InstagramUser;
}

export interface GetUserInfo extends BaseGetParams {
  use_cache?: boolean;
}

export interface UserInfo {
  pk: string;
  username: string;
  full_name: string;
  is_private: boolean;
  profile_pic_url: string;
  profile_pic_url_hd: string;
  is_verified: boolean;
  media_count: number;
  follower_count: number;
  following_count: number;
  biography: string;
  external_url: string;
  account_type: number;
  is_business: boolean;
  public_email: string;
  contact_phone_number: string;
  public_phone_country_code: string;
  public_phone_number: string;
  business_contact_method: string;
  business_category_name: string;
  category_name: string;
  category: string;
  address_street: string;
  city_id: string;
  city_name: string;
  latitude: number;
  longitude: number;
  zip: string;
  instagram_location_id: string;
  interop_messaging_user_fbid: string;
}

export type GetUserInfoByUsername = BaseGetParamsWithCache;

export interface GetIdFromUsername {
  sessionid: string;
  username: string;
}

export interface GetByUserId {
  sessionid: string;
  user_id: string;
}

export interface GetByUserIdWithRevert extends GetByUserId {
  revert: boolean;
}
