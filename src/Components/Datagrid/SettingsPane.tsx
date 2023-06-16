import {
  Accordion,
  Box,
  Button,
  Checkbox,
  CloseButton,
  Divider,
  Group,
  ScrollArea,
  Select,
  SelectItem,
  Stack,
  Text,
} from "@mantine/core";
import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { useDataGrid } from "./Context/DataGridProvider";
import {
  ColDef,
  IDGFilter,
  TColumnType,
  TFilterOperator,
  TStatusProps,
} from "./datagrid.interface";
import {
  DATAGRID_FOOTER_HEIGHT,
  DATAGRID_HEADER_HEIGHT,
  DATAGRID_HEIGHT,
} from "./datagrid.constants";
import { FilterPanel } from "./Filters/FilterPanel";
import { DataGridDatePicker } from "./DateRange";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  statusProps?: TStatusProps;
}

export function DataGridSettings({ setIsOpen, statusProps }: Props) {
  const [_, setSearchParams] = useSearchParams();
  const {
    status: pStatus,
    tableColumns: pTableColumnsDef,
    dispatch,
    filters: pFilters,
    visibleColumns,
    limit: pLimit,
    offset: pOffset,
    startDate: pStartDate,
    endDate: pEndDate,
    dateRangeType: pDateRangeType,
  } = useDataGrid();
  const [mTableColumns, setMTableColumns] = React.useState(pTableColumnsDef);
  const [statusValue, setStatusValue] = React.useState<string | null>(
    pStatus ?? null,
  );

  const handleColumnVisibilityCheck = (
    colIdx: number,
    colId: string,
    e: React.ChangeEvent<HTMLInputElement>,
    isGenerated: boolean | undefined,
    isRelation: boolean | undefined,
  ) => {
    let colType: TColumnType = "select";
    if (isGenerated) {
      colType = "generated";
    } else if (isRelation) {
      colType = "relation";
    }

    if (e.target.checked) {
      dispatch({
        type: "ADD_VISIBLE_COLUMN",
        payload: { columnType: colType, columnId: colId },
      });
    } else {
      dispatch({
        type: "REMOVE_VISIBLE_COLUMN",
        payload: { columnType: colType, columnId: colId },
      });
    }

    const mCols = [...mTableColumns];
    mCols[colIdx].visible = e.target.checked;
    setMTableColumns(mCols);
  };

  const handleApplySettings = () => {
    dispatch({
      type: "SET_TABLE_COLS",
      payload: { tableColumns: mTableColumns },
    });
    const paramsObj: { st?: string; ds?: string; de?: string } = {};
    const cols: { s: string[]; r: string[]; g: string[] } = {
      s: visibleColumns.selectColumns,
      r: visibleColumns.relationColumns,
      g: visibleColumns.generatedColumns,
    };
    const filterParams = {
      s: pFilters.selectColumns,
      r: pFilters.relationColumns,
      g: pFilters.generatedColumns,
    };
    if (pStartDate && pEndDate) {
      paramsObj.ds = pStartDate;
      paramsObj.de = pEndDate;
    }
    if (pStatus) {
      paramsObj.st = pStatus;
    }

    setSearchParams({
      ...paramsObj,
      c: JSON.stringify(cols),
      f: JSON.stringify(filterParams),
      l: pLimit,
      o: pOffset,
      drt: pDateRangeType,
    });
  };

  const filteredVisibleColumns = React.useMemo(() => {
    const flattenedFilteredColumns = pFilters.generatedColumns.concat(
      pFilters.selectColumns.concat(pFilters.relationColumns),
    );

    const colIdMap: {
      [key: string]: { operator: TFilterOperator; value: string };
    } = {};
    flattenedFilteredColumns.forEach((filteredCol) => {
      colIdMap[filteredCol.columnId] = {
        value: filteredCol.value,
        operator: filteredCol.operator,
      };
    });
    const mFilteredColumns: Array<ColDef<any> & Omit<IDGFilter, "columnId">> =
      [];
    const mVisibleTableColumns: { label: string; value: string }[] = [];
    for (let i = 0; i < pTableColumnsDef.length; i += 1) {
      const tableCol = pTableColumnsDef[i];
      if (colIdMap[tableCol.id]) {
        const foundFilteredCol = colIdMap[tableCol.id];
        mFilteredColumns.push(Object.assign(tableCol, foundFilteredCol));
      } else {
        const colLabel = typeof tableCol.header === "string"
          ? tableCol.header
          : tableCol.id;
        const temp = { label: colLabel, value: tableCol.id };
        mVisibleTableColumns.push(temp);
      }
    }

    return {
      filteredColumns: mFilteredColumns,
      visibleColumns: mVisibleTableColumns,
    };
  }, [
    pFilters.selectColumns,
    pFilters.relationColumns,
    pFilters.generatedColumns,
    pTableColumnsDef,
  ]);

  const statusColumnDef = React.useMemo(() => {
    if (statusProps == null) return null;
    const mStatusCol = pTableColumnsDef.find(
      (col) => col.id === statusProps.columnId,
    );
    if (mStatusCol == null) {
      return null;
    }
    return mStatusCol;
  }, [statusProps, pTableColumnsDef]);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "4px",
        height: "100%",
        border: "1px solid #dee2e6",
        maxHeight: DATAGRID_HEIGHT + DATAGRID_FOOTER_HEIGHT +
          DATAGRID_HEADER_HEIGHT,
      }}
    >
      <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
        <Box>
          <Group mt={20} mx={10} position="apart">
            <Text>Table settings</Text>
            <CloseButton onClick={() => setIsOpen(false)} />
          </Group>
          <Divider mt={16} />
          <Accordion
            variant="separated"
            styles={{ control: { fontSize: 14 } }}
            p={16}
          >
            <Accordion.Item value="date">
              <Accordion.Control>Date range</Accordion.Control>
              <Accordion.Panel>
                <DataGridDatePicker />
              </Accordion.Panel>
            </Accordion.Item>
            {statusColumnDef &&
              statusColumnDef.type === "singleSelect" && (
              <Accordion.Item value="status">
                <Accordion.Control>Status</Accordion.Control>
                <Accordion.Panel>
                  <Group position="left" mx={16}>
                    <Select
                      placeholder="Status"
                      value={statusValue}
                      onChange={(val) => {
                        setStatusValue(val);
                        dispatch({
                          type: "SET_STATUS",
                          payload: { status: val },
                        });
                      }}
                      data={[
                        {
                          label: statusProps?.allStatusLabel
                            ? statusProps.allStatusLabel
                            : "All requests",
                          value: "All",
                        },
                        ...(statusColumnDef.valueOptions as (
                          | SelectItem
                          | string
                        )[]),
                      ]}
                      label="Status"
                    />
                  </Group>
                </Accordion.Panel>
              </Accordion.Item>
            )}
            <Accordion.Item value="columns">
              <Accordion.Control>Columns</Accordion.Control>
              <Accordion.Panel>
                <Box>
                  <ScrollArea.Autosize
                    scrollbarSize={5}
                    mah={200}
                    w="100%"
                    offsetScrollbars
                  >
                    <Stack mx={20}>
                      {mTableColumns.map((col, idx) => (
                        <Checkbox
                          key={Math.random().toString()}
                          label={typeof col.header === "string"
                            ? col.header
                            : col.id}
                          value={col.id}
                          checked={col.visible}
                          onChange={(e) =>
                            handleColumnVisibilityCheck(
                              idx,
                              col.id as string,
                              e,
                              col.isGenerated,
                              col.isRelation,
                            )}
                        />
                      ))}
                    </Stack>
                  </ScrollArea.Autosize>
                </Box>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="filters">
              <Accordion.Control>Filters</Accordion.Control>
              <Accordion.Panel>
                <FilterPanel filteredVisibleColumns={filteredVisibleColumns} />
              </Accordion.Panel>
            </Accordion.Item>
            {
              /*            <Accordion.Item value="sort">
              <Accordion.Control>Sort</Accordion.Control>
              <Accordion.Panel>
                <DataGridDatePicker />
              </Accordion.Panel>
            </Accordion.Item>
            */
            }
          </Accordion>
        </Box>
        <Box>
          <Divider />
          <Group position="right" mt={16} pb={16} pr={16}>
            <Button onClick={handleApplySettings}>Apply</Button>
          </Group>
        </Box>
      </Stack>
    </Box>
  );
}
