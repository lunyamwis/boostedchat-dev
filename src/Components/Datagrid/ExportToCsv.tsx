import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import { ActionIcon } from "@mantine/core";
import { IconCsv } from "@tabler/icons-react";
import { ColDef } from "./datagrid.interface";

export function ExportToCsv({
  rows,
  fileName,
  columns,
}: {
  rows: any[];
  fileName: string;
  columns: ColDef<any>[];
}) {

  const fileType = "text/csv;charset=utf-8";

  const fileExtension = ".csv";

  const exportData = (
    mRows: Array<any>,
    mFileName: string,
    mColumns: ColDef<any>[]
  ) => {
    const newRowArray = [] as any[];
    mRows.forEach((row) => {
      let newRow = {};
      mColumns.forEach((column, idx) => {
        if (column.type === "actions") return;
        if (!column.visible) return;
        if (column.accessorFn) {
          newRow = {
            ...newRow,
            [column?.header as string]: column.accessorFn(row, idx)
              ? column.type === "json"
                ? JSON.stringify(column.accessorFn(row, idx), null, 2) // pretty print with 2-space indentation
                : column.accessorFn(row, idx)
              : "-",
          };
        } else {
          if (!row[column.id]) {
            newRow = { ...newRow, [column.header as string]: "-" };
            return;
          }
          if (column.type === "date") {
            newRow = {
              ...newRow,
              [column.header as string]: format(
                Date.parse(row[column.id]),
                "dd/MMM/yyyy h:mm aaa"
              ),
            };
            return;
          }
          newRow = { ...newRow, [column.header as string]: row[column.id] };
        }
      });
      newRowArray.push(newRow);
    });
    const workSheet = XLSX.utils.json_to_sheet(newRowArray);
    const csv = XLSX.utils.sheet_to_csv(workSheet);
    const data = new Blob([csv], { type: fileType });
    const sanitizedFileName = `${mFileName
      .toLowerCase()
      .replace(" ", "_")}_${format(new Date(), "HHmmssddMMyy")}`;
    FileSaver.saveAs(data, sanitizedFileName + fileExtension);
  };

  return (
    <ActionIcon
      onClick={() => exportData(rows, fileName, columns)}
      variant="text"
    >
      <IconCsv />
    </ActionIcon>
  );
}
