import { Box, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";

type Props = {};

type AssignedTabLabels = "All" | "Mine";
type TabItemProps = {
  label: AssignedTabLabels;
  selectedTab: AssignedTabLabels;
  setSelectedTab: React.Dispatch<React.SetStateAction<AssignedTabLabels>>;
};
function TabItem({ label, selectedTab, setSelectedTab }: TabItemProps) {
  const theme = useMantineTheme();
  return (
    <Stack
      style={{ cursor: "pointer", minWidth: 32 }}
      onClick={() => setSelectedTab(label)}
      gap={0}
    >
      <Text style={{ textAlign: "center" }}>{label}</Text>
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

export function AssignedTabs({}: Props) {
  const [selected, setSelected] = React.useState<"All" | "Mine">("All");
  return (
    <Stack px={24}>
      <Group>
        <TabItem
          label="All"
          selectedTab={selected}
          setSelectedTab={setSelected}
        />
        <TabItem
          label="Mine"
          selectedTab={selected}
          setSelectedTab={setSelected}
        />
      </Group>
    </Stack>
  );
}
