interface ScriptRole {
  id: string;
  name: string;
  description: string;
  tone_of_voice: string;
}

export type CreateScriptRole = Omit<ScriptRole, "id">;

export type GetScriptRole = ScriptRole;

export type UpdateScriptRoleParams = {
  id: string;
  data: CreateScriptRole;
};
