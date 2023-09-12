import { GetAccount } from "../account.interface";

export interface Thread {
  id: string;
  account: string | GetAccount;
  replied: boolean;
  replied_at: string | null;
  thread_id: string;
  username: string;
}

export interface GetThread extends Thread {
  acount: string;
  //
}

export interface CreateThreadParams extends Thread {
  account: string;
}

export interface GetDirectMessage {
  username: string;
  text: string;
  timestamp: string;
}

export interface GenerateResponseParams {
  id: string;
  data: {
    text: string;
  };
}

export interface GeneratedResponse {
  status: number;
  generated_comment: string | { error: string };
  text: string;
  success: boolean;
}
