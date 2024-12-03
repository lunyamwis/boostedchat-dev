import { useAPIGlobalAxios } from "@/Hooks/useAxios";
import { handleRestError, handleRestResponse } from "../response";
import { GetRestartMqtt } from "@/Interfaces/Services/mqtt.interface";

export const useMqttApi = () => {
  const axiosInstance = useAPIGlobalAxios("serviceManager/restart-container");
  const axiosResetInstance = useAPIGlobalAxios("serviceManager/reset-conversations");

  return {
    restart: (params: GetRestartMqtt) =>
      axiosInstance
        .post("", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    reset: () =>
      axiosResetInstance
        .post("")
        .then(handleRestResponse)
        .catch(handleRestError),

  };
};
