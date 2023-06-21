import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { GetStory } from "../../../Interfaces/Instagram/story.interface";
import { Row } from "@tanstack/react-table";
import { ActionIcon, Tooltip } from "@mantine/core";
import { Users } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "../../../Components/Datagrid";
import { useGetStories } from "./Hooks/story.hooks";

export function Stories() {
  const navigate = useNavigate();
  const storiesQR = useGetStories();

  const ActionColumn = React.useCallback(
    (props: { row: Row<GetStory> }) => (
      <Tooltip label="Extract Likers">
        <ActionIcon
          color="brand"
          onClick={() => {
            navigate(`/stories/${props.row.original.id}/viewers`);
          }}
        >
          <Users size={17} strokeWidth={1.2} />
        </ActionIcon>
      </Tooltip>
    ),
    [navigate]
  );

  const columns: ColDef<GetStory>[] = React.useMemo(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        id: "storyNo",
        header: "#",
        visible: true,
      },
      {
        accessorFn: (row) => row.link,
        id: "link",
        header: "Story Link",
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
      loading={storiesQR.isLoading}
      tableName="Stories"
      data={storiesQR.data ?? []}
      columns={columns}
    />
  );
}
