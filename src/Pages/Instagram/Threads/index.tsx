import { useMediaQuery } from "@/Hooks/useMediaQuery";
import React from "react";
import { MobileThreads } from "./Mobile";
import { DesktopThreads } from "./Desktop";

export function Threads() {
  const { toMdScreen } = useMediaQuery();
  if (toMdScreen) {
    return (
      <>
        <MobileThreads />
      </>
    );
  }
  return (
    <>
      <DesktopThreads />
    </>
  );
}
