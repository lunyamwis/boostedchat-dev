import { useScriptRoleApi } from "@/Apis/Prompts/Role.api";
import { Error } from "@/Components/UIState/Error";
import { Loading } from "@/Components/UIState/Loading";
import { queryKeys } from "@/Constants/ApiConstants";
import { UpdateScriptRoleParams } from "@/Interfaces/Scripts/role.interface";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  roleId: string;
};

export function EditRole({ isOpen, setIsOpen, roleId }: Props) {
  const queryClient = useQueryClient();
  const [roleName, setRoleName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [toneOfVoice, setToneOfVoice] = React.useState("");

  const { getOne, update } = useScriptRoleApi();
  const scriptRoleQR = useQuery({
    queryKey: [queryKeys.scripts.roles.roleById, roleId],
    queryFn: () => getOne(roleId),
  });

  const updateScriptRole = useMutation({
    mutationFn: (params: UpdateScriptRoleParams) => update(params),
  });

  const handleUpdateRole = () => {
    if (scriptRoleQR.data == null) return;

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

    if (
      roleName === scriptRoleQR.data.name &&
      description === scriptRoleQR.data.description &&
      toneOfVoice === scriptRoleQR.data.tone_of_voice
    ) {
      showNotification({
        message: "No updates have been made.",
        color: "red",
      });
      return;
    }

    updateScriptRole.mutate(
      {
        id: roleId,
        data: {
          tone_of_voice: toneOfVoice,
          name: roleName,
          description,
        },
      },
      {
        onSuccess: () => {
          showNotification({
            message: "Role updated successfully",
            color: "teal",
            icon: <IconCheck />,
          });
          queryClient.invalidateQueries({
            queryKey: [queryKeys.scripts.roles.allRoles],
          });
          setIsOpen(false);
        },
      }
    );
  };

  React.useEffect(() => {
    if (scriptRoleQR.data == null) return;
    setRoleName(scriptRoleQR.data.name);
    setDescription(scriptRoleQR.data.description);
    setToneOfVoice(scriptRoleQR.data.tone_of_voice);
  }, [scriptRoleQR.data]);

  return (
    <Modal
      opened={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      size="lg"
    >
      {scriptRoleQR.isPending ? (
        <Loading />
      ) : scriptRoleQR.isError || scriptRoleQR.data == null ? (
        <Error
          errorText="There was a problem loading this script. Please try again."
          onClickAction={() => scriptRoleQR.refetch()}
        />
      ) : (
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
              onClick={handleUpdateRole}
              loading={updateScriptRole.isPending}
            >
              Update
            </Button>
          </Group>
        </Stack>
      )}
    </Modal>
  );
}
