import { FilterMeta, Row, sortingFns } from "@tanstack/react-table";
import {
  compareItems,
  RankingInfo,
  rankItem,
} from "@tanstack/match-sorter-utils";
import { TFilterOperatorAndType, IApiSearchParams } from "./datagrid.interface";

export const fuzzyFilter = <T>(
  row: Row<T>,
  columnId: string,
  value: any,
  addMeta: (meta: FilterMeta) => void,
) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the ranking info
  addMeta(itemRank);

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const fuzzySort = <T>(rowA: Row<T>, rowB: Row<T>, columnId: string) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]! as RankingInfo,
      rowB.columnFiltersMeta[columnId]! as RankingInfo,
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export const mapFilterOperator = (
  payload: TFilterOperatorAndType,
) => {
  const stringOperators = {
    eq: "is",
    ilike: "contains",
  };
  const numberOperators = {
    eq: "equals",
    ne: "is not equal to",
    gt: "is greater than",
    gte: "is greater than or equal to",
    lt: "is less than",
    lte: "is less than or equal to",
  };
  const dateOperators = {
    eq: "is on",
    ne: "is not on",
    gt: "is after",
    gte: "is on or after",
    lt: "is before",
    lte: "is on or before",
  };
  if (payload.type === "string") {
    return stringOperators[payload.operator];
  }
  if (payload.type === "number") {
    return numberOperators[payload.operator];
  }
  if (payload.type === "date" || payload.type === "dateTime") {
    return dateOperators[payload.operator];
  }
  if (payload.type === "singleSelect") {
    return "is";
  }
  return "is";
};

export const formatApiSearchParams = (params: IApiSearchParams) => {
  const { columns, filters, status, startDate, endDate } = params;
  let filterStr = "";
  let statusStr = "";
  let dateStr = "";

  if (filters) {
    filterStr = `&f=${filters}`;
  }
  if (status) {
    statusStr = `&st=${status}`;
  }
  if (startDate && endDate) {
    dateStr = `&ds=${startDate}&de=${endDate}`;
  }
  return `?c=${columns}${filterStr}${statusStr}${dateStr}`;
};
