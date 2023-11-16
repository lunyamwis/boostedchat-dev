import { ColumnDefResolved } from "@tanstack/react-table";

export interface IDGProvider {
  dateRangeType: TDataGridDateRangeTypes;
  originalTableRows: any;
  currentTableRows: any;
  visibleColumns: IVisibleColumns;
  status: string | null;
  startDate: string | null;
  endDate: string | null;
  filters: IFilteredColumns;
  searchTerm: string;
  reportMode: boolean;
  limit: string;
  offset: string;
  sort: IDGSort[];
  tableColumns: ColDef<any>[];
  dispatch: React.Dispatch<TDataGridActions>;
}

export interface IDGFilter {
  columnId: string;
  value: string;
  operator: TFilterOperator;
}

interface IDGSort {
  column: string;
  direction: "ASC" | "DESC";
}

interface IVisibleColumns extends Record<TColumnTypeKey, string[]> {}
interface IFilteredColumns extends Record<TColumnTypeKey, IDGFilter[]> {}
export type TColumnType = "select" | "generated" | "relation";

export type TColumnTypeKey =
  | "selectColumns"
  | "relationColumns"
  | "generatedColumns";

export type TDataGridActions =
  | {
      type: "ADD_VISIBLE_COLUMN";
      payload: {
        columnType: TColumnType;
        columnId: string;
      };
    }
  | {
      type: "REMOVE_VISIBLE_COLUMN";
      payload: {
        columnType: TColumnType;
        columnId: string;
      };
    }
  | { type: "SET_VISIBLE_COLUMNS"; payload: { columns: IVisibleColumns } }
  | { type: "STATUS_CHANGE"; payload: { status: string } }
  | { type: "START_DATE_CHANGE"; payload: { startDate: string } }
  | { type: "END_DATE_CHANGE"; payload: { endDate: string } }
  | {
      type: "ADD_FILTER";
      payload: { columnType: TColumnType; filter: IDGFilter };
    }
  | {
      type: "REMOVE_FILTER";
      payload: { columnType: TColumnType; columnId: string };
    }
  | { type: "SET_FILTERS"; payload: { filters: IFilteredColumns } }
  | { type: "SEARCH_CHANGE"; payload: { val: string } }
  | { type: "REPORT_MODE_CHANGE"; payload: boolean }
  | { type: "LIMIT_CHANGE"; payload: { val: string } }
  | { type: "OFFSET_CHANGE"; payload: { val: string } }
  | { type: "ADD_SORT"; payload: { sort: IDGSort } }
  | { type: "SET_OFFSET_LIMIT"; payload: { pageIndex: number; limit: number } }
  | { type: "SET_TABLE_COLS"; payload: { tableColumns: ColDef<any>[] } }
  | { type: "SET_CURRENT_TABLE_ROWS"; payload: { currentTableRows: any[] } }
  | { type: "SET_ORIGINAL_TABLE_ROWS"; payload: { originalTableRows: any[] } }
  | { type: "SET_STATUS"; payload: { status: string | null | "All" } }
  | {
      type: "SET_DATE_RANGE";
      payload: {
        dateRangeType: TDataGridDateRangeTypes;
        startDate: null | Date | "All";
        endDate: Date | null | "All";
      };
    };

export type ColDef<T> = ColumnDefResolved<T> &
  (SingleSelectColDef | PrimitiveColDef);
export type TValueOptions = { value: string | boolean | number; label: string };

type SingleSelectColDef = {
  type: Extract<TColumnValueTypes, "singleSelect">;
  valueOptions: TValueOptions[] | string[];
} & TDefaultColDef;

type PrimitiveColDef = {
  type?: Exclude<TColumnValueTypes, "singleSelect">;
} & TDefaultColDef;

type TDefaultColDef = {
  visible: boolean;
  id: string;
  isGenerated?: boolean;
  isRelation?: boolean;
};

export type TColumnValueTypes =
  | "string"
  | "number"
  | "date"
  | "dateTime"
  | "boolean"
  | "actions"
  | "singleSelect";

export interface TStatusProps {
  columnId: string;
  defaultValue: string;
  allStatusLabel?: string;
}

export type TDataGridDateRangeTypes =
  | "All Time"
  | "Year"
  | "Month"
  | "Date"
  | "Date Range";

export type TStringOperators = "eq" | "ilike";
export type TNumberOperators = "eq" | "ne" | "gt" | "gte" | "lt" | "lte";
export type TDateOperators = "eq" | "ne" | "gt" | "gte" | "lt" | "lte";
export type TFilterOperator =
  | null
  | TStringOperators
  | TNumberOperators
  | TDateOperators;

export type TFilterOperatorAndType =
  | { type: "string"; operator: TStringOperators }
  | { type: "number"; operator: TNumberOperators }
  | { type: "boolean"; operator: TNumberOperators }
  | { type: "singleSelect" }
  | { type: "date"; operator: TDateOperators }
  | { type: "dateTime"; operator: TDateOperators };

export enum EDGDateFormats {
  dgDateFormat = "yyyy-MM-dd hh:mm:ss",
  shortDateWithTime = "dd/MMM/yyyy h:mm aaa",
  shortDateWithoutTime = "dd/MMM/yyyy",
}

export interface IApiSearchParams {
  columns: string;
  filters?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}
