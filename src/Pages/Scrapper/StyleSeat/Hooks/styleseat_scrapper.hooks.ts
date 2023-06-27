import { useMutation } from "@tanstack/react-query";
import {
  StyleseatProfileExtractInput,
  StyleSeatScrapperInput,
} from "../../../../Interfaces/Scrapper/scrapper.interface";
import { useStyleSeatApi } from "../../../../Apis/Scrapper/styleseat.api";
import { useProfileExtractorApi } from "../../../../Apis/Scrapper/profiles.api";

export const useScrapStyleSeat = () => {
  const { create } = useStyleSeatApi();
  return useMutation((params: StyleSeatScrapperInput) => create(params));
};

export const useExtractStylesealProfiles = () => {
  const { extractStyleseatProfiles } = useProfileExtractorApi();
  return useMutation((params: StyleseatProfileExtractInput) =>
    extractStyleseatProfiles(params)
  );
};
