import { MantineColor } from "@mantine/core";

export enum httpErrorTypes {
  unknown = "UNKNOWN",
  network = "NETWORK", //
  information = "INFORMATION", // 100
  success = "SUCCESS", // 200
  redirection = "REDIRECTION", // 300
  client = "CLIENT", // 400
  server = "SERVER", // 500
}

export interface axiosError {
  statusCode: number;
  statusMessage: string;
  errorType: httpErrorTypes | undefined;
  data: any;
}

export enum EDateFormats {
  shortDateWithTime = "dd/MMM/yyyy h:mm aaa",
  shortDateWithoutTime = "dd/MMM/yyyy",
  time = "h:mm aaa",
}

export interface IApiToken {
  token: string;
}

export interface IActor {
  first_name: string;
  last_name: string;
  id: string;
}

export interface IAuditFields {
  created_by: IActor;
  updated_by: IActor;
  deleted_by: IActor | null;
  created_on: string;
  updated_on: string;
  deleted_on: string;
}

export type THistory = {
  id: string;
  email?: string;
  description: string;
  created_by: IActor;
  created_on: string;
}[];
export type EnumCreator<T> = T[keyof T];

export interface LoginState {
  color: MantineColor;
  message: string;
  title: string;
}

export interface Lead {
  [key: string]: [
    ["pk", string],
    ["username", string],
    ["full_name", string],
    ["prof_pic", string],
  ];
}

export interface PaginatedQuery<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
