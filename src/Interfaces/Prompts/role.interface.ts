interface Role {
  id: string;
  name: string;
  description: string;
}

export type CreateRole = Omit<Role, "id">;

export type GetRole = Role;

export type UpdateRoleParams = {
  id: string;
  data: CreateRole;
};
