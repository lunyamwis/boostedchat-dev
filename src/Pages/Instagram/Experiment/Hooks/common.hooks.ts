import React from "react";
import {
  useGetExperiments,
  useGetOneExperiment,
  useGetExperimentStatuses,
  useGetAllExperimentAssignees
} from "./experiments.hook";

export type ExperimentListFilterParams = {
  name: string,
  start_at_gte: string,
  end_at_lt: string,
  primary_metric: string,
  experiment_type: string,
  experiment_status: string,
  page: number,
}

const formatExperimentListFilterParams = (params: ExperimentListFilterParams) => {
  let apiParams = [];

  if (params.name) {
    apiParams.push(`name=${params.name}`)
  }

  if (params.start_at_gte) {
    apiParams.push(`start_gte=${params.start_at_gte}`)
  }

  if (params.end_at_lt) {
    apiParams.push(`end_lt=${params.end_at_lt}`)
  }

  if (params.experiment_status) {
    apiParams.push(`experiment_status=${params.experiment_status}`)
  }

  if (params.primary_metric) {
    apiParams.push(`primary_metric=${params.primary_metric}`)
  }

  if (params.experiment_type) {
     if(params.experiment_type != 'all'){
      apiParams.push(`experiment_type=${params.experiment_type}`)
     }
  }

  if (params.page) {
    apiParams.push(`page=${params.page}`)
  }

  return { api: apiParams.join("&") };

}

export const useCommonStateForExperiments = () => {
  const [isLoadingExperiments, setIsLoadingExperiments] = React.useState<boolean>(true);
  const [formattedFilterParams, setFormatExperimentListFilterParams] =
    React.useState<string>("page=1");
  const [filterParams, setFilterParams] = React.useState<ExperimentListFilterParams>({
    name: "",
    start_at_gte: "",
    end_at_lt: "",
    primary_metric: "",
    experiment_type: "",
    experiment_status: "",
    page: 1,
  });

  React.useEffect(() => {
    const params = formatExperimentListFilterParams(filterParams);
    console.log("params.api")
    console.log(params.api)
    setFormatExperimentListFilterParams(params.api);
  }, [filterParams]);

  console.log(filterParams);

  React.useEffect(() => {
    // setIsLoading(true);
    console.log("formattedFilterParams")
    console.log(formattedFilterParams)
    experimentQR.refetch() //.finally(() => setIsLoading(false));
    // console.log(accountsQR.isFetching)
  }, [formattedFilterParams]);


  const experimentQR = useGetExperiments(formattedFilterParams);
  return {
    setIsLoadingExperiments,
    isLoadingExperiments,
    setFilterParams,
    filterParams,
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


export const useCommonStateForExperimentAssignees = () => {
  const [isLoadingExperimentAssignees, setisLoadingExperimentAssignees] = React.useState<boolean>(true);
  const experimentAssigneeQR = useGetAllExperimentAssignees();
  React.useEffect(() => {
    setisLoadingExperimentAssignees(experimentAssigneeQR.isLoading);
  }, [experimentAssigneeQR.isLoading]);

  return {
    isLoadingExperimentAssignees,
    setisLoadingExperimentAssignees,
    experimentAssigneeQR,
  };
};