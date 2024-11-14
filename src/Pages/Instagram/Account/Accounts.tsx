import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { GetAccount } from "../../../Interfaces/Instagram/account.interface";
import { Row } from "@tanstack/react-table";
import { ActionIcon, Group, Loader, Text, Tooltip } from "@mantine/core";
import { IconPencil, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "../../../Components/Datagrid";
import { useGetAccounts, useResetAccount } from "./Hooks/accounts.hook";
import { openConfirmModal } from "@mantine/modals";
import { Badge } from "../../../Components/MantineWrappers/Badge";
import { Affix } from "../../../Components/Widgets/Affix";
import { CreateAccount } from "./CreateAccount";
import { mapStage } from "../Threads/ThreadListItem";

export function Accounts() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(50);

  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] =
    React.useState(false);
  const navigate = useNavigate();
  const accountsQR = useGetAccounts(page);
  const resetAccount = useResetAccount();

  const ActionColumn = React.useCallback(
    (props: { row: Row<GetAccount> }) => (
      <Group>
        <Tooltip label="View Details">
          <ActionIcon
            color="brand"
            variant="light"
            onClick={() => {
              navigate(`${props.row.original.id}`);
            }}
          >
            <IconPencil size={17} strokeWidth={1.4} />
          </ActionIcon>
        </Tooltip>
        {resetAccount.isPending ? (
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
              <IconX size={17} strokeWidth={1.4} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    ),
    [navigate],
  );

  const columns: ColDef<GetAccount>[] = React.useMemo(
    () => [
      {
        accessorFn: (row) => row.id,
        id: "accountId",
        header: "Id",
        visible: false,
      },
      {
        accessorFn: (_, idx) => pageSize * page + idx + 1,
        id: "accountNo",
        header: "#",
        visible: true,
      },
      {
        accessorFn: (row) => row.full_name,
        id: "full_name",
        header: "Full name",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.igname,
        id: "igname",
        header: "Instagram Name",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.outsourced_data?.[0]?.results.category ?? "-",
        id: "category",
        header: "Category",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.outsourced_data?.[0]?.results.media_id ?? "-",
        id: "media_id",
        header: "Media",
        visible: false,
        type: "string",
      },
      {
        accessorFn: (row) => row.stage,
        id: "status",
        header: "Status",
        type: "number",
        visible: true,
        cell: (params) => {
          if (params.row.original.stage == null) {
            return <></>;
          }
          return (
            <Badge
              color={mapStage(params.row.original.stage)?.color}
              text={mapStage(params.row.original.stage)?.value}
            />
          );
        },
      },
      {
        accessorFn: (row) => (row.assigned_to === "Robot" ? "Bot" : "Human"),
        id: "robot",
        header: "Assigned to",
        visible: true,
      },
      {
        accessorFn: (row) => row.outsourced_data?.[0]?.results.media_count,
        id: "media_count",
        header: "Posts",
        visible: false,
        type: "number",
      },
      {
        accessorFn: (row) => row.outsourced_data?.[0]?.results.follower_count,
        id: "followers",
        header: "Followers",
        visible: false,
        type: "number",
      },
      {
        accessorFn: (row) => row.outsourced_data?.[0]?.results.following_count,
        id: "following",
        header: "Following",
        visible: false,
        type: "number",
      },
      {
        id: "expander",
        header: "Actions",
        visible: true,
        cell: ActionColumn,
      },
    ],
    [],
  );

  return (
    <>
      <DataGrid
        loading={accountsQR.isPending}
        tableName="Accounts"
        data={accountsQR.data?.results ?? []}
        columns={columns}
        paginationOptions={{
          isManual: true,
          pageIndex: page,
          pageSize: pageSize,
          setPageSize: setPageSize,
          setPageIndex: setPage,
          totalRows: accountsQR.data?.count ?? 0,
        }}
      />
      <Affix
        tooltipLabel="Create New Account"
        onClickAction={() => setIsCreateAccountModalOpen(true)}
      />
      <CreateAccount
        isOpen={isCreateAccountModalOpen}
        setIsOpen={setIsCreateAccountModalOpen}
      />
    </>
  );
}
