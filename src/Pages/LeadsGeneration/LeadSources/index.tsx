import { useLeadSourceApi } from "@/Apis/Scrapper/LeadSource.api";
import { DataGrid } from "@/Components/Datagrid";
import { Affix } from "@/Components/Widgets/Affix";
import { queryKeys } from "@/Constants/ApiConstants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { CreateLeadSource } from "./CreateLeadSource";
import { ColDef } from "@/Components/Datagrid/datagrid.interface";
import { GetLeadSource } from "@/Interfaces/LeadsGeneration/lead-source.interface";
import { Row } from "@tanstack/react-table";
import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { IconCheck, IconPencil, IconTrash, IconX } from "@tabler/icons-react";
import { openConfirmModal } from "@mantine/modals";
import { notifications, showNotification } from "@mantine/notifications";
import { EditLeadSource } from "./EditLeadSource";

export const matchLeadSourceCriterion = (criterion: number) => {
  if (criterion === 0) {
    return "Followers of account(s)";
  }
  if (criterion === 1) {
    return "Similar account(s)";
  }
  if (criterion === 2) {
    return "Posts with hashtag(s)";
  }
  if (criterion === 3) {
    return "Interacted with post(s)";
  }
  if (criterion === 4) {
    return "Enriched with instagram";
  }
  if (criterion === 5) {
    return "Google Maps";
  }
  if (criterion === 6) {
    return "External URL";
  }
};
export function LeadSources() {
  const queryClient = useQueryClient();

  const { getAll, remove } = useLeadSourceApi();
  const [createLeadSourceModalOpen, setCreateLeadSourceModalOpen] =
    React.useState(false);
  const [editLeadSourceModalOpen, setEditLeadSourceModalOpen] =
    React.useState(false);
  const [selectedLeadSourceId, setSelectedLeadSourceId] = React.useState<
    null | string
  >(null);

  const leadSourcesQR = useQuery({
    queryKey: [queryKeys.leadsGeneration.leadSource.allLeadSources],
    queryFn: () => getAll(),
  });

  const deleteLeadSource = useMutation({
    mutationFn: (params: string) => remove(params),
    onSuccess: () => {
      notifications.update({
        id: "DELETE_LEAD_SOURCE_NOTIFICATION",
        color: "teal",
        icon: <IconCheck />,
        message: "The lead source has been deleted successfully.",
        loading: false,
        autoClose: true,
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.leadsGeneration.leadSource.allLeadSources],
      });
    },
    onError: (err) => {
      showNotification({
        color: "red",
        icon: <IconX />,
        title: "Error",
        message: err.message,
      });
    },
  });

  const ActionColumn = React.useCallback(
    (props: { row: Row<GetLeadSource> }) => (
      <Group>
        <Tooltip label="View Details">
          <ActionIcon
            color="brand"
            variant="light"
            onClick={() => {
              setSelectedLeadSourceId(props.row.original.id);
              setEditLeadSourceModalOpen(true);
            }}
          >
            <IconPencil size={17} strokeWidth={1.4} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete lead source">
          <ActionIcon
            color="red"
            variant="light"
            onClick={() => {
              openConfirmModal({
                title: "Alert",
                children: (
                  <Text>
                    Are you sure you want to delete this lead source? This
                    action is irreversible.
                  </Text>
                ),
                onConfirm: () => {
                  notifications.show({
                    id: "DELETE_LEAD_SOURCE_NOTIFICATION",
                    loading: true,
                    message: "Deleting the lead source",
                    autoClose: false,
                    withCloseButton: false,
                  });
                  deleteLeadSource.mutate(props.row.original.id);
                },
                labels: { confirm: "Confirm", cancel: "Cancel" },
              });
            }}
          >
            <IconTrash size={17} strokeWidth={1.4} />
          </ActionIcon>
        </Tooltip>
      </Group>
    ),
    [],
  );
  const columns: ColDef<GetLeadSource>[] = React.useMemo(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        id: "no",
        header: "#",
        visible: true,
      },
      {
        accessorFn: (row) => row.name,
        id: "name",
        header: "Name",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => {
          if (row.criterion === 0) {
            return `Followers of ${row.account_usernames?.join(", ")}`;
          }
          if (row.criterion === 1) {
            return `Similar accounts to ${row.account_usernames?.join(", ")} `;
          }
          if (row.criterion === 2) {
            return `Posts with hashtags ${row.hashtags?.join(", ")}`;
          }
          if (row.criterion === 3) {
            return `Interacted with posts ${row.photo_links?.join(", ")}`;
          }
          if (row.criterion === 4) {
            return `Mentioned usernames ${row.estimated_usernames?.join(", ")}`;
          }
          if (row.criterion === 5) {
            return `Google Maps locations ${row.google_maps_search_keywords}`;
          }
          if (row.criterion === 6) {
            return `External URLs ${row.external_urls?.join(", ")}`;
          }
          return "-";
        },
        id: "criterion_values",
        header: "criterion",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.enrich_with_url_in_bio,
        id: "enrich_with_url_in_bio",
        header: "Enriched with URL in bio",
        visible: true,
        type: "string",
        cell: ({ row }) => (row.original.enrich_with_url_in_bio ? "Yes" : "No"),
      },
      {
        accessorFn: (row) => row.is_infinite_loop,
        id: "is_infinite_loop",
        header: "Uses infinite loop",
        visible: true,
        type: "string",
        cell: ({ row }) => (row.original.is_infinite_loop ? "Yes" : "No"),
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
        paginationOptions={{ isManual: false }}
        loading={leadSourcesQR.isLoading}
        tableName="Lead Sources"
        data={leadSourcesQR.data ?? []}
        columns={columns}
      />
      <Affix
        tooltipLabel="Create new lead source"
        onClickAction={() => setCreateLeadSourceModalOpen(true)}
      />
      <CreateLeadSource
        isOpen={createLeadSourceModalOpen}
        setIsOpen={setCreateLeadSourceModalOpen}
      />
      <EditLeadSource
        isOpen={editLeadSourceModalOpen}
        setIsOpen={setEditLeadSourceModalOpen}
        leadSourceId={selectedLeadSourceId}
        setLeadSourceId={setSelectedLeadSourceId}
      />
    </>
  );
}
