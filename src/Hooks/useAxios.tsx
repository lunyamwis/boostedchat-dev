import axios from "axios";
import { useAuth } from "../Context/AuthContext/AuthProvider";
import { API_URL } from "../Constants/ApiConstants";

export const useGlobalAxios = (url: string) => {
  const { accessToken } = useAuth();
  const axiosInstance = axios.create({
    baseURL: `${API_URL}/${url}/`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return axiosInstance;
};
