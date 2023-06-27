import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { GetPhoto } from "../../../Interfaces/Instagram/photo.interface";
import { Row } from "@tanstack/react-table";
import { ActionIcon, Tooltip } from "@mantine/core";
import { Users } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "../../../Components/Datagrid";
import { useGetPhotos } from "./Hooks/photo.hooks";

export function Photos() {
  const navigate = useNavigate();
  const photosQR = useGetPhotos();

  const ActionColumn = React.useCallback(
    (props: { row: Row<GetPhoto> }) => (
      <Tooltip label="Extract Likers">
        <ActionIcon
          color="brand"
          onClick={() => {
            navigate(`/photos/${props.row.original.id}/likers`);
          }}
        >
          <Users size={17} strokeWidth={1.2} />
        </ActionIcon>
      </Tooltip>
    ),
    [navigate]
  );

  const columns: ColDef<GetPhoto>[] = React.useMemo(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        id: "photoNo",
        header: "#",
        visible: true,
      },
      {
        accessorFn: (row) => row.name,
        id: "photoName",
        header: "Photo Name",
        visible: true,
      },
      {
        accessorFn: (row) => row.photo_id,
        id: "photoId",
        header: "Photo Id",
        visible: true,
      },
      {
        accessorFn: (row) => row.link,
        id: "linke",
        header: "Link",
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
      loading={photosQR.isLoading}
      tableName="Photos"
      data={photosQR.data ?? []}
      columns={columns}
    />
  );
}
