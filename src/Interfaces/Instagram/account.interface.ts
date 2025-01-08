interface AccountPrimary {
  id:string;
  igname: string;
  email: null | string;
  outsourced_id: null | string;
  phone_number: null | string;
  profile_url: null | string;
  status_id: null | string;
  full_name: string | null;
  notes: string | null;
}

export interface Stat {
  status_param: string | null;
  total_accounts: number | null;
  sales_qualified_to_committed_count: number,
  percentage_sales_qualified_to_committed: number,
  prequalified_to_sales_qualified_count: number,
  percentage_prequalified_to_sales_qualified: number,

}

export type CreateAccount = Pick<AccountPrimary, "igname" | "full_name">;

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
  // stage: number;
  stage: string;
  last_message_at: string;
  last_message_sent_at: string;
  full_name: string;
  last_message_sent_by: 'Robot' | 'Human';
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
    latitude: number;
    book_button: boolean;
    username: string;
    biography: string;
    city_name: string;
    full_name: string;
    longitude: number;
    is_private: boolean;
    is_business: boolean;
    is_verified: boolean;
    is_popular: boolean;
    is_posting_actively: boolean;
    media_count: number;
    account_type: number;
    external_url: string;
    public_email: string;
    category_name: null;
    address_street: "";
    follower_count: number;
    negative_keywords: string;
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

export interface MqttStatus {
  status: Number,
  mqtt_running: boolean;
  mqtt_connected: boolean;
  connected_accounts:[];
  success: boolean;
}
export interface GetSingleAccountWithThreadDetails extends AccountPrimary {
  account: GetSingleAccount,
  threads: [
    {
      id: string;
      messages: [
        {
          id: string;
          deleted_at: string | null;
          created_at: string; //"2024-10-07T12:54:37.586821Z",
          updated_at: string;//"2024-11-22T10:43:09.314789Z",
          content: string;
          sent_by: string;
          sent_on: string;//"2024-10-07T12:54:37.301523Z",
          content_type: string | null;
          content_link: string | null;
          content_data: string | null;
          thread_id: string;
        }
      ]
    }
  ]

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
    media_id: string;
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
