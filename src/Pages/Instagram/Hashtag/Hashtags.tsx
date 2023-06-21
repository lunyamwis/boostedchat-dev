import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { GetHashtag } from "../../../Interfaces/Instagram/hashtag.interface";
import { DataGrid } from "../../../Components/Datagrid";
import { useGetHashtags } from "./Hooks/hashtag.hooks";

export function Hashtags() {
  const hashtagsQR = useGetHashtags();

  const columns: ColDef<GetHashtag>[] = React.useMemo(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        id: "hashtagNo",
        header: "#",
        visible: true,
      },
      {
        accessorFn: (row) => row.hashtag_id,
        id: "id",
        header: "Hashtag Id",
        visible: true,
      },
    ],
    []
  );

  return (
    <DataGrid
      loading={hashtagsQR.isLoading}
      tableName="Hashtags"
      data={hashtagsQR.data ?? []}
      columns={columns}
    />
  );
}
