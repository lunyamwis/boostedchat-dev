interface AccountPrimary {
  igname: string;
  email: null | string;
  outsourced_id: null | string;
  phone_number: null | string;
  profile_url: null | string;
  status_id: null | string;
}

export interface CreateAccount extends AccountPrimary {}

export interface GetAccount extends AccountPrimary {
  id: string;
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
