import axios from "axios";
import { useAuth } from "../Context/AuthContext/AuthProvider";
import { API_URL, PROMPT_URL } from "../Constants/ApiConstants";

export const useAPIGlobalAxios = (url: string) => {
  const { accessToken } = useAuth();
  const axiosInstance = axios.create({
    baseURL: `${API_URL}/${url}/`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return axiosInstance;
};

export const usePromptGlobalAxios = (url: string) => {
  const { accessToken } = useAuth();
  const axiosInstance = axios.create({
    baseURL: `${PROMPT_URL}/${url}/`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return axiosInstance;
};
