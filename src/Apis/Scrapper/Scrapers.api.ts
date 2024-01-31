import { useLeadsGenerationGlobalAxios } from "@/Hooks/useAxios";
import { handleRestError, handleRestResponse } from "../response";
import { SetupScraper } from "@/Interfaces/LeadsGeneration/scraper-setup.interface";

export const useSetupScraperApi = () => {
  const axiosInstance = useLeadsGenerationGlobalAxios("instagram/setup");

  return {
    setup: (params: SetupScraper) =>
      axiosInstance
        .post("/", params)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
