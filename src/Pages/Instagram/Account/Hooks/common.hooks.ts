// import { useState } from "react";
import React from "react";
import { getInfiniteAccountsByStageWithFilters, useGetAccountThreadDetails, useGetStageStatsWithDateFilters } from "./accounts.hook";

export type AccountFilterParams = {
  stage: string;
  q: string;
  start_date: string;
  end_date: string;
};

export type StatsFilterParams = {
  start_date: string;
  end_date: string;
};
const formatFilterParams = (params: AccountFilterParams) => {
  const mApiParams = [];
  const mSearchParams = [];
  // if (
  //   params.assigned_to &&
  //   params.assigned_to.value != null &&
  //   params.assigned_to.value.length > 0
  // ) {
  //   mApiParams.push(`assigned_to=${params.assigned_to.value}`);
  //   mSearchParams.push(`assigned_to=${params.assigned_to.label}`);
  // }

  if (params.stage && params.stage != null) {
    // mApiParams.push(`status_param=${JSON.stringify(params.stage)}`);
    mApiParams.push(`status_param=${params.stage}`);
    // mSearchParams.push(`stage=${JSON.stringify(params.stage)}`);
  }
  if (params.q && params.q != null && params.q.length > 0) {
    mApiParams.push(`q=${params.q}`);
    mSearchParams.push(`q=${params.q}`);
  }

  if (
    params.start_date &&
    params.end_date
  ) {
    // mApiParams.push(`start_date=${JSON.stringify(params.start_date)}`);
    // mApiParams.push(`end_date=${JSON.stringify(params.end_date)}`);
    mApiParams.push(`start_date=${params.start_date}`);
    mApiParams.push(`end_date=${params.end_date}`);
  }
  // else if (params.start_date) {
  //   mApiParams.push(`start_date=${JSON.stringify(params.start_date)}`);
  //   mSearchParams.push(`start_date=${JSON.stringify(params.start_date)}`);
  // } else if (params.end_date) {
  //   mApiParams.push(`end_date=${JSON.stringify(params.end_date)}`);
  //   mSearchParams.push(`end_date=${JSON.stringify(params.end_date)}`);
  // }

  return { api: mApiParams.join("&"), search: mSearchParams.join("&") };
};

const formatStatsFilterParams = (params: StatsFilterParams) => {
  const mApiParams = [];
   if (
    params.start_date &&
    params.end_date
  ) {
    mApiParams.push(`start_date=${params.start_date}`);
    mApiParams.push(`end_date=${params.end_date}`);
  }
  return { api: mApiParams.join("&") };
};
export const useCommonState = () => {
  const [formattedFilterParams, setFormattedFilterParams] =
    React.useState<string>("");

  const [filterParams, setFilterParams] = React.useState<AccountFilterParams>({
    stage: "",
    q: "",
    start_date: "",
    end_date: "",
  });

  React.useEffect(() => {
    const params = formatFilterParams(filterParams);
    setFormattedFilterParams(params.api);
  }, [filterParams]);



  const fetQR = getInfiniteAccountsByStageWithFilters(
    formattedFilterParams
  );

  // const  fetQR = getInfiniteAccountsByStage(stage);


  return {
    fetQR,
    filterParams,
    setFilterParams
  };
};

export const useCommonStateForAccountThreads = (id: string) => {
  const accountDetailsQR = useGetAccountThreadDetails(id)
  return {
    accountDetailsQR
  };
};

export const useCommonStateForStageStats = () => {
  
  const [formattedFilterParams, setFormatStatsFilterParams] =
    React.useState<string>("");

  const [filterParams, setFilterParams] = React.useState<StatsFilterParams>({
    start_date: "",
    end_date: "",
  });

  React.useEffect(() => {
    const params = formatStatsFilterParams(filterParams);
    setFormatStatsFilterParams(params.api);
  }, [filterParams]);

  // const stageStatsQR = useGetStageStats(formattedFilterParams)
  const stageStatsQR =  useGetStageStatsWithDateFilters(formattedFilterParams)


  return {
    stageStatsQR,
    filterParams,
    setFilterParams
  };
};
