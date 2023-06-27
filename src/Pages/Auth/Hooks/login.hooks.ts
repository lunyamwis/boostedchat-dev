import { useMutation } from "@tanstack/react-query";
import { ILogIn } from "../../../Interfaces/UserManagement/auth.interface";
import { AuthAPI } from "../../../Apis/UserManagement/Auth.api";

const useLogin = () => {
  return useMutation((params: ILogIn) => AuthAPI.login(params), {});
};

export { useLogin };
