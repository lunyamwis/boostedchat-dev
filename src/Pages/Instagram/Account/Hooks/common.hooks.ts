import React from "react";
import {getInfiniteAccountsByStage } from "./accounts.hook";  
export const useCommonState = (stage: string) => {
  // const [stagesx, setStages] = React.useState<string[]>([]);
  const fetQR = getInfiniteAccountsByStage(stage);
  return {
    fetQR
  };
};
