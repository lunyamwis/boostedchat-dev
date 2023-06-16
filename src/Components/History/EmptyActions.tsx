import { Box, Text } from '@mantine/core';
import React from 'react';

export function EmptyActions() {
  return (
    <Box
      display="flex"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Text fz={13} color="#777">
        No actions to show
      </Text>
    </Box>
  );
}
