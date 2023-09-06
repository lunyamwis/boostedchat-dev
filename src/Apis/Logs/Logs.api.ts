import { handleRestError, handleRestResponse } from "../response";
import { useGlobalAxios } from "../../Hooks/useAxios";
import { AuditLog } from "../../Interfaces/Logs/logs.interface";

export const useAuditLogsApi = () => {
  const axiosInstance = useGlobalAxios("logs");

  return {
    getAll: (): Promise<AuditLog[]> =>
      axiosInstance
        .get("/entries")
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
