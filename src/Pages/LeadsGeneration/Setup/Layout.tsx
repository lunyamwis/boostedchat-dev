import { FormLayout } from "@/Layouts/FormLayout";
import React from "react";
import { SetupScraper } from ".";

export function SetupScraperLayout() {
  return (
    <FormLayout span={6} title="Set up workflow">
      <SetupScraper />
    </FormLayout>
  );
}
