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
  baseURL: `${API_URL}/auth`,
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
  register: (
    data: RegisterParams
  ): Promise<{
    access_token: string;
    refresh_token: string;
    id_token: string;
  }> =>
    axiosInstance
      .post("/register", data)
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
