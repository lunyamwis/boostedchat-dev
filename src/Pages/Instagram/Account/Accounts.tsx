import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { GetAccount } from "../../../Interfaces/Instagram/account.interface";
import { Row } from "@tanstack/react-table";
import { ActionIcon, Skeleton, Text, Tooltip } from "@mantine/core";
import { Users } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "../../../Components/Datagrid";
import {
  useGetAccounts,
  useGetPotentialToBuy,
  useGetPotentialToPromote,
} from "./Hooks/accounts.hook";

const PotentialToBuyColumn = (props: { row: Row<GetAccount> }) => {
  const potentialToBuyQR = useGetPotentialToBuy(props.row.original.id);
  return (
    <Skeleton visible={!potentialToBuyQR.isLoading}>
      <Text>
        {props.row.index === 0 ? potentialToBuyQR.data?.potential_buy : "-"}
      </Text>
    </Skeleton>
  );
};

const PotentialToPromoteColumn = (props: { row: Row<GetAccount> }) => {
  const potentialToPromoteQR = useGetPotentialToPromote(props.row.original.id);
  return (
    <Skeleton visible={potentialToPromoteQR.isLoading}>
      <Text>{potentialToPromoteQR.data?.potential_promote}</Text>
    </Skeleton>
  );
};

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
        id: "potentialToBuy",
        header: "Potential To Buy",
        visible: true,
        cell: PotentialToBuyColumn,
      },
      {
        id: "potentialToPromote",
        header: "Potential To Promote",
        visible: true,
        cell: PotentialToPromoteColumn,
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
