import { Box, Group, Pagination, Select, Text } from "@mantine/core";
import React, { useEffect } from "react";
import { useDataGrid } from "./Context/DataGridProvider";

type Props = {
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  totalRows: number;
};

export function ActionButtons({
  pageCount,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
  totalRows,
}: Props) {
  const { limit, offset, dispatch } = useDataGrid();

  useEffect(() => {
    setPageSize(parseInt(limit, 10));
    setPageIndex(Math.floor(parseInt(offset, 10)) / parseInt(limit, 10));
  }, [limit, offset, setPageSize, setPageIndex]);

  useEffect(() => {}, []);
  return (
    <Group
      justify="space-between"
      style={{
        borderTop: "1px solid #dee2e6",
        borderRight: "1px solid #dee2e6",
        borderLeft: "1px solid #dee2e6",
        borderBottom: "1px solid #dee2e6",
        backgroundColor: "white",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
      }}
      py={10}
      px={16}
    >
      <Box>
        {totalRows > 1 && (
          <Text>
            {pageIndex * pageSize + 1} -{" "}
            {totalRows <= pageSize * (pageIndex + 1)
              ? totalRows
              : (pageIndex + 1) * pageSize}{" "}
            of {totalRows}
          </Text>
        )}
      </Box>
      <Group>
        <Group gap={2}>
          <Text>Rows per page:</Text>
          <Select
            w={80}
            className="border p-1 rounded"
            value={pageSize.toString()}
            onChange={(val) => {
              if (val == null) return;
              dispatch({
                type: "SET_OFFSET_LIMIT",
                payload: { limit: parseInt(val, 10), pageIndex: 0 },
              });
            }}
            data={["2", "10", "25", "50", "100"]}
          />
        </Group>
        {
          // The pagination uses 1 based indices while react table uses 0-based indices
          // hence the +1 in value and -1 in dispactch
        }
        <Pagination
          size="sm"
          withEdges
          value={pageIndex + 1}
          onChange={(val) => {
            dispatch({
              type: "SET_OFFSET_LIMIT",
              payload: { limit: pageSize, pageIndex: val - 1 },
            });
          }}
          total={pageCount}
        />
      </Group>
    </Group>
  );
}
