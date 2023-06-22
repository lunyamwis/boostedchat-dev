import { useMutation } from "@tanstack/react-query";
import { StyleSeatScrapperInput } from "../../../../Interfaces/Scrapper/scrapper.interface";
import { useStyleSeatApi } from "../../../../Apis/Scrapper/styleseat.api";

export const useScrapStyleSeat = () => {
  const { create } = useStyleSeatApi();
  return useMutation((params: StyleSeatScrapperInput) => create(params));
};
