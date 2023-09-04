import axios from "axios";
import { useAuth } from "../Context/AuthContext/AuthProvider";
import { API_URL } from "../Constants/ApiConstants";
import { useInstagrapiAuth } from "../Context/AuthContext/InstagrapiProvider";

export const useGlobalAxios = (url: string) => {
  const { accessToken } = useAuth();
  const axiosInstance = axios.create({
    baseURL: `${API_URL}/${url}/`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return axiosInstance;
};

export const useInstagrapiAxios = (url: string) => {
  const { sessionId } = useInstagrapiAuth();
  const axiosInstance = axios.create({
    baseURL: `${API_URL}/${url}/`,
    headers: { Authorization: `Bearer ${sessionId}` },
  });
  return axiosInstance;
};
