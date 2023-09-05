export interface Login {
  username: string;
  password: string;
}

export interface Relogin {
  sessionid: string;
}

export interface SetSettings {
  settings: string;
  sessionId: string;
}
