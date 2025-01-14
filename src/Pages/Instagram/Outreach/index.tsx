import { useOutreachApi } from "@/Apis/Outreach/OutreachSchedule.api";
import { DataGrid } from "@/Components/Datagrid";
// import { Affix } from "@/Components/Widgets/Affix";
import { queryKeys } from "@/Constants/ApiConstants";
import {
  // useMutation,
  useQuery,
  // useQueryClient 
} from "@tanstack/react-query";
import React from "react";
import { ColDef } from "@/Components/Datagrid/datagrid.interface";
import { Outreach } from "@/Interfaces/Outreach/outreach.interface";

// import { Row } from "@tanstack/react-table";
// import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
// import { IconCheck, IconPencil, IconTrash, IconX } from "@tabler/icons-react";
// import { openConfirmModal } from "@mantine/modals";
// import { notifications, showNotification } from "@mantine/notifications";
import { format, 
  // parse,
   parseISO } from "date-fns";
import { EDateFormats } from "@/Interfaces/general.interface";

export function OutreachList() {
  // const queryClient = useQueryClient();

  const { getAll } = useOutreachApi();
  // const [createOutreachScheduleModalOpen, setCreateOutreachScheduleModalOpen] =
  //   React.useState(false);
  // const [editOutreachScheduleModalOpen, setEditOutreachScheduleModalOpen] =
  //   React.useState(false);
  // const [selectedOutreachScheduleId, setSelectedOutreachScheduleId] =
  //   React.useState<null | string>(null);

  const outreachListQR = useQuery({
    queryKey: [queryKeys.outreach.allOutreaches],
    queryFn: () => getAll(),
  });

  // const deleteOutreachSchedule = useMutation({
  //   mutationFn: (params: string) => remove(params),
  //   onSuccess: () => {
  //     notifications.update({
  //       id: "DELETE_OUTREACH_SCHEDULE_NOTIFICATION",
  //       color: "teal",
  //       icon: <IconCheck />,
  //       message: "The outreach schedule has been deleted successfully.",
  //       loading: false,
  //       autoClose: true,
  //     });
  //     queryClient.invalidateQueries({
  //       queryKey: [
  //         queryKeys.leadsGeneration.outreachSchedule.allOutreachSchedules,
  //       ],
  //     });
  //   },
  //   onError: (err) => {
  //     showNotification({
  //       color: "red",
  //       icon: <IconX />,
  //       title: "Error",
  //       message: err.message,
  //     });
  //   },
  // });

  // const ActionColumn = React.useCallback(
  //   (props: { row: Row<Outreach> }) => (
  //     <Group>
  //       <Tooltip label="View Details">
  //         <ActionIcon
  //           color="brand"
  //           variant="light"
  //           onClick={() => {
  //             // setSelectedOutreachScheduleId(props.row.original.id);
  //             // setEditOutreachScheduleModalOpen(true);
  //           }}
  //         >
  //           <IconPencil size={17} strokeWidth={1.4} />
  //         </ActionIcon>
  //       </Tooltip>
  //       <Tooltip label="Delete outreach schedule">
  //         <ActionIcon
  //           color="red"
  //           variant="light"
  //           onClick={() => {
  //             openConfirmModal({
  //               title: "Alert",
  //               children: (
  //                 <Text>
  //                   Are you sure you want to delete this outreach schedule? This
  //                   action is irreversible.
  //                 </Text>
  //               ),
  //               onConfirm: () => {
  //                 notifications.show({
  //                   id: "DELETE_OUTREACH_SCHEDULE_NOTIFICATION",
  //                   loading: true,
  //                   message: "Deleting the outreach schedule",
  //                   autoClose: false,
  //                   withCloseButton: false,
  //                 });
  //                 // deleteOutreachSchedule.mutate(props.row.original.id);
  //               },
  //               labels: { confirm: "Confirm", cancel: "Cancel" },
  //             });
  //           }}
  //         >
  //           <IconTrash size={17} strokeWidth={1.4} />
  //         </ActionIcon>
  //       </Tooltip>
  //     </Group>
  //   ),
  //   [],
  // );
  const columns: ColDef<Outreach>[] = React.useMemo(
    () => [
      {
        accessorFn: (row) => row.id,
        id: "id",
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
        accessorFn: (row) => row.task,
        id: "task",
        header: "task",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.args,
        id: "arguments",
        // header: "Leads per sales rep per day",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.date_changed,
        id: "Date changed",
        header: "Date changed",
        visible: true,
        type: "string",
        cell: ({ row }) => {
          return format(
            parseISO(row.original.date_changed || ''),
            EDateFormats.shortDateWithTime,
          );
        },
      },
      // {
      //   accessorFn: (row) => row.scrapper_endtime,
      //   id: "scrapper_endtime",
      //   header: "Scraping End Time",
      //   visible: true,
      //   type: "string",
      //   cell: ({ row }) => {
      //     return format(
      //       parseISO(row.original.scrapper_endtime),
      //       EDateFormats.shortDateWithTime,
      //     );
      //   },
      // },
      // {
      //   accessorFn: (row) => row.outreach_starttime,
      //   id: "outreach_starttime",
      //   header: "Outreach Start Time",
      //   visible: true,
      //   type: "string",
      //   cell: ({ row }) => {
      //     return format(
      //       parse(row.original.outreach_starttime, "HH:mm:ss", new Date()),
      //       EDateFormats.time,
      //     );
      //   },
      // },
      // {
      //   accessorFn: (row) => row.outreach_endtime,
      //   id: "outreach_endtime",
      //   header: "Outreach End Time",
      //   visible: true,
      //   type: "string",
      //   cell: ({ row }) => {
      //     return format(
      //       parse(row.original.outreach_endtime, "HH:mm:ss", new Date()),
      //       EDateFormats.time,
      //     );
      //   },
      // },
      // {
      //   id: "expander",
      //   header: "Actions",
      //   visible: true,
      //   cell: ActionColumn,
      // },
    ],
    [],
  );

  console.log(outreachListQR.data?.results)

  return (
    <>
      <DataGrid
        paginationOptions={{ isManual: false }}
        loading={outreachListQR.isLoading}
        tableName="Outreach List"
        data={outreachListQR.data?.results ?? []}
        columns={columns}
      />
      {/* <Affix
        tooltipLabel="Create new outreach schedule"
        // onClickAction={() => setCreateOutreachScheduleModalOpen(true)}
      /> */}
    </>
  );
}
