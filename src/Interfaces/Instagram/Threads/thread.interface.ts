import { GetAccount } from "../account.interface";

export interface Thread {
  id: string;
  account: string | GetAccount;
  thread_id: string;
}

export interface GetThread extends Thread {
  account_id: string;
  assigned_to: "Human" | "Robot";
  username: string;
  unread_message_count: number;
  last_message_content: string;
  last_message_at: string;
  stage: number;
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

export interface GetThreadMessage {
  sent_by: "Client" | "Robot";
  content: string;
  sent_on: string;
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

export interface SendDirectMessageManually {
  id: string;
  data: {
    assigned_to: "Robot" | "Human";
    message: string;
  };
}

export interface AssignOperator {
  threadId: string;
  data: {
    assigned_to: "Robot" | "Human";
  };
}
