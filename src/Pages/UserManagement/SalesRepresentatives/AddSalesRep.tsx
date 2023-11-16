import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IconAlertTriangle, IconCheck, IconX } from "@tabler/icons-react";
import {
  Alert,
  Button,
  Collapse,
  Group,
  Modal,
  Select,
  SelectItem,
  Stack,
} from "@mantine/core";
import { useCreateSalesRep } from "../Hooks/salesRepresentatives.hook";
import { showNotification } from "@mantine/notifications";
import { axiosError } from "../../../Interfaces/general.interface";
import { useAlert } from "../../../Hooks/useAlert";
import { useGetUserAccounts } from "../Hooks/userAccounts.hook";

type Props = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  queryKey: string[];
};
export function AddSalesRepModal({ isOpened, setIsOpened, queryKey }: Props) {
  const queryClient = useQueryClient();

  const { alertInfo, setAlertInfo, showAlert, setShowAlert } = useAlert();

  const [userId, setUserId] = useState<string | null>(null);

  const createSalesRep = useCreateSalesRep();

  const userQR = useGetUserAccounts();

  const [userAccounts, setUserAccounts] = React.useState<SelectItem[]>([]);

  React.useEffect(() => {
    if (userQR.data == null) return;

    const mUserAccounts: SelectItem[] = [];
    for (let i = 0; i < userQR.data.users.length; i++) {
      mUserAccounts.push({
        label:
          userQR.data.users[i].first_name +
          " " +
          userQR.data.users[i].last_name,
        value: userQR.data.users[i].id,
      });
    }
    setUserAccounts(mUserAccounts);
  }, [userQR.data]);

  const handleCreateUser = () => {
    setShowAlert(false);
    if (userId == null) {
      setShowAlert(true);
      setAlertInfo({
        title: "Error",
        color: "orange",
        message: "Please select a user",
      });
      return;
    }

    createSalesRep.mutate(
      {
        user: userId,
      },
      {
        onSuccess: () => {
          showNotification({
            color: "teal",
            icon: <IconCheck />,
            autoClose: 15000,
            title: "Success",
            message:
              "The user has successfully been made a sales representative",
          });

          queryClient.invalidateQueries(queryKey);
          setUserId(null);
          setIsOpened(false);
        },
        onError: (error) => {
          const err = error as axiosError;
          const msg = err.data;
          setShowAlert(true);
          setAlertInfo({
            color: "red",
            icon: <IconX />,
            title: "Error",
            message: msg,
          });
        },
      }
    );
  };

  const onDialogClose = () => {
    setIsOpened(false);
    setShowAlert(false);
    setUserId(null);
  };

  return (
    <Modal
      opened={isOpened}
      title="Create new user"
      size="xl"
      onClose={onDialogClose}
    >
      <Stack>
        <Collapse
          in={showAlert}
          sx={{
            marginBottom: showAlert ? 2 : 0,
            marginTop: showAlert ? 1 : 0,
          }}
        >
          <Alert
            icon={<IconAlertTriangle />}
            color="orange"
            title={alertInfo.title}
          >
            {alertInfo.message}
          </Alert>
        </Collapse>
        <Stack p={20}>
          <Select
            label="User"
            data={userAccounts}
            value={userId}
            placeholder="Select a user"
            required
            onChange={setUserId}
          />
          <Group sx={{ marginTop: 8 }} position="center">
            <Button
              onClick={handleCreateUser}
              loading={createSalesRep.isLoading}
            >
              Make Sales Representative
            </Button>
          </Group>
        </Stack>
      </Stack>
    </Modal>
  );
}
