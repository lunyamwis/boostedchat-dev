import { ActionIcon, Badge, Group, Select, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconPencil, IconX } from "@tabler/icons-react";
import React from "react";

export function EditStage() {
  const [editingStage, setEditingStage] = React.useState(false);

  const handleEditStage = (stage: string) => {
    openConfirmModal({
      title: "Alert",
      children: (
        <Text size="sm">Are you sure you want to edit this lead's stage?</Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => console.log(stage),
    });
  };

  return editingStage ? (
    <Group>
      <Select
        data={[
          { value: "1", label: "Rapport Building" },
          { value: "2", label: "Needs Assessment" },
          { value: "3", label: "Solution Presentation" },
          { value: "4", label: "Closing the sale" },
        ]}
        defaultValue={"4"}
        onChange={(val) => handleEditStage(val as string)}
      />
      <ActionIcon
        onClick={() => setEditingStage(false)}
        variant="light"
        size="sm"
      >
        <IconX size={17} />
      </ActionIcon>
    </Group>
  ) : (
    <Group>
      <Badge
        variant="light"
        radius="sm"
        styles={{
          label: {
            fontWeight: 500,
            textTransform: "capitalize",
          },
        }}
      >
        Closng the sale
      </Badge>
      <ActionIcon
        variant="light"
        onClick={() => setEditingStage(true)}
        size="sm"
      >
        <IconPencil size={17} />
      </ActionIcon>
    </Group>
  );
}
