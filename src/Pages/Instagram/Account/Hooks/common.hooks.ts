// import React from "react";
import {getInfiniteAccountsByStage, useGetAccountThreadDetails } from "./accounts.hook";  
export const useCommonState = (stage: string) => {
  // const [stagesx, setStages] = React.useState<string[]>([]);
  const fetQR = getInfiniteAccountsByStage(stage);
  return {
    fetQR
  };
};

export const useCommonStateForAccountThreads = (id: string) => {
  const accountDetailsQR = useGetAccountThreadDetails(id)
  return {
    accountDetailsQR
  };
};
