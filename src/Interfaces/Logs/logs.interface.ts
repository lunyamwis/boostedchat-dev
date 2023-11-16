export interface AuditLog {
  object_pk: string;
  timestamp: string;
  actor: " " | string;
  actor_email: string;
  action: number;
  changes: string;
}

export interface AuditChange {
  [key: string]: string[];
}

export enum StatusChange {
  firstCompliment = "1 - sent_first_compliment",
  none = "None",
  sentCompliment = "1 - sent_compliment",
  sentFirstQuestion = "2 - sent_first_question",
  overcomeObjections = "3 - overcome_objections",
  overcome = "3 - overcome",
  confirmedProblem = "2 - confirmed_problem",
}
