import axios from "axios";
import { useAuth } from "../Context/AuthContext/AuthProvider";
import {
  API_URL,
  LEADS_GENERATION_URL,
  PROMPT_URL,
} from "../Constants/ApiConstants";

export const useAPIGlobalAxios = (url: string) => {
  // const { accessToken } = useAuth();
  const axiosInstance = axios.create({
    baseURL: `${API_URL}/${url}/`,
    // headers: { Authorization: `Bearer ${accessToken}` },
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

export const useLeadsGenerationGlobalAxios = (url: string) => {
  // const { accessToken } = useAuth();
  const axiosInstance = axios.create({
    baseURL: `${LEADS_GENERATION_URL}/${url}/`,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    }
    // headers: { Authorization: `Bearer ${accessToken}` },
  });
  return axiosInstance;
};
