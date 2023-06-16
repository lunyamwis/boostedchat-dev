import React, { createContext, useContext, useMemo, useReducer } from "react";
import { ColDef, IDGProvider } from "../datagrid.interface";
import { dataGridReducer } from "./DataGridReducer";

const dataGridDefaults: IDGProvider = {
  visibleColumns: {
    selectColumns: [],
    relationColumns: [],
    generatedColumns: [],
  },
  status: null,
  startDate: null,
  endDate: null,
  dateRangeType: "Date Range",
  filters: {
    selectColumns: [],
    relationColumns: [],
    generatedColumns: [],
  },
  searchTerm: "",
  reportMode: false,
  limit: "50",
  offset: "0",
  sort: [],
  tableColumns: [] as ColDef<any>[],
  dispatch: () => null,
};

const DataGridContext = createContext(dataGridDefaults);

export const useDataGrid = () => useContext(DataGridContext);

export function DataGridProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(dataGridReducer, dataGridDefaults);
  const values = useMemo(
    () => ({
      visibleColumns: state.visibleColumns,
      status: state.status,
      dateRangeType: state.dateRangeType,
      startDate: state.startDate,
      endDate: state.endDate,
      filters: state.filters,
      searchTerm: state.searchTerm,
      reportMode: state.reportMode,
      limit: state.limit,
      offset: state.offset,
      sort: state.sort,
      tableColumns: state.tableColumns,
      dispatch,
    }),
    [
      state.visibleColumns,
      state.dateRangeType,
      state.endDate,
      state.filters,
      state.limit,
      state.offset,
      state.reportMode,
      state.searchTerm,
      state.sort,
      state.startDate,
      state.status,
      state.tableColumns,
    ],
  );
  return (
    <DataGridContext.Provider value={values}>
      {children}
    </DataGridContext.Provider>
  );
}
