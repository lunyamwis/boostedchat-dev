import { useQualifyingAlgorithmApi } from "@/Apis/Scrapper/QualifyingAlgorithm.api";
import { DataGrid } from "@/Components/Datagrid";
import { Affix } from "@/Components/Widgets/Affix";
import { queryKeys } from "@/Constants/ApiConstants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { CreateQualifyingAlgorithm } from "./CreateQualifyingAlgorithm";
import { ColDef } from "@/Components/Datagrid/datagrid.interface";
import { GetQualifyingAlgorithm } from "@/Interfaces/LeadsGeneration/qualifying-algorithm.interface";
import { Row } from "@tanstack/react-table";
import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { IconCheck, IconPencil, IconTrash, IconX } from "@tabler/icons-react";
import { EditQualifyingAlgorithm } from "./EditQualifyingAlgorithm";
import { openConfirmModal } from "@mantine/modals";
import { notifications, showNotification } from "@mantine/notifications";

export function QualifyingAlgorithms() {
  const queryClient = useQueryClient();

  const { getAll, remove } = useQualifyingAlgorithmApi();
  const [createQualifyingAlgoModalOpen, setCreateQualifyingAlgoModalOpen] =
    React.useState(false);
  const [editQualifyingAlgoModalOpen, setEditQualifyingAlgoModalOpen] =
    React.useState(false);
  const [selectedQualifyingAlgoId, setSelectedQualifyingAlgoId] =
    React.useState<null | string>(null);

  const qualifyingAlgosQR = useQuery({
    queryKey: [queryKeys.leadsGeneration.qualifyingAlgos.allAlgos],
    queryFn: () => getAll(),
  });

  const deleteQualifyingAlgorithm = useMutation({
    mutationFn: (params: string) => remove(params),
    onSuccess: () => {
      notifications.update({
        id: "DELETE_QUALIFYING_ALGORITHM_NOTIFICATION",
        color: "teal",
        icon: <IconCheck />,
        message: "The qualifying algorithm has been deleted successfully.",
        loading: false,
        autoClose: true,
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.leadsGeneration.qualifyingAlgos.allAlgos],
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
    (props: { row: Row<GetQualifyingAlgorithm> }) => (
      <Group>
        <Tooltip label="View Details">
          <ActionIcon
            color="brand"
            variant="light"
            onClick={() => {
              setSelectedQualifyingAlgoId(props.row.original.id);
              setEditQualifyingAlgoModalOpen(true);
            }}
          >
            <IconPencil size={17} strokeWidth={1.4} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete qualifying algorithm">
          <ActionIcon
            color="red"
            variant="light"
            onClick={() => {
              openConfirmModal({
                title: "Alert",
                children: (
                  <Text>
                    Are you sure you want to delete this algorithm? This action
                    is irreversible.
                  </Text>
                ),
                onConfirm: () => {
                  notifications.show({
                    id: "DELETE_QUALIFYING_ALGORITHM_NOTIFICATION",
                    loading: true,
                    message: "Deleting the qualifying algorithm",
                    autoClose: false,
                    withCloseButton: false,
                  });
                  deleteQualifyingAlgorithm.mutate(props.row.original.id);
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
  const columns: ColDef<GetQualifyingAlgorithm>[] = React.useMemo(
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
        accessorFn: (row) => row.positive_keywords,
        id: "positive_keywords",
        header: "Positive Keywords",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.number_positive_keywords,
        id: "number_positive_keywords",
        header: "Number of Positive Keywords ",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.negative_keywords,
        id: "negative_keywords",
        header: "Negative Keywords",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.number_negative_keywords,
        id: "number_negative_keywords",
        header: "Number of Negative Keywords ",
        visible: true,
        type: "string",
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
        loading={qualifyingAlgosQR.isLoading}
        tableName="Qualifying Algorithms"
        data={qualifyingAlgosQR.data ?? []}
        columns={columns}
      />
      <Affix
        tooltipLabel="Create new algorithm"
        onClickAction={() => setCreateQualifyingAlgoModalOpen(true)}
      />
      <CreateQualifyingAlgorithm
        isOpen={createQualifyingAlgoModalOpen}
        setIsOpen={setCreateQualifyingAlgoModalOpen}
      />
      <EditQualifyingAlgorithm
        isOpen={editQualifyingAlgoModalOpen}
        setIsOpen={setEditQualifyingAlgoModalOpen}
        qualifyingAlgorithmId={selectedQualifyingAlgoId}
        setQualifyingAlgorithmId={setSelectedQualifyingAlgoId}
      />
    </>
  );
}
