import React, { useMemo } from "react";
import { queryKeys } from "../../Constants/ApiConstants";
import { ColDef } from "../../Components/Datagrid/datagrid.interface";
import { DataGrid } from "../../Components/Datagrid";
import { Affix } from "../../Components/Widgets/Affix";
import { axiosError } from "../../Interfaces/general.interface";
import { useGetLeads } from "./Hooks/leads.hook";
import { AddLead } from "./AddLeads";
import { FullAccount } from "../../Interfaces/Instagram/account.interface";

export function Leads() {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] =
    React.useState(false);

  const queryKey = [queryKeys.leads.getAll];

  const leadsQR = useGetLeads();

  const columns: ColDef<Array<FullAccount>>[] = useMemo(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        id: "UserNo",
        header: "#",
        visible: true,
      },
      // {
      //   accessorFn: (row) => `${row.first_name} ${row.last_name}`,
      //   id: "fullName",
      //   header: "Names",
      //   cell: (info) => info.getValue(),
      //   filterFn: fuzzyFilter,
      //   sortingFn: fuzzySort,
      //   visible: true,
      // },
      {
        accessorFn: (row) => row[0].igname,
        id: "lead",
        header: "Lead",
        visible: true,
      },
    ],
    []
  );

  if (leadsQR.isError) {
    const err = leadsQR.error as axiosError;
    return <>{err.data}</>;
  }

  return (
    <>
      <DataGrid
        loading={leadsQR.isLoading}
        tableName="Leads"
        data={leadsQR.data?.instagram ?? []}
        columns={columns}
      />
      <AddLead
        queryKey={queryKey}
        isOpened={isCreateUserModalOpen}
        setIsOpened={setIsCreateUserModalOpen}
      />
      <Affix
        id="create-new-lead"
        tooltipLabel="Create new lead"
        onClickAction={() => setIsCreateUserModalOpen(true)}
      />
    </>
  );
}
