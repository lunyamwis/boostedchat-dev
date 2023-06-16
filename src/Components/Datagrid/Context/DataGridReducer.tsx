/* eslint-disable no-case-declarations */
import { format } from "date-fns";
import {
  EDGDateFormats,
  IDGProvider,
  TColumnType,
  TColumnTypeKey,
  TDataGridActions,
} from "../datagrid.interface";

const getColType = (colType: TColumnType): TColumnTypeKey => {
  if (colType === "generated") {
    return "generatedColumns";
  }
  if (colType === "relation") {
    return "relationColumns";
  }
  return "selectColumns";
};

export const dataGridReducer: React.Reducer<IDGProvider, TDataGridActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case "ADD_VISIBLE_COLUMN":
      const mColumns = { ...state.visibleColumns };
      const mColType = getColType(action.payload.columnType);

      const mColumnIds = [...mColumns[mColType]];
      mColumnIds.push(action.payload.columnId);
      mColumns[mColType] = mColumnIds;
      return { ...state, visibleColumns: mColumns };
    case "SET_VISIBLE_COLUMNS":
      return { ...state, visibleColumns: action.payload.columns };
    case "REMOVE_VISIBLE_COLUMN":
      const nColumns = { ...state.visibleColumns };
      const nColType = getColType(action.payload.columnType);
      const nColumnIds = [...nColumns[nColType]];
      const columnIndex = nColumnIds.indexOf(action.payload.columnId);
      if (columnIndex === -1) {
        return { ...state };
      }
      nColumnIds.splice(columnIndex, 1);
      nColumns[nColType] = nColumnIds;
      return { ...state, visibleColumns: nColumns };
    case "SET_TABLE_COLS":
      return { ...state, tableColumns: action.payload.tableColumns };
    case "ADD_FILTER":
      const mFilters = { ...state.filters };
      const aFColType = getColType(action.payload.columnType);
      const aColFilters = [...mFilters[aFColType]];
      aColFilters.push(action.payload.filter);
      mFilters[aFColType] = aColFilters;
      return { ...state, filters: mFilters };
    case "REMOVE_FILTER":
      const rFilters = { ...state.filters };
      const rFColType = getColType(action.payload.columnType);
      const rColFilters = [...rFilters[rFColType]];
      const rFColumnIndex = rColFilters.findIndex(
        (colFilter) => colFilter.columnId === action.payload.columnId,
      );
      if (rFColumnIndex === -1) {
        return { ...state };
      }
      rColFilters.splice(rFColumnIndex, 1);
      rFilters[rFColType] = rColFilters;
      return { ...state, filters: rFilters };
    case "SET_FILTERS":
      return { ...state, filters: action.payload.filters };
    case "SET_OFFSET_LIMIT":
      const { pageIndex, limit } = action.payload;
      const offset = limit * pageIndex;
      return { ...state, limit: limit.toString(), offset: offset.toString() };
    case "SET_STATUS":
      return {
        ...state,
        status: action.payload.status === "" ? "All" : action.payload.status,
      };
    case "SET_DATE_RANGE":
      if (action.payload.endDate == null || action.payload.startDate == null) {
        return { ...state };
      }
      if (
        action.payload.startDate === "All" || action.payload.endDate === "All"
      ) {
        return {
          ...state,
          dateRangeType: action.payload.dateRangeType,
          startDate: "All",
          endDate: "All",
        };
      }
      return {
        ...state,
        dateRangeType: action.payload.dateRangeType,
        startDate: format(
          action.payload.startDate,
          EDGDateFormats.dgDateFormat,
        ),
        endDate: format(action.payload.endDate, EDGDateFormats.dgDateFormat),
      };

    default:
      return { ...state };
  }
};
