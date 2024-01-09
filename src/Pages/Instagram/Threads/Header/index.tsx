import {
  ActionIcon,
  Box,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import React from "react";

export function ChatHeader() {
  return (
    <Stack py={24}>
      <Group px={24} justify="space-between">
        <Text
          style={{
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          Conversations
        </Text>
        <Group>
          <ActionIcon variant="light">
            <IconFilter size={17} />
          </ActionIcon>
        </Group>
      </Group>
      <Divider />
      <Box px={24}>
        <TextInput
          variant="filled"
          leftSection={<IconSearch size={17} />}
          placeholder="Search..."
        />
      </Box>
    </Stack>
  );
}
