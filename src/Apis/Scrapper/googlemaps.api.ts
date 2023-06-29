import { handleRestError, handleRestResponse } from "../response";
import { useGlobalAxios } from "../../Hooks/useAxios";
import {
  GoogleMapsScrapperInput,
  GoogleMapsScrapperResult,
} from "../../Interfaces/Scrapper/scrapper.interface";

export const useGoogleMapsApi = () => {
  const axiosInstance = useGlobalAxios("scrapper/gmaps/");

  return {
    create: (
      params: GoogleMapsScrapperInput
    ): Promise<GoogleMapsScrapperResult> =>
      axiosInstance
        .post("/", params)
        .then(handleRestResponse)
        .catch(handleRestError),
    softRemove: (id: string) =>
      axiosInstance
        .delete(`/soft-remove/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
    restore: (id: string) =>
      axiosInstance
        .patch(`/restore/${id}`, null)
        .then(handleRestResponse)
        .catch(handleRestError),
    remove: (id: string) =>
      axiosInstance
        .delete(`/remove/${id}`)
        .then(handleRestResponse)
        .catch(handleRestError),
  };
};

export const useGoogleMapsSearchUsersApi = () => {
  const axiosInstance = useGlobalAxios("scrapper/instagram/search");

  return {
    search: (m: null): Promise<GoogleMapsScrapperResult> => {
      console.log(m);
      return axiosInstance
        .get("/")
        .then(handleRestResponse)
        .catch(handleRestError);
    },
  };
};
