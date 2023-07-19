import { FullAccount } from "../Instagram/account.interface";
import { GetUser, User } from "./user.interface";

export interface CreateSalesRep {
  user: string;
}

export interface GetSalesRep {
  id: string;
  user: null | User;
  instagram: unknown[];
}

export interface GetSalesRepBulk {
  info: SalesRepObj[];
  status_code: number;
}

export interface SalesRepObj {
  user: GetUser[];
  instagram: FullAccount[];
}
