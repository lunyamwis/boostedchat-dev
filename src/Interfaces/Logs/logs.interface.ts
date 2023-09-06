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
}
