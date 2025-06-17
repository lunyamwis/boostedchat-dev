import React from "react";
import { 
  useGetExperiments,
  useGetOneExperiment
 } from "./experiments.hook";

export const useCommonStateForExperiments = () => {
  const [isLoadingExperiments, setIsLoadingExperiments] = React.useState<boolean>(true);
  const experimentQR = useGetExperiments();
  return {
    setIsLoadingExperiments,
    isLoadingExperiments,
    experimentQR,
  };
};

export const useCommonStateForExperimentDetails = (id: string) => {
  const [isLoadingExperiment, setIsLoadingExperiment] = React.useState<boolean>(true);
  const experimentQR = useGetOneExperiment(id);
  
  return {
    setIsLoadingExperiment,
    isLoadingExperiment,
    experimentQR,
  };
};