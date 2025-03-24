// import { useState } from "react";
import React from "react";
import {
  getInfiniteAccountsByStageWithFilters,
  useGetAccountThreadDetails,
  useGetStageStatsWithDateFilters,
  useGetAccountList,
  useGetOutreachLineChart,
  useGetOutreachChartList
} from "./accounts.hook";

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
  qualified: string;
  notQualified: boolean;
  page: number;
  outreach_success: string;
  outreach_failure: boolean | undefined;
  all_outreach: boolean;
  all_qualified: boolean;
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
  let mApiParams = [];

  if (params.created_at_gte) {
    mApiParams.push(`created_at_gte=${params.created_at_gte}`);
  }

  if (params.created_at_lt.length > 0) {
    mApiParams.push(`created_at_lt=${params.created_at_lt}`);
  }

  if (params.outreach_time_gte) {
    mApiParams.push(`outreach_time_gte=${params.outreach_time_gte}`);
    mApiParams.push(`outreach_time_lt=${params.outreach_time_lt}`);
  }

  if (params.status) {
    mApiParams.push(`status=${params.status}`);
  }

  switch (params.qualified) {
    case "all":
      // mApiParams.push(`qualified=true`);
      break;
    case "qualified":
      mApiParams.push(`qualified=true`);
      break;
    case "not_qualified":
      mApiParams.push(`qualified=false`);
      break;
  }

  switch (params.outreach_success) {
    case "all":
      // mApiParams.push(`qualified=true`);
      break;
    case "reached_out":
      mApiParams.push(`outreach_success=true`);
      break;
    case "not_reached_out":
      mApiParams.push(`outreach_success=false`);
      break;
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
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [chart_type, setChartType] = React.useState<string>("");

  const [filterParams, setFilterParams] = React.useState<AccountListFilterParams>({
    created_at_gte: "",
    created_at_lt: "",
    outreach_time_lt: "",
    outreach_time_gte: "",
    outreach_success: 'all',
    outreach_failure: false,
    all_outreach: false,
    all_qualified: false,
    q: "",
    qualified: 'all',
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
  const accountsQR = useGetAccountList(formattedFilterParams);
  const outreachLineChart = useGetOutreachLineChart(chart_type);
  const outreachChartList = useGetOutreachChartList("");

  React.useEffect(() => {
    setIsLoading(true);
    accountsQR.refetch().finally(() => setIsLoading(false));
    // console.log(accountsQR.isFetching)
  }, [formattedFilterParams]);

  React.useEffect(() => {
    setIsLoading(true);
    outreachLineChart.refetch().finally(() => setIsLoading(false));
  }, [chart_type]);


  return {
    accountsQR,
    chart_type,
    setChartType,
    outreachLineChart,
    outreachChartList,
    isLoading,
    filterParams,
    setFilterParams
  };
};

