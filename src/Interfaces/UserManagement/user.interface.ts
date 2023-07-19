export type User = {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
};

export type GetUser = {
  created_at: string;
  created_by: string;
  created_date: string;
  date_joined: string;
  deleted_at: null | string;
  email: string;
  first_name: string;
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: null;
  last_name: string;
  modified_by: string;
  modified_date: string;
  password: string;
  role_id: null | string;
  uid: string;
  updated_at: string;
  username: null;
};
