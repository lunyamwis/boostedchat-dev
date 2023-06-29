import { handleRestError, handleRestResponse } from "../response";
import { useGlobalAxios } from "../../Hooks/useAxios";
import {
  GoogleMapsProfileExtractInput,
  StyleseatProfileExtractInput,
} from "../../Interfaces/Scrapper/scrapper.interface";

export const useProfileExtractorApi = () => {
  const axiosInstance = useGlobalAxios("scrapper/profiles/");

  return {
    extractGoogleMapsProfiles: (params: GoogleMapsProfileExtractInput) => {
      console.log(params);
      return axiosInstance
        .get("/gmaps/")
        .then(handleRestResponse)
        .catch(handleRestError);
    },
    extractStyleseatProfiles: (params: StyleseatProfileExtractInput) =>
      axiosInstance
        .post("/styleseat/", params)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};
