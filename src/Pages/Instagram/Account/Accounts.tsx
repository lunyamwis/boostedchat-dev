import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { GetAccount } from "../../../Interfaces/Instagram/account.interface";
import { Row } from "@tanstack/react-table";
import { ActionIcon, Group, Loader, Text, Tooltip } from "@mantine/core";
import { Trash, Users } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "../../../Components/Datagrid";
import { useGetAccounts, useResetAccount } from "./Hooks/accounts.hook";
import { openConfirmModal } from "@mantine/modals";

export function Accounts() {
  const navigate = useNavigate();
  const accountsQR = useGetAccounts();
  const resetAccount = useResetAccount();

  const ActionColumn = React.useCallback(
    (props: { row: Row<GetAccount> }) => (
      <Group>
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
        {resetAccount.isLoading ? (
          <Loader size="xs" />
        ) : (
          <Tooltip label="Reset Account">
            <ActionIcon
              color="red"
              onClick={() => {
                openConfirmModal({
                  title: "Alert",
                  children: (
                    <Text size="sm">
                      Resetting the account will delete its thread, messages and
                      status. Are you sure you want to proceed?
                    </Text>
                  ),
                  labels: { confirm: "Confirm", cancel: "Cancel" },
                  onConfirm: () => resetAccount.mutate(props.row.original.id),
                });
              }}
            >
              <Trash size={17} strokeWidth={1.4} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
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
      data={accountsQR.data?.accounts ?? []}
      columns={columns}
    />
  );
}
