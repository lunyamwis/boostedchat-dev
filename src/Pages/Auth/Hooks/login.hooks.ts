import { useMutation } from "@tanstack/react-query";
import { ILogIn } from "../../../Interfaces/UserManagement/auth.interface";
import { AuthAPI } from "../../../Apis/UserManagement/Auth.api";

const useLogin = () => {
  return useMutation({ mutationFn: (params: ILogIn) => AuthAPI.login(params) });
};

const useGoogleLogin = () => {
  return useMutation({ mutationFn: () => AuthAPI.googleLogin() });
};

const useFacebookLogin = () => {
  return useMutation({ mutationFn: () => AuthAPI.facebookLogin() });
};

const useTwitterLogin = () => {
  return useMutation({ mutationFn: () => AuthAPI.twitterLogin() });
};

export { useFacebookLogin, useGoogleLogin, useLogin, useTwitterLogin };
