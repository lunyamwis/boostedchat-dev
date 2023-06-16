import {
  Box,
  Divider,
  Group,
  Skeleton,
  Stack,
  Table as MantineTable,
  Text,
  TextInput,
} from "@mantine/core";
import { RowData } from "@tanstack/react-table";
import React from "react";
import { Search } from "tabler-icons-react";
import { ColDef } from "./datagrid.interface";

type Props<T extends RowData> = {
  columnsDef: ColDef<T>[];
  tableName: string;
};

export function LoadingTable<T extends RowData>({
  columnsDef,
  tableName,
}: Props<T>) {
  return (
    <Box
      bg="#ffffff"
      sx={{
        borderRight: "1px solid #dee2e6",
        borderLeft: "1px solid #dee2e6",
        borderTop: "1px solid #dee2e6",
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
      }}
    >
      <Stack spacing={0}>
        <Group position="apart" px={30} py={30}>
          <Group position="left">
            <Text fw={500}>{tableName}</Text>
          </Group>
          <Group position="left">
            <TextInput
              icon={<Search size={16} />}
              placeholder="Search all columns"
              readOnly
            />
            <Skeleton height={20} circle width={20} />
            <Skeleton height={20} circle width={20} />
          </Group>
        </Group>
        <Box sx={{ height: 600, overflowX: "auto" }}>
          <MantineTable
            sx={{
              tableLayout: "fixed",
            }}
            highlightOnHover
            verticalSpacing="lg"
          >
            <thead
              style={{
                backgroundColor: "rgb(250, 250, 250)",
                borderTop: "1px solid rgb(240, 240, 240)",
                borderBottom: "1px solid rgb(240,240,240)",
              }}
            >
              <tr>
                {columnsDef.map((col) => {
                  if (!col.visible) {
                    return null;
                  }
                  return (
                    <th className="relative" key={col.id}>
                      <Group position="apart" sx={{ flexWrap: "nowrap" }}>
                        <Group spacing={2} sx={{ flexWrap: "nowrap" }}>
                          <Box
                            sx={{
                              textTransform: "uppercase",
                              fontSize: 12,
                              color: "#262626",
                              paddingRight: 0,
                              paddingLeft: 8,
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {col.header as string}
                          </Box>
                        </Group>
                        <Divider
                          orientation="vertical"
                          sx={{
                            cursor: "col-resize",
                            touchAction: "none",
                            userSelect: "none",
                          }}
                          px={2}
                        />
                      </Group>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody
              style={{
                borderBottom: "1px solid #dee2e6",
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((o) => (
                <tr key={o}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((c) => (
                    <td key={c}>
                      <Skeleton height={12} key={c} width="70%" radius="xl" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </MantineTable>
        </Box>
      </Stack>
    </Box>
  );
}
