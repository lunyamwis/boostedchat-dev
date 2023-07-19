import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../Constants/ApiConstants";
import { useUsersApi } from "../../../Apis/UserManagement/Users.api";
import { RegisterParams } from "../../../Interfaces/UserManagement/auth.interface";
import { AuthAPI } from "../../../Apis/UserManagement/Auth.api";

export const useGetUserAccounts = () => {
  const { getAll } = useUsersApi();
  return useQuery([queryKeys.users.getAll], () => getAll());
};

export const useRegisterUser = () => {
  return useMutation((params: RegisterParams) => AuthAPI.register(params));
};
