import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetThreads } from "./thread.hooks";

type NullableString = string | null;
type NullableStringArray = string[] | null;
export type ThreadFilterParams = {
  assigned_to: { label: NullableString; value: NullableString };
  sales_rep: { label: NullableStringArray; value: NullableStringArray };
  stage: { label: NullableStringArray; value: NullableStringArray };
  q: { label: NullableString; value: NullableString };
};

const formatFilterParams = (params: ThreadFilterParams) => {
  const mApiParams = [];
  const mSearchParams = [];
  if (
    params.assigned_to &&
    params.assigned_to.value != null &&
    params.assigned_to.value.length > 0
  ) {
    mApiParams.push(`assigned_to=${params.assigned_to.value}`);
    mSearchParams.push(`assigned_to=${params.assigned_to.label}`);
  }
  if (
    params.sales_rep &&
    params.sales_rep.value != null &&
    params.sales_rep.value.length > 0
  ) {
    mApiParams.push(`sales_rep=${JSON.stringify(params.sales_rep.value)}`);
    mSearchParams.push(`sales_rep=${JSON.stringify(params.sales_rep)}`);
  }
  if (params.stage && params.stage.value != null) {
    mApiParams.push(`stage=${JSON.stringify(params.stage.value)}`);
    mSearchParams.push(`stage=${JSON.stringify(params.stage)}`);
  }
  if (params.q && params.q.value != null && params.q.value.length > 0) {
    mApiParams.push(`q=${params.q.value}`);
    mSearchParams.push(`q=${params.q.value}`);
  }
  return { api: mApiParams.join("&"), search: mSearchParams.join("&") };
};

export const useCommonState = () => {
  const [formattedFilterParams, setFormattedFilterParams] =
    React.useState<string>("");

  const [filterParams, setFilterParams] = React.useState<ThreadFilterParams>({
    assigned_to: { label: null, value: null },
    sales_rep: { label: null, value: null },
    stage: { label: null, value: null },
    q: { label: null, value: null },
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [igThreadId, setIgThreadId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const params = formatFilterParams(filterParams);
    setSearchParams(params.search);
    setFormattedFilterParams(params.api);
  }, [filterParams]);

  React.useEffect(() => {
    const id = searchParams.get("thread");
    if (id == null) {
      setIgThreadId(null);
      return;
    }
    setIgThreadId(id);
  }, [searchParams]);

  React.useEffect(() => {
    const assignedToParams = searchParams.get("assigned_to");
    const stageParams = searchParams.get("stage");
    const salesrepParams = searchParams.get("sales_rep");
    const qParams = searchParams.get("q");

    const mFilterParams: ThreadFilterParams = {
      assigned_to: { label: null, value: null },
      sales_rep: { label: null, value: null },
      stage: { label: null, value: null },
      q: { label: null, value: null },
    };

    if (assignedToParams != null) {
      mFilterParams.assigned_to = JSON.parse(assignedToParams);
    } else {
      mFilterParams.assigned_to = { label: null, value: null };
    }

    if (stageParams != null) {
      mFilterParams.stage = JSON.parse(stageParams);
    } else {
      mFilterParams.stage = { label: null, value: null };
    }

    if (salesrepParams != null) {
      mFilterParams.sales_rep = JSON.parse(salesrepParams);
    } else {
      mFilterParams.sales_rep = { label: null, value: null };
    }

    if (qParams != null) {
      mFilterParams.q = JSON.parse(qParams);
    } else {
      mFilterParams.q = { label: null, value: null };
    }

    setFilterParams(mFilterParams);
  }, []);

  const threadsQR = useGetThreads(formattedFilterParams);

  return {
    threadsQR,
    filterParams,
    setFilterParams,
    igThreadId,
  };
};
