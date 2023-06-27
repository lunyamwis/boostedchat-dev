import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { DataGrid } from "../../../Components/Datagrid";
import { useGetComments } from "./Hooks/comments.hook";
import { GetComment } from "../../../Interfaces/Instagram/comment.interface";

export function Comments() {
  const commentsQR = useGetComments();

  const columns: ColDef<GetComment>[] = React.useMemo(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        id: "commentNo",
        header: "#",
        visible: true,
      },
      {
        accessorFn: (row) => row.comment_id,
        id: "commentId",
        header: "Comment Id",
        visible: true,
      },
      {
        accessorFn: (row) => row.text,
        id: "text",
        header: "Text",
        visible: true,
      },
    ],
    []
  );

  return (
    <DataGrid
      loading={commentsQR.isLoading}
      tableName="Comments"
      data={commentsQR.data ?? []}
      columns={columns}
    />
  );
}
