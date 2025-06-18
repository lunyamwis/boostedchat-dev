import React from "react";
import {
  useGetExperiments,
  useGetOneExperiment,
  useGetExperimentStatuses
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

  React.useEffect(() => {
    setIsLoadingExperiment(experimentQR.isLoading);
  }, [experimentQR.isLoading]);

  return {
    setIsLoadingExperiment,
    isLoadingExperiment,
    experimentQR,
  };
};

export const useCommonStateForExperimentStatus = () => {
  const [isLoadingExperimentStatus, setIsLoadingExperimentStatus] = React.useState<boolean>(true);
  const experimentStatusQR = useGetExperimentStatuses();
  React.useEffect(() => {
    setIsLoadingExperimentStatus(experimentStatusQR.isLoading);
  }, [experimentStatusQR.isLoading]);

  return {
    isLoadingExperimentStatus,
    setIsLoadingExperimentStatus,
    experimentStatusQR,
  };
};