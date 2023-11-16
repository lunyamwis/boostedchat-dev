import React from "react";
import { useAssignSalseRep } from "../Hooks/salesRepresentatives.hook";
import { Button, Group, Modal, Select, Stack } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { apiErrorMessage } from "../../../Utils/api.util";
import { axiosError } from "../../../Interfaces/general.interface";

export function AssignSalesRepresentatives() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <Group position="right">
      <Button onClick={() => setIsModalOpen(true)}>
        Assign Sales Representatives
      </Button>
      <AssignSalesRepModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </Group>
  );
}

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AssignSalesRepModal({ isOpen, setIsOpen }: Props) {
  const [reaction, setReaction] = React.useState<null | string>(null);

  const assignSales = useAssignSalseRep();
  const handleAssign = () => {
    if (reaction == null) {
      showNotification({
        message: "Please select a reaction.",
        color: "orange",
      });
      return;
    }
    assignSales.mutate(parseInt(reaction), {
      onSuccess: () => {
        showNotification({
          color: "teal",
          message: "Accounts assigned successfully.",
          icon: <IconCheck />,
        });
        setIsOpen(false);
      },
      onError: (err) => {
        const errorMessage = apiErrorMessage(err as axiosError);
        showNotification({
          color: "red",
          message: errorMessage,
          title: "Errror",
        });
      },
    });
  };

  return (
    <Modal
      title="Assign Sales representative"
      opened={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Stack py={100}>
        <Select
          data={[
            { value: "1", label: "Comment" },
            {
              value: "2",
              label: "Direct Message",
            },
            { value: "3", label: "Like" },
          ]}
          placeholder="Choose"
          value={reaction}
          onChange={(val) => setReaction(val)}
          label="Choose Reaction"
        />
        <Button loading={assignSales.isLoading} onClick={handleAssign}>
          Assign
        </Button>
      </Stack>
    </Modal>
  );
}
