import { useMutation } from "@tanstack/react-query";
import {
  useGoogleMapsApi,
  useGoogleMapsSearchUsersApi,
} from "../../../../Apis/Scrapper/googlemaps.api";
import {
  GoogleMapsProfileExtractInput,
  GoogleMapsScrapperInput,
} from "../../../../Interfaces/Scrapper/scrapper.interface";
import { useProfileExtractorApi } from "../../../../Apis/Scrapper/profiles.api";

export const useScrapGoogleMapsData = () => {
  const { create } = useGoogleMapsApi();
  return useMutation((params: GoogleMapsScrapperInput) => create(params));
};

export const useExtractGoogleMapsProfiles = () => {
  const { extractGoogleMapsProfiles } = useProfileExtractorApi();
  return useMutation((params: GoogleMapsProfileExtractInput) =>
    extractGoogleMapsProfiles(params)
  );
};

export const useSearchGoogleMapsProfiles = () => {
  const { search } = useGoogleMapsSearchUsersApi();
  return useMutation((m: null) => search(m));
};
