import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { LikeItem } from "../../../Interfaces/Instagram/likeItem.interface";
import { DataGrid } from "../../../Components/Datagrid";
import { useGetLikes } from "./Hooks/commenters.hook";



export function Likes() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(50);


  const likeQR = useGetLikes(page);

  const columns: ColDef<LikeItem>[] = React.useMemo(
    () => [
      {
        accessorFn: (row) => row.id,
        id: "accountId",
        header: "Id",
        visible: false,
      },
      {
        accessorFn: (_, idx) => pageSize * page + idx + 1,
        id: "accountNo",
        header: "#",
        visible: true,
      },
      {
        accessorFn: (row) => row.account,
        id: "igname",
        header: "Instagram Name",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.pushCategory,
        id: "category",
        header: "Category",
        visible: true,
        type: "string",
      },
      {
        accessorFn: (row) => row.message,
        id: "message",
        header: "Message",
        type: "string",
        visible: true,
      },
      {
        accessorFn: (row) => row.created_at,
        id: "createdat",
        header: "Created At",
        type: "string",
        visible: true,
      },
    ],
    [],
  );

  return (
    <>
      <DataGrid
        loading={false}
        tableName="Likers"
        data={likeQR.data?.results ?? []}
        columns={columns}
        paginationOptions={{
          isManual: true,
          pageIndex: page,
          pageSize: pageSize,
          setPageSize: setPageSize,
          setPageIndex: setPage,
          totalRows: likeQR.data?.count ?? 0,
        }}
      />
    </>
  );
}
