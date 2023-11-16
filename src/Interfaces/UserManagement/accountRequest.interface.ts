import { User } from "./user.interface";

export interface GetAccountRequest {
  id: string;
  requested_on: string;
  approve_rejected_by: User | null;
  approve_rejected_on: string | null;
  rejection_reason: string | null;
  user_id: User;
}

export interface ApproveAccountRequest {
  request_id: string;
  data: {
    approved_by: string;
  };
}

export interface RejectAccountRequest {
  request_id: string;
  data: {
    rejected_by: string;
    rejection_reason: string;
  };
}

export interface ActivateAccount {
  userId: string;
  data: {
    old_password: string;
    current_password: string;
  };
}
