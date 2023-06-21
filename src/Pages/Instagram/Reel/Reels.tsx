import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { GetReel } from "../../../Interfaces/Instagram/reel.interface";
import { Row } from "@tanstack/react-table";
import { ActionIcon, Tooltip } from "@mantine/core";
import { Users } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "../../../Components/Datagrid";
import { useGetReels } from "./Hooks/reel.hooks";

export function Reels() {
  const navigate = useNavigate();
  const reelsQR = useGetReels();

  const ActionColumn = React.useCallback(
    (props: { row: Row<GetReel> }) => (
      <Tooltip label="Extract Likers">
        <ActionIcon
          color="brand"
          onClick={() => {
            navigate(`/reels/${props.row.original.id}/likers`);
          }}
        >
          <Users size={17} strokeWidth={1.2} />
        </ActionIcon>
      </Tooltip>
    ),
    [navigate]
  );

  const columns: ColDef<GetReel>[] = React.useMemo(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        id: "reelNo",
        header: "#",
        visible: true,
      },
      {
        accessorFn: (row) => row.name,
        id: "reelName",
        header: "Reel Name",
        visible: true,
      },
      {
        accessorFn: (row) => row.reel_id,
        id: "reelId",
        header: "Reel Id",
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
      loading={reelsQR.isLoading}
      tableName="Reels"
      data={reelsQR.data ?? []}
      columns={columns}
    />
  );
}
