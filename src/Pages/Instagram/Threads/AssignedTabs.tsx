import { Badge, Box, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";

type Props = {
  count: number;
};

type AssignedTabLabels = "All" | "Mine";
type TabItemProps = {
  label: AssignedTabLabels;
  selectedTab: AssignedTabLabels;
  setSelectedTab: React.Dispatch<React.SetStateAction<AssignedTabLabels>>;
  count: number;
};
function TabItem({ label, selectedTab, setSelectedTab, count }: TabItemProps) {
  const theme = useMantineTheme();
  return (
    <Stack
      style={{ cursor: "pointer", minWidth: 32 }}
      onClick={() => setSelectedTab(label)}
      gap={0}
    >
      <Group justify="center">
        <Text style={{ textAlign: "center" }}>{label}</Text>
        {count > 0 && <Badge variant="light">{count}</Badge>}
      </Group>
      <Box
        h={3}
        style={{
          backgroundColor:
            selectedTab === label ? theme.colors.brand[6] : "transparent",
        }}
      />
    </Stack>
  );
}

export function AssignedTabs({ count }: Props) {
  const [selected, setSelected] = React.useState<"All" | "Mine">("All");
  return (
    <Stack px={24}>
      <Group>
        <TabItem
          label="All"
          selectedTab={selected}
          setSelectedTab={setSelected}
          count={count}
        />
        <TabItem
          label="Mine"
          selectedTab={selected}
          setSelectedTab={setSelected}
          count={0}
        />
      </Group>
    </Stack>
  );
}
