import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { GetVideo } from "../../../Interfaces/Instagram/video.interface";
import { Row } from "@tanstack/react-table";
import { ActionIcon, Tooltip } from "@mantine/core";
import { Users } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "../../../Components/Datagrid";
import { useGetVideos } from "./Hooks/video.hooks";

export function Videos() {
  const navigate = useNavigate();
  const videosQR = useGetVideos();

  const ActionColumn = React.useCallback(
    (props: { row: Row<GetVideo> }) => (
      <Tooltip label="Extract Likers">
        <ActionIcon
          color="brand"
          onClick={() => {
            navigate(`/videos/${props.row.original.id}/likers`);
          }}
        >
          <Users size={17} strokeWidth={1.2} />
        </ActionIcon>
      </Tooltip>
    ),
    [navigate]
  );

  const columns: ColDef<GetVideo>[] = React.useMemo(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        id: "videoNo",
        header: "#",
        visible: true,
      },
      {
        accessorFn: (row) => row.name,
        id: "videoName",
        header: "Video Name",
        visible: true,
      },
      {
        accessorFn: (row) => row.video_id,
        id: "videoId",
        header: "Video Id",
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
      loading={videosQR.isLoading}
      tableName="Videos"
      data={videosQR.data ?? []}
      columns={columns}
    />
  );
}
