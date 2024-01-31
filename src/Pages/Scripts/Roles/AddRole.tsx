import { useScriptRoleApi } from "@/Apis/Prompts/Role.api";
import { queryKeys } from "@/Constants/ApiConstants";
import { CreateScriptRole } from "@/Interfaces/Scripts/role.interface";
import {
  Button,
  Group,
  Modal,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AddRole({ isOpen, setIsOpen }: Props) {
  const queryClient = useQueryClient();
  const [roleName, setRoleName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [toneOfVoice, setToneOfVoice] = React.useState("");

  const { create } = useScriptRoleApi();

  const createScriptRole = useMutation({
    mutationFn: (params: CreateScriptRole) => create(params),
  });

  const handleCreateRole = () => {
    if (roleName === "") {
      showNotification({
        message: "Please enter the instagram name",
        color: "red",
      });
      return;
    }
    if (description === "") {
      showNotification({
        message: "Please enter the role's description",
        color: "red",
      });
      return;
    }
    if (toneOfVoice === "") {
      showNotification({
        message: "Please enter the role's tone of voice",
        color: "red",
      });
      return;
    }

    createScriptRole.mutate(
      {
        tone_of_voice: toneOfVoice,
        name: roleName,
        description,
      },
      {
        onSuccess: () => {
          showNotification({
            message: "Role created successfully",
            color: "teal",
            icon: <IconCheck />,
          });
          queryClient.invalidateQueries({
            queryKey: [queryKeys.scripts.roles.allRoles],
          });
          handleModalClose();
        },
      },
    );
  };

  const handleModalClose = () => {
    setRoleName("");
    setDescription("");
    setToneOfVoice("");
    setIsOpen(false);
  };

  return (
    <Modal
      opened={isOpen}
      onClose={() => {
        handleModalClose();
      }}
      size="lg"
      title="Create new role"
    >
      <Stack>
        <TextInput
          label="Instagram name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autosize
        />
        <Textarea
          minRows={3}
          label="Tone of Voice"
          value={toneOfVoice}
          onChange={(e) => setToneOfVoice(e.target.value)}
          autosize
        />
        <Group>
          <Button
            onClick={handleCreateRole}
            loading={createScriptRole.isPending}
          >
            Create
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
