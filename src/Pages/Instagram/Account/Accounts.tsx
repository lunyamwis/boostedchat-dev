import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { GetAccount } from "../../../Interfaces/Instagram/account.interface";
import { Row } from "@tanstack/react-table";
import { ActionIcon, Tooltip } from "@mantine/core";
import { Users } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "../../../Components/Datagrid";
import { useGetAccounts } from "./Hooks/accounts.hook";

export function Accounts() {
  const navigate = useNavigate();
  const accountsQR = useGetAccounts();

  const ActionColumn = React.useCallback(
    (props: { row: Row<GetAccount> }) => (
      <Tooltip label="Extract Followers">
        <ActionIcon
          color="brand"
          onClick={() => {
            navigate(`/accounts/${props.row.original.id}/followers`);
          }}
        >
          <Users size={17} strokeWidth={1.2} />
        </ActionIcon>
      </Tooltip>
    ),
    [navigate]
  );

  const columns: ColDef<GetAccount>[] = React.useMemo(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        id: "accountNo",
        header: "#",
        visible: true,
      },
      {
        accessorFn: (row) => row.igname,
        id: "igName",
        header: "Instagram Name",
        visible: true,
      },
      {
        accessorFn: (row) => row.phone_number,
        id: "phoneNumber",
        header: "Phone number",
        visible: true,
      },
      {
        accessorFn: (row) => row.email,
        id: "emailAddress",
        header: "Email Address",
        visible: true,
      },
      {
        id: "expander",
        header: "Actions",
        visible: true,
        cell: ActionColumn,
      },
    ],
    []
  );

  return (
    <DataGrid
      loading={accountsQR.isLoading}
      tableName="Accounts"
      data={accountsQR.data ?? []}
      columns={columns}
    />
  );
}
