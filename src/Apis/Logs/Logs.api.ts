import { handleRestError, handleRestResponse } from "../response";
import { useAPIGlobalAxios } from "../../Hooks/useAxios";
import { AuditLog } from "../../Interfaces/Logs/logs.interface";

export const useAuditLogsApi = () => {
  const axiosInstance = useAPIGlobalAxios("logs");

  return {
    getAll: (): Promise<AuditLog[]> =>
      axiosInstance
        .get("/entries")
        .then(handleRestResponse)
        .catch(handleRestError),
    getStatusChangesLogs: (accountId: string): Promise<AuditLog[]> =>
      axiosInstance
        .get(`/filter-by-status/${accountId}/`)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
