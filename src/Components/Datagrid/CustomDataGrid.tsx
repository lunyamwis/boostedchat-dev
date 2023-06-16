import {
  ActionIcon,
  Box,
  Divider,
  Group,
  Table as MantineTable,
} from '@mantine/core';
import { flexRender, RowData, Table } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowsVertical } from 'tabler-icons-react';
import React from 'react';

type Props<T extends RowData> = {
  table: Table<T>;
  noData: string;
};

export function CustomDataGrid<T extends RowData>({ table, noData }: Props<T>) {
  return (
    <MantineTable
      sx={{
        tableLayout: 'fixed',
      }}
      highlightOnHover
      verticalSpacing='md'
    >
      <thead
        style={{
          backgroundColor: 'rgb(250, 250, 250)',
          borderTop: '1px solid rgb(240, 240, 240)',
          borderBottom: '1px solid rgb(240,240,240)',
        }}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                className='relative'
                key={header.id}
                style={{
                  width: header.getSize(),
                }}
                colSpan={header.colSpan}
              >
                {header.isPlaceholder ? null : (
                  <Group position='apart' sx={{ flexWrap: 'nowrap' }}>
                    <Group spacing={2} sx={{ flexWrap: 'nowrap' }}>
                      <Box
                        sx={{
                          textTransform: 'uppercase',
                          fontSize: 12,
                          color: '#262626',
                          paddingRight: 0,
                          paddingLeft: 8,
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </Box>
                      <ActionIcon
                        variant='subtle'
                        radius='xl'
                        size='xs'
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.column.getIsSorted() === 'asc' && (
                          <ArrowUp size={15} />
                        )}
                        {header.column.getIsSorted() === 'desc' && (
                          <ArrowDown size={15} />
                        )}
                        {header.column.getIsSorted() === false && (
                          <ArrowsVertical size={15} />
                        )}
                      </ActionIcon>
                    </Group>
                    <Divider
                      orientation='vertical'
                      sx={{
                        cursor: 'col-resize',
                        touchAction: 'none',
                        userSelect: 'none',
                      }}
                      px={2}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                    />
                  </Group>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody
        style={{
          borderBottom: '1px solid #dee2e6',
        }}
      >
        {table.getRowModel().rows.length > 0 ? (
          <>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    <Box
                      sx={{
                        WebkitLineClamp: 1,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Box>
                  </td>
                ))}
              </tr>
            ))}
          </>
        ) : (
          <tr>
            <td
              style={{ textAlign: 'center' }}
              rowSpan={7}
              colSpan={table.getLeafHeaders().length}
            >
              {noData}
            </td>
          </tr>
        )}
      </tbody>
    </MantineTable>
  );
}
