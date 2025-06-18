import React, { useState } from "react";


import { ExperimentFieldDefinition } from "@/Interfaces/Instagram/Experiments/experiment.interface";
import { DataGrid } from "@/Components/Datagrid";
import { ColDef } from "@/Components/Datagrid/datagrid.interface";
import { useCommonStateForExperimentDetails } from "../Hooks/common.hooks";
import { useLocation } from "react-router-dom";

export function ExperimentDetails() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(1000);
  const { pathname } = useLocation();

  const id = React.useMemo(() => {
    const pathItems = pathname.split('/');
    return pathItems[pathItems.length - 1];
  }, [pathname]);
  // const id = pathItems[pathItems.length - 1]
  const { experimentQR } = useCommonStateForExperimentDetails(id);

  // console.log("Experiment path details", pathname);
  // console.log("Experiment path details", id);

  const columnDefs: ColDef<ExperimentFieldDefinition>[] = ([
    {
      accessorFn: (_, idx) => idx + 1,
      id: "experiment_number",
      header: "#",
      type: "string",
      visible: true,
    },
    {
      accessorFn: (row) => {
        return row.config.name;
      },
      id: "name",
      header: "Name",
      type: "string",
      visible: true,
    },
    {
      accessorFn: (row) => {
        row?.field_value?.value;
      },
      id: "value",
      header: "Value",
      type: "string",
      visible: true,
    },
  ]);

  console.log(experimentQR.data);
  console.log(experimentQR.data?.field_definitions);

  return (
    <>
      <DataGrid
        fn={() => {

        }}
        loading={false} //{accountsQR.isLoading || isLoading}
        tableName={"Experiment Field Definitions"}
        data={experimentQR.data?.field_definitions ?? []}
        columns={columnDefs}
        paginationOptions={{
          isManual: true,
          pageIndex: page,
          pageSize: pageSize,
          setPageSize: setPageSize,
          setPageIndex: setPage,
          totalRows: 10//accountsQR.data?.count ?? 0,
        }}
      />
    </>
  );
}


