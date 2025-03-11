// import { useState } from "react";
import React from "react";
import { getInfiniteAccountsByStageWithFilters, useGetAccountThreadDetails, useGetStageStatsWithDateFilters, useGetAccountList } from "./accounts.hook";

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

export type AccountListFilterParams = {
  created_at_gte: string;
  created_at_lt: string;
  outreach_time_gte: string;
  outreach_time_lt: string;
  q: string;
  status: string;
  qualified: boolean;
  notQualified: boolean;
  page: number;
  outreach_success: boolean;
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

const formatAccountListFilterParams = (params: AccountListFilterParams) => {
  const mApiParams = [];
  if (params.created_at_gte) {
    mApiParams.push(`created_at_gte=${params.created_at_gte}`);
    // mApiParams.push(`created_at_lt=${params.created_at_lt}`);
  }

  if (params.created_at_lt.length > 0) {
    // mApiParams.push(`created_at_gte=${params.created_at_gte}`);
    mApiParams.push(`created_at_lt=${params.created_at_lt}`);
  }

  if (params.outreach_time_gte) {
    mApiParams.push(`outreach_time_gte=${params.outreach_time_gte}`);
    mApiParams.push(`outreach_time_lt=${params.outreach_time_lt}`);
  }

  if (params.status) {
    mApiParams.push(`status=${params.status}`);
  }

  if (params.qualified) {
    mApiParams.push(`qualified=${params.qualified}`);
  }
  
  if (params.notQualified) {
    mApiParams.push(`qualified=false`);
  }

  if (params.outreach_success) {
    mApiParams.push(`outreach_success=${params.outreach_success}`);
  }

  if (params.q) {
    mApiParams.push(`q=${params.q}`);
  }

  // add page
  mApiParams.push(`page=${params.page}`);


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
  const stageStatsQR = useGetStageStatsWithDateFilters(formattedFilterParams)


  return {
    stageStatsQR,
    filterParams,
    setFilterParams
  };
};

export const useCommonStateForAccountList = () => {

  const [formattedFilterParams, setFormatAccountListFilterParams] =
    React.useState<string>("");

  const [filterParams, setFilterParams] = React.useState<AccountListFilterParams>({
    created_at_gte: "",
    created_at_lt: "",
    outreach_time_lt: "",
    outreach_time_gte: "",
    outreach_success: false,
    q: "",
    qualified: false,
    notQualified: false,
    status: "",
    page: 1,
  });

  React.useEffect(() => {

    const params = formatAccountListFilterParams(filterParams);
    setFormatAccountListFilterParams(params.api);

  }, [filterParams]);

  // const stageStatsQR = useGetStageStats(formattedFilterParams)
  // accountsQR = useGetAccounts(page);
  console.log("Formatted Filter Params")
  console.log(formattedFilterParams);
  const accountsQR = useGetAccountList(formattedFilterParams);

  React.useEffect(() => {
    console.log("Effecct run")
    accountsQR.refetch();

  }, [formattedFilterParams]);


  return {
    accountsQR,
    filterParams,
    setFilterParams
  };
};

