import React, { useMemo } from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import {
  fuzzyFilter,
  fuzzySort,
} from "../../../Components/Datagrid/datagrid.util";
import { DataGrid } from "../../../Components/Datagrid";
import { axiosError } from "../../../Interfaces/general.interface";
import { Row } from "@tanstack/react-table";
import { ActionIcon, Group, Loader, Text, Tooltip } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { openConfirmModal } from "@mantine/modals";
import { IconCheck, IconX } from "@tabler/icons-react";
import {
  useApproveAccountRequest,
  useGetAccountRequests,
  useRejectAccountRequest,
} from "../Hooks/accountRequest.hook";
import { GetAccountRequest } from "../../../Interfaces/UserManagement/accountRequest.interface";
import { useAuth } from "../../../Context/AuthContext/AuthProvider";

export function AccountRequests() {
  const { user } = useAuth();
  const approveRequest = useApproveAccountRequest();
  const rejectRequest = useRejectAccountRequest();

  const accountRequestsQR = useGetAccountRequests();
  const navigate = useNavigate();

  const ActionColumn = React.useCallback(
    (props: { row: Row<GetAccountRequest> }) => (
      <Group>
        {approveRequest.isLoading ? (
          <Loader size="xs" />
        ) : (
          <Tooltip label="Approve Request">
            <ActionIcon
              color="teal"
              onClick={() => {
                openConfirmModal({
                  title: "Alert",
                  children: (
                    <Text size="sm">
                      Are you sure you want to approve this user account?
                    </Text>
                  ),
                  labels: { confirm: "Confirm", cancel: "Cancel" },
                  onConfirm: () =>
                    approveRequest.mutate({
                      request_id: props.row.original.id,
                      data: { approved_by: user?.id! },
                    }),
                });
              }}
            >
              <IconCheck size={17} strokeWidth={1.2} />
            </ActionIcon>
          </Tooltip>
        )}
        {rejectRequest.isLoading ? (
          <Loader size="xs" />
        ) : (
          <Tooltip label="Reject request">
            <ActionIcon
              color="red"
              onClick={() => {
                openConfirmModal({
                  title: "Alert",
                  children: (
                    <Text size="sm">
                      Are you sure you want to reject this account request?
                    </Text>
                  ),
                  labels: { confirm: "Confirm", cancel: "Cancel" },
                  onConfirm: () =>
                    rejectRequest.mutate({
                      request_id: props.row.original.id,
                      data: {
                        rejected_by: user?.id!,
                        rejection_reason: "",
                      },
                    }),
                });
              }}
            >
              <IconX size={17} strokeWidth={1.4} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    ),
    [navigate]
  );

  const columns: ColDef<GetAccountRequest>[] = useMemo(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        id: "UserNo",
        header: "#",
        visible: true,
      },
      {
        accessorFn: (row) =>
          `${row.user_id.first_name} ${row.user_id.last_name}`,
        id: "fullName",
        header: "Names",
        cell: (info) => info.getValue(),
        filterFn: fuzzyFilter,
        sortingFn: fuzzySort,
        visible: true,
      },
      {
        accessorFn: (row) => row.user_id.email,
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

  if (accountRequestsQR.isError) {
    const err = accountRequestsQR.error as axiosError;
    return <>{err.data}</>;
  }

  return (
    <>
      <DataGrid
        loading={accountRequestsQR.isLoading}
        tableName="Account requests"
        data={accountRequestsQR.data ?? []}
        columns={columns}
      />
    </>
  );
}
