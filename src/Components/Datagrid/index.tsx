import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  GroupingState,
  useReactTable,
} from "@tanstack/react-table";
import { IconSettings } from "@tabler/icons-react";
import { useDidUpdate } from "@mantine/hooks";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ActionIcon, Box, Grid, Group, Stack, Text } from "@mantine/core";
import { addDays, format, parse, subDays } from "date-fns";
import { ActionButtons } from "./ActionButtons";
import { CustomDataGrid } from "./CustomDataGrid";
import { DataGridSearch } from "./Search";
import { fuzzyFilter } from "./datagrid.util";
import { DataGridSettings } from "./SettingsPane";
import {
  ColDef,
  EDGDateFormats,
  TDataGridDateRangeTypes,
  TStatusProps,
} from "./datagrid.interface";
import { DataGridProvider, useDataGrid } from "./Context/DataGridProvider";
import { ExportToExcel } from "./ExportToExcel";
import { LoadingTable } from "./LoadingTable";
import { ManualPagination } from "./ManualPagination";

type PaginationProps =
  | {
      isManual: false;
    }
  | {
      isManual: true;
      pageIndex: number;
      setPageIndex: React.Dispatch<React.SetStateAction<number>>;
      pageSize: number;
      setPageSize: React.Dispatch<React.SetStateAction<number>>;
      totalRows: number;
    };

interface Props<T> {
  statusProps?: TStatusProps;
  columns: ColDef<T>[];
  data: T[];
  loading: boolean;
  tableName: string;
  paginationOptions: PaginationProps;
}

