import React, { useMemo } from "react";
import { queryKeys } from "../../../Constants/ApiConstants";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import {
  fuzzyFilter,
  fuzzySort,
} from "../../../Components/Datagrid/datagrid.util";
import { DataGrid } from "../../../Components/Datagrid";
import { Affix } from "../../../Components/Widgets/Affix";
import { AddSalesRepModal } from "./AddSalesRep";
import { axiosError } from "../../../Interfaces/general.interface";
import { useGetSalesReps } from "../Hooks/salesRepresentatives.hook";
import { SalesRepObj } from "../../../Interfaces/UserManagement/salesRep.interface";
import { Stack } from "@mantine/core";
import { AssignSalesRepresentatives } from "./AssignSalesRep";

export function SalesRepresentatives() {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] =
    React.useState(false);

  const queryKey = [queryKeys.salesReps.getAll];

  const userQR = useGetSalesReps();

  const columns: ColDef<SalesRepObj>[] = useMemo(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        id: "UserNo",
        header: "#",
        visible: true,
      },
      {
        accessorFn: (row) =>
          `${row.user?.[0].first_name} ${row.user?.[0].last_name}`,
        id: "fullName",
        header: "Names",
        cell: (info) => info.getValue(),
        filterFn: fuzzyFilter,
        sortingFn: fuzzySort,
        visible: true,
      },
      {
        accessorFn: (row) => row.user?.[0].email,
        id: "emailAddress",
        header: "Email Address",
        visible: true,
      },
      {
        accessorFn: (row) => {
          let assignedAccounts = "";
          for (let i = 0; i < row.instagram.length; i++) {
            if (i === 0) {
              assignedAccounts = row.instagram[0].igname;
            } else {
              assignedAccounts += `, ${row.instagram[i].igname}`;
            }
          }
          return assignedAccounts;
        },
        id: "instagramAccountsAssigned",
        header: "Assigned Accounts",
        visible: true,
      },
    ],
    []
  );

  if (userQR.isError) {
    const err = userQR.error as axiosError;
    return <>{err.data}</>;
  }

  return (
    <>
      <Stack>
        <AssignSalesRepresentatives />
        <DataGrid
          loading={userQR.isLoading}
          tableName="Sales Representatives"
          data={userQR.data?.info ?? []}
          columns={columns}
        />
      </Stack>
      <AddSalesRepModal
        queryKey={queryKey}
        isOpened={isCreateUserModalOpen}
        setIsOpened={setIsCreateUserModalOpen}
      />
      <Affix
        id="create-new-user"
        tooltipLabel="Add sales representative"
        onClickAction={() => setIsCreateUserModalOpen(true)}
      />
    </>
  );
}
