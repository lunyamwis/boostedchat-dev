import { FullAccount } from "../Instagram/account.interface";
import { GetUser, User } from "./user.interface";

export interface CreateSalesRep {
  user: string;
  ig_username: string,
  ig_password: string,
  instagram: [],
  app_version: string,
  android_version: number,
  android_release: string,
  dpi: string,
  resolution: string,
  manufacturer: string,
  device: string,
  model: string,
  cpu: string,
  version_code: string,
}

export interface RegisterDeviceParams {
  user: string, 
  ig_username: string,
  ig_password: string,
  instagram: [],
  app_version: string,
  android_version: number,
  android_release: string,
  dpi: string,
  resolution: string,
  manufacturer: string,
  device: string,
  model: string,
  cpu: string,
  version_code: string,
}

export interface GetSalesRep {
  id: string;
  user: null | User;
  instagram: unknown[];
}

export interface GetSalesRep {
  id: string;
  ig_username: string;
}

export interface GetSalesRepBulk {
  info: SalesRepObj[];
  status_code: number;
}

export interface SalesRepObj {
  user: GetUser[];
  instagram: FullAccount[];
}
