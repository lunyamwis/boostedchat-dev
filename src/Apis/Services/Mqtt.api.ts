import { useAPIGlobalAxios } from "@/Hooks/useAxios";
import { handleRestError, handleRestResponse } from "../response";
import { GetRestartMqtt } from "@/Interfaces/Services/mqtt.interface";

export const useMqttApi = () => {
  const axiosInstance = useAPIGlobalAxios("serviceManager/restart-container");

  return {
    restart: (params: GetRestartMqtt) =>
      axiosInstance
        .post("", params)
        .then(handleRestResponse)
        .catch(handleRestError)
  };
};
