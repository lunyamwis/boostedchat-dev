import { FullAccount } from "../Instagram/account.interface";

export interface CreateLead {
  instagram: string;
}

export interface GetLead {
  instagram: string;
}

export interface GetLeadsBulk {
  instagram: Array<FullAccount[]>;
}
