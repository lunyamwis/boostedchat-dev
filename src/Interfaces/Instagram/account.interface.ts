interface AccountPrimary {
  igname: string;
  email: null | string;
  outsourced_id: null | string;
  phone_number: null | string;
  profile_url: null | string;
  status_id: null | string;
  full_name: string | null;
}

export type CreateAccount = Pick<
  AccountPrimary,
  "email" | "igname" | "phone_number" | "full_name"
>;

export type UpdateAccount = Pick<
  AccountPrimary,
  "igname" | "full_name" | "status_id"
>;

export type UpdateAccountParams = {
  id: string;
  data: UpdateAccount;
};

export interface GetAccount extends AccountPrimary {
  id: string;
  assigned_to: "Robot" | "Human";
  status: AccountStatus | null;
  outsourced_data: OutsourcedData[];
}

export interface GetSingleAccount extends AccountPrimary {
  id: string;
  assigned_to: "Robot" | "Human";
  status: AccountStatus;
  outsourced: {
    pk: string;
    zip: string;
    city_id: string;
    category: string;
    latitude: 0.0;
    username: string;
    biography: string;
    city_name: string;
    full_name: string;
    longitude: 0.0;
    is_private: boolean;
    is_business: boolean;
    is_verified: boolean;
    media_count: number;
    account_type: number;
    external_url: "https://linktr.ee/salonsdirect";
    public_email: "sales@salonsdirect.co.uk";
    category_name: null;
    address_street: "";
    follower_count: number;
    following_count: number;
    profile_pic_url: string;
    profile_pic_url_hd: string;
    public_phone_number: string;
    contact_phone_number: string;
    instagram_location_id: string;
    business_category_name: null;
    business_contact_method: string;
    public_phone_country_code: string;
    interop_messaging_user_fbid: null;
  };
}

export enum AccountStatus {
  onHold = "on_hold",
  sentCompliment = "sent_compliment",
  sentFirstQuestion = "sent_first_question",
}

export interface FullAccount {
  created_at: string;
  deleted_at: null;
  email: string | null;
  gmaps_business_name: string | null;
  id: string;
  igname: string;
  is_from_styleseat: boolean;
  phone_number: null | string;
  profile_url: null | string;
  review: null | string;
  updated_at: string;
}

export interface OutsourcedData {
  deleted_at: null;
  id: string;
  created_at: string;
  updated_at: string;
  source: string;
  results: {
    pk: string;
    zip: null;
    city_id: null;
    category: null;
    latitude: null;
    username: string;
    biography: string;
    city_name: null;
    full_name: string;
    longitude: null;
    is_private: boolean;
    is_business: true;
    is_verified: false;
    media_count: number;
    account_type: null;
    external_url: null;
    public_email: null;
    category_name: string;
    address_street: null;
    follower_count: number;
    following_count: number;
    profile_pic_url: string;
    profile_pic_url_hd: string;
    public_phone_number: null;
    contact_phone_number: null;
    instagram_location_id: null;
    business_category_name: string;
    business_contact_method: string;
    public_phone_country_code: null;
    interop_messaging_user_fbid: null;
  };
  account_id: string;
}
