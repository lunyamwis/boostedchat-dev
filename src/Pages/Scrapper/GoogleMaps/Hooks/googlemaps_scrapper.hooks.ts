import { useMutation } from "@tanstack/react-query";
import { useGoogleMapsApi } from "../../../../Apis/Scrapper/googlemaps.api";
import { GoogleMapsScrapperInput } from "../../../../Interfaces/Scrapper/scrapper.interface";

export const useScrapGoogleMapsData = () => {
  const { create } = useGoogleMapsApi();
  return useMutation((params: GoogleMapsScrapperInput) => create(params));
};
