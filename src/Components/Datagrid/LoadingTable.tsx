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
import { IconSearch } from "@tabler/icons-react";
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
      style={{
        borderRight: "1px solid #dee2e6",
        borderLeft: "1px solid #dee2e6",
        borderTop: "1px solid #dee2e6",
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
      }}
    >
      <Stack gap={0}>
        <Group justify="space-between" px={30} py={30}>
          <Group justify="left">
            <Text fw={500}>{tableName}</Text>
          </Group>
          <Group justify="left">
            <TextInput
              leftSection={<IconSearch size={16} />}
              placeholder="Search all columns"
              readOnly
            />
            <Skeleton height={20} circle width={20} />
            <Skeleton height={20} circle width={20} />
          </Group>
        </Group>
        <Box style={{ height: 600, overflowX: "auto" }}>
          <MantineTable
            style={{
              tableLayout: "fixed",
            }}
            highlightOnHover
            verticalSpacing="lg"
          >
            <MantineTable.Thead
              style={{
                backgroundColor: "rgb(250, 250, 250)",
                borderTop: "1px solid rgb(240, 240, 240)",
                borderBottom: "1px solid rgb(240,240,240)",
              }}
            >
              <MantineTable.Tr>
                {columnsDef.map((col) => {
                  if (!col.visible) {
                    return null;
                  }
                  return (
                    <MantineTable.Th className="relative" key={col.id}>
                      <Group
                        justify="space-between"
                        style={{ flexWrap: "nowrap" }}
                      >
                        <Group gap={2} style={{ flexWrap: "nowrap" }}>
                          <Box
                            style={{
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
                          style={{
                            cursor: "col-resize",
                            touchAction: "none",
                            userSelect: "none",
                          }}
                          px={2}
                        />
                      </Group>
                    </MantineTable.Th>
                  );
                })}
              </MantineTable.Tr>
            </MantineTable.Thead>
            <MantineTable.Tbody
              style={{
                borderBottom: "1px solid #dee2e6",
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((o) => (
                <MantineTable.Tr key={o}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((c) => (
                    <MantineTable.Td key={c}>
                      <Skeleton height={12} key={c} width="70%" radius="xl" />
                    </MantineTable.Td>
                  ))}
                </MantineTable.Tr>
              ))}
            </MantineTable.Tbody>
          </MantineTable>
        </Box>
      </Stack>
    </Box>
  );
}
