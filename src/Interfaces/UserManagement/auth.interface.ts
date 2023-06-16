import { IApiToken } from "../general.interface";

export interface ILogIn {
  email: string;
  password: string;
}

export interface RegisterParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IResetPassword {
  token: string;
  new_password: string;
}

export interface ISetPassword {
  token: string;
  new_password: string;
}

export interface IUpdatePassword extends IApiToken {
  data: {
    old_password: string;
    new_password: string;
  };
}
