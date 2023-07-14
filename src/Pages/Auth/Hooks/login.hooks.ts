import { useMutation } from "@tanstack/react-query";
import { ILogIn } from "../../../Interfaces/UserManagement/auth.interface";
import { AuthAPI } from "../../../Apis/UserManagement/Auth.api";

const useLogin = () => {
  return useMutation((params: ILogIn) => AuthAPI.login(params), {});
};

const useGoogleLogin = () => {
  return useMutation(() => AuthAPI.googleLogin(), {});
};

const useFacebookLogin = () => {
  return useMutation(() => AuthAPI.facebookLogin(), {});
};

const useTwitterLogin = () => {
  return useMutation(() => AuthAPI.twitterLogin(), {});
};

export { useFacebookLogin, useGoogleLogin, useLogin, useTwitterLogin };
