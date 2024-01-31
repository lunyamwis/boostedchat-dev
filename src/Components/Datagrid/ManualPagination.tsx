import { Box, Group, Pagination, Select, Text } from "@mantine/core";
import React from "react";

type Props = {
  totalRows: number;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
};

export function ManualPagination({
  totalRows,
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
}: Props) {
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
            {(pageIndex - 1) * pageSize + 1} -{" "}
            {totalRows <= pageSize * pageIndex
              ? totalRows
              : pageIndex * pageSize}{" "}
            of {totalRows}
          </Text>
        )}
      </Box>
      <Group>
        <Group gap={2}>
          <Text>Rows per page:</Text>
          <Select
            w={80}
            value={pageSize.toString()}
            onChange={(val) => {
              if (val == null) return;
              setPageSize(parseInt(val));
            }}
            data={["10", "25", "50", "100"]}
          />
        </Group>
        {
          // The pagination uses 1 based indices while react table uses 0-based indices
          // hence the +1 in value and -1 in dispactch
        }
        <Pagination
          size="sm"
          withEdges
          value={pageIndex}
          onChange={(val) => {
            setPageIndex(val);
          }}
          total={Math.ceil(totalRows / pageSize)}
        />
      </Group>
    </Group>
  );
}
