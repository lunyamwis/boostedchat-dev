import { handleRestError, handleRestResponse } from "../response";
import { useAPIGlobalAxios } from "../../Hooks/useAxios";
import { AccountsPerStage } from "../../Interfaces/Instagram/dashboard.interface";

export const useDashboardApi = () => {
  const axiosInstance = useAPIGlobalAxios("instagram/dm");

  return {
    getAccountsPerStage: (): Promise<AccountsPerStage[]> =>
      axiosInstance
        .get("/response-rate")
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
