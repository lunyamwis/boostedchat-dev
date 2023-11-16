import axios from "axios";
import {
  ILogIn,
  IResetPassword,
  IUpdatePassword,
  RegisterParams,
} from "../../Interfaces/UserManagement/auth.interface";
import { handleRestError, handleRestResponse } from "../response";
import { API_URL } from "../../Constants/ApiConstants";

const axiosInstance = axios.create({
  baseURL: `${API_URL}/authentication`,
});

export const AuthAPI = {
  login: (
    data: ILogIn
  ): Promise<{
    access: string;
    refresh: string;
    authenticatedUser: {
      email: string;
      role: string;
    };
  }> =>
    axiosInstance
      .post("/login", data)
      .then(handleRestResponse)
      .catch(handleRestError),
  googleLogin: () =>
    axiosInstance
      .post("/auth/google/")
      .then(handleRestResponse)
      .catch(handleRestError),
  facebookLogin: () =>
    axiosInstance
      .post("/auth/facebook/connect/")
      .then(handleRestResponse)
      .catch(handleRestError),
  twitterLogin: () =>
    axiosInstance
      .post("/auth/twitter/connect/")
      .then(handleRestResponse)
      .catch(handleRestError),
  register: (data: RegisterParams) =>
    axiosInstance
      .post("/account-request/create/", data)
      .then(handleRestResponse)
      .catch(handleRestError),
  refresh: (
    userId: string,
    token: string
  ): Promise<{ access_token: string; refresh_token: string }> =>
    axiosInstance
      .post(`/refresh/${userId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(handleRestResponse)
      .catch(handleRestError),
  forgotPassword: (data: { email: string }) =>
    axiosInstance
      .post("/forgot-password", data)
      .then(handleRestResponse)
      .catch(handleRestError),
  resetPassword: (data: IResetPassword) =>
    axiosInstance
      .post("/reset-password", data)
      .then(handleRestResponse)
      .catch(handleRestError),
  updatePassword: (params: IUpdatePassword) =>
    axiosInstance
      .patch("/update-password", params.data, {
        headers: { Authorization: `Bearer ${params.token}` },
      })
      .then(handleRestResponse)
      .catch(handleRestError),
};