function MDataGrid<T>({
  columns: tableColumns,
  data,
  tableName,
  loading,
  statusProps,
  paginationOptions,
}: Props<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    limit,
    offset,
    dispatch,
    status,
    endDate,
    startDate,
    tableColumns: actualTableColumns,
    filters: pFilters,
    currentTableRows,
  } = useDataGrid();
  const [grouping, setGrouping] = React.useState<GroupingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnPinning, setColumnPinning] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const table = useReactTable({
    data: currentTableRows,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    onColumnVisibilityChange: setColumnVisibility,
    onGroupingChange: setGrouping,
    onColumnPinningChange: setColumnPinning,
    onRowSelectionChange: setRowSelection,
    manualPagination: paginationOptions.isManual,
    initialState: {
      columnVisibility: tableColumns.reduce(
        (prev, curr) => {
          if (!curr.visible) {
            const id = curr.id!;
            const newVal = { ...prev };
            newVal[id] = false;
            return newVal;
          }
          return prev;
        },
        {} as Record<string, boolean>,
      ),
    },
    // Provide our updateData function to our table meta
    // meta: getTableMeta(setData, skipAutoResetPageIndex),
    state: {
      grouping,
      columnFilters,
      globalFilter,
      columnVisibility,
      columnPinning,
      rowSelection,
    },
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  useDidUpdate(() => {
    const flattenedColIdsMap: Record<string, boolean> = {};
    actualTableColumns.forEach((col) => {
      flattenedColIdsMap[col.id] = col.visible;
    });
    setColumnVisibility(flattenedColIdsMap);
  }, [actualTableColumns]);

  useDidUpdate(() => {}, [
    pFilters,
    startDate,
    endDate,
    status,
    actualTableColumns,
    limit,
    offset,
  ]);

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_TABLE_ROWS",
      payload: { currentTableRows: data },
    });
    dispatch({
      type: "SET_ORIGINAL_TABLE_ROWS",
      payload: { originalTableRows: data },
    });
  }, [data]);

  useEffect(() => {
    const colParams = searchParams.get("c");
    const limitParam = searchParams.get("l");
    const offsetParam = searchParams.get("o");
    const statusParam = searchParams.get("st");
    const startDateParam = searchParams.get("ds");
    const endDateParam = searchParams.get("de");

    const dateRangeTypeParam: TDataGridDateRangeTypes | null =
      (searchParams.get("drt") as TDataGridDateRangeTypes | null) ??
      "Date Range";

    const mTableColumns = [...tableColumns];
    let selectColumns: string[] = [];
    let generatedColumns: string[] = [];
    let relationColumns: string[] = [];
    let mOffset = 0;
    let mLimit = 50;
    const flattenedColIdsMap: Record<string, boolean> = {};
    if (colParams && limitParam && offsetParam) {
      const cols: { s: string[]; r: string[]; g: string[] } =
        JSON.parse(colParams);
      selectColumns = cols.s;
      generatedColumns = cols.g;
      relationColumns = cols.r;
      const flattenedColIds = cols.s.concat(cols.r.concat(cols.g));

      flattenedColIds.forEach((colId) => {
        flattenedColIdsMap[colId] = true;
      });
      mTableColumns.forEach((column, idx) => {
        if (flattenedColIdsMap[column.id]) {
          mTableColumns[idx] = { ...column, visible: true };
        } else {
          flattenedColIdsMap[column.id] = false;
          mTableColumns[idx] = { ...column, visible: false };
        }
      });
      mLimit = parseInt(limitParam, 10);
      mOffset = parseInt(offsetParam, 10);
    } else {
      mTableColumns.forEach((col) => {
        flattenedColIdsMap[col.id] = col.visible;
        if (col.visible) {
          if (col.isRelation) {
            relationColumns.push(col.id);
          } else if (col.isGenerated) {
            generatedColumns.push(col.id);
          } else {
            selectColumns.push(col.id);
          }
        }
      });
    }

    if (statusParam) {
      dispatch({
        type: "SET_STATUS",
        payload: { status: statusParam },
      });
    } else if (statusProps) {
      dispatch({
        type: "SET_STATUS",
        payload: { status: statusProps.defaultValue },
      });
    }
    if (dateRangeTypeParam === "All Time") {
      dispatch({
        type: "SET_DATE_RANGE",
        payload: {
          dateRangeType: dateRangeTypeParam,
          endDate: "All",
          startDate: "All",
        },
      });
    } else {
      dispatch({
        type: "SET_DATE_RANGE",
        payload: {
          dateRangeType: dateRangeTypeParam,
          endDate: endDateParam
            ? parse(endDateParam, EDGDateFormats.dgDateFormat, new Date())
            : addDays(new Date(), 1),
          startDate: startDateParam
            ? parse(startDateParam, EDGDateFormats.dgDateFormat, new Date())
            : subDays(new Date(), 21),
        },
      });
    }
    setColumnVisibility(flattenedColIdsMap);

    dispatch({
      type: "SET_VISIBLE_COLUMNS",
      payload: {
        columns: {
          selectColumns,
          generatedColumns,
          relationColumns,
        },
      },
    });
    dispatch({
      type: "SET_TABLE_COLS",
      payload: { tableColumns: mTableColumns },
    });
    dispatch({
      type: "SET_OFFSET_LIMIT",
      payload: { pageIndex: mOffset / mLimit, limit: mLimit },
    });

    const paramsObj: { st?: string; ds?: string; de?: string } = {};
    const cols: { s: string[]; r: string[]; g: string[] } = {
      s: selectColumns,
      r: relationColumns,
      g: generatedColumns,
    };
    const filterParams = {
      s: pFilters.selectColumns,
      r: pFilters.relationColumns,
      g: pFilters.generatedColumns,
    };
    if (dateRangeTypeParam !== "All Time") {
      paramsObj.ds =
        startDateParam ??
        format(subDays(new Date(), 21), EDGDateFormats.dgDateFormat);
      paramsObj.de =
        endDateParam ??
        format(addDays(new Date(), 1), EDGDateFormats.dgDateFormat);
    }
    if (dateRangeTypeParam === "All Time") {
      paramsObj.ds = "All";
      paramsObj.de = "All";
    }
    if (statusParam) {
      paramsObj.st = statusParam;
    } else if (statusProps?.defaultValue) {
      paramsObj.st = statusProps.defaultValue;
    }

    setSearchParams({
      ...paramsObj,
      drt: dateRangeTypeParam,
      c: JSON.stringify(cols),
      f: JSON.stringify(filterParams),
      l: limit,
      o: offset,
    });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Grid m={0}>
      <Grid.Col span={isSettingsOpen ? 8 : 12}>
        <Box
          bg="#ffffff"
          /* mx={40} mt={20} */ style={{
            borderRight: "1px solid #dee2e6",
            borderLeft: "1px solid #dee2e6",
            borderTop: "1px solid #dee2e6",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        >
          <Stack gap={0}>
            <Group justify="space-between" px={30} py={30}>
              <Group justify="left">
                <Text fw={500}>{tableName}</Text>
              </Group>
              <Group justify="left">
                <DataGridSearch
                  value={globalFilter ?? ""}
                  onChange={(value) => setGlobalFilter(String(value))}
                  placeholder="Search all columns..."
                />
                <ExportToExcel
                  rows={data}
                  fileName={tableName}
                  columns={actualTableColumns}
                />
                <ActionIcon onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
                  <IconSettings />
                </ActionIcon>
              </Group>
            </Group>
            <Box style={{ height: 600, overflowX: "auto" }}>
              <CustomDataGrid noData="No data" table={table} />
            </Box>
          </Stack>
        </Box>
        {paginationOptions.isManual ? (
          <ManualPagination
            totalRows={paginationOptions.totalRows}
            pageIndex={paginationOptions.pageIndex}
            setPageIndex={paginationOptions.setPageIndex}
            pageSize={paginationOptions.pageSize}
            setPageSize={paginationOptions.setPageSize}
          />
        ) : (
          <ActionButtons
            pageCount={table.getPageCount()}
            pageIndex={table.getState().pagination.pageIndex}
            pageSize={table.getState().pagination.pageSize}
            setPageIndex={table.setPageIndex}
            setPageSize={table.setPageSize}
            totalRows={table.getPrePaginationRowModel().rows.length}
          />
        )}
      </Grid.Col>
      {isSettingsOpen && (
        <Grid.Col span={4}>
          <DataGridSettings
            statusProps={statusProps}
            setIsOpen={setIsSettingsOpen}
          />
        </Grid.Col>
      )}
    </Grid>
  );
}

export function DataGrid<T>({
  columns,
  data,
  tableName,
  statusProps,
  loading,
  paginationOptions,
}: Props<T>) {
  return (
    <DataGridProvider>
      {loading && <LoadingTable tableName={tableName} columnsDef={columns} />}
      <MDataGrid
        paginationOptions={paginationOptions}
        columns={columns}
        data={data}
        loading={loading}
        tableName={tableName}
        statusProps={statusProps}
      />
    </DataGridProvider>
  );
}
