interface AccountPrimary {
  igname: string;
  email: string;
  phone_number: string;
}

export interface CreateAccount extends AccountPrimary {}

export interface GetAccount extends AccountPrimary {}
