import { Box, Group, Text, useMantineTheme } from "@mantine/core";
import React from "react";
export function DateHolder({ isoDate }: { isoDate: string }) {
  const theme = useMantineTheme();
  return (
    <Group position="center">
      <Box
        sx={{
          backgroundColor: theme.colors.brand[0],
          borderRadius: "4px",
          padding: 8,
        }}
      >
        <Text fz={13}>{isoDate}</Text>
      </Box>
    </Group>
  );
}
