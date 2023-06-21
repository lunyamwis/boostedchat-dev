import { useMutation } from "@tanstack/react-query";
import { useGoogleMapsApi } from "../../../../Apis/Scrapper/googlemaps.api";
import { CreateGoogleMapScrapper } from "../../../../Interfaces/Scrapper/googlemaps.interface";

export const useScrapGoogleMapsData = () => {
  const { create } = useGoogleMapsApi();
  return useMutation((params: CreateGoogleMapScrapper) => create(params));
};
