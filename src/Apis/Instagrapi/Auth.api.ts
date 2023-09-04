import { handleRestError, handleRestResponse } from "../response";
import { useInstagrapiAxios } from "../../Hooks/useAxios";
import {
  Login,
  Relogin,
  SetSettings,
} from "../../Interfaces/Instagrapi/auth.interface";

export const useInstagrapiAuth = () => {
  const axiosInstance = useInstagrapiAxios("auth");

  return {
    login: (params: Login) =>
      axiosInstance
        .post("/login", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    relogin: (params: Relogin) =>
      axiosInstance
        .post("/relogin", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    setSettings: (params: SetSettings) =>
      axiosInstance
        .post("/settings/set", params)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
