import React from "react";
import { ColDef } from "../../../Components/Datagrid/datagrid.interface";
import { CommentItem } from "../../../Interfaces/Instagram/commentItem.interface";
import { DataGrid } from "../../../Components/Datagrid";
import { useGetComments } from "./Hooks/commenters.hook";


export function Commenters() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(50);
  const commentQR = useGetComments(page);

  const columns: ColDef<CommentItem>[] = React.useMemo(
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
        fn={() => { }}
        loading={false}
        tableName="Commenters"
        data={commentQR.data?.results ?? []}
        columns={columns}
        paginationOptions={{
          isManual: true,
          pageIndex: page,
          pageSize: pageSize,
          setPageSize: setPageSize,
          setPageIndex: setPage,
          totalRows: commentQR.data?.count ?? 0,
        }}
      />
    </>
  );
}
