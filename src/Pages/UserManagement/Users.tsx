import React, { useMemo } from "react";
import { queryKeys } from "../../Constants/ApiConstants";
import { ColDef } from "../../Components/Datagrid/datagrid.interface";
import {
  fuzzyFilter,
  fuzzySort,
} from "../../Components/Datagrid/datagrid.util";
import { DataGrid } from "../../Components/Datagrid";
import { Affix } from "../../Components/Widgets/Affix";
import { CreateUserModal } from "./CreateUserModal";
import { axiosError } from "../../Interfaces/general.interface";
import { User } from "../../Interfaces/UserManagement/user.interface";
import { useGetUserAccounts } from "./Hooks/userAccounts.hook";

export function Users() {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] =
    React.useState(false);

  const queryKey = [queryKeys.users.getAll];

  const userQR = useGetUserAccounts();

  const columns: ColDef<User>[] = useMemo(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        id: "UserNo",
        header: "#",
        visible: true,
      },
      {
        accessorFn: (row) => `${row.first_name} ${row.last_name}`,
        id: "fullName",
        header: "Names",
        cell: (info) => info.getValue(),
        filterFn: fuzzyFilter,
        sortingFn: fuzzySort,
        visible: true,
      },
      {
        accessorFn: (row) => row.email,
        id: "emailAddress",
        header: "Email Address",
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
      <DataGrid
        loading={userQR.isLoading}
        tableName="Users"
        data={userQR.data?.users ?? []}
        columns={columns}
      />
      <CreateUserModal
        queryKey={queryKey}
        isOpened={isCreateUserModalOpen}
        setIsOpened={setIsCreateUserModalOpen}
      />
      <Affix
        id="create-new-user"
        tooltipLabel="Create new user"
        onClickAction={() => setIsCreateUserModalOpen(true)}
      />
    </>
  );
}
