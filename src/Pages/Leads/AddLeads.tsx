import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Check, X } from "tabler-icons-react";
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
import { showNotification } from "@mantine/notifications";
import { axiosError } from "../../Interfaces/general.interface";
import { useAlert } from "../../Hooks/useAlert";
import { useGetAccounts } from "../Instagram/Account/Hooks/accounts.hook";
import { useCreateLead } from "./Hooks/leads.hook";

type Props = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  queryKey: string[];
};
export function AddLead({ isOpened, setIsOpened, queryKey }: Props) {
  const queryClient = useQueryClient();

  const { alertInfo, setAlertInfo, showAlert, setShowAlert } = useAlert();

  const [userId, setUserId] = useState<string | null>(null);

  const createLead = useCreateLead();

  const userQR = useGetAccounts();

  const [userAccounts, setUserAccounts] = React.useState<SelectItem[]>([]);

  React.useEffect(() => {
    if (userQR.data == null) return;

    const mUserAccounts: SelectItem[] = [];
    for (let i = 0; i < userQR.data.accounts.length; i++) {
      mUserAccounts.push({
        label: userQR.data.accounts[i].igname,
        value: userQR.data.accounts[i].id,
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

    createLead.mutate(
      {
        instagram: userId,
      },
      {
        onSuccess: () => {
          showNotification({
            color: "teal",
            icon: <Check />,
            autoClose: 15000,
            title: "Success",
            message: "Lead successfully assigned",
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
            icon: <X />,
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
    <Modal opened={isOpened} title="New lead" onClose={onDialogClose}>
      <Stack>
        <Collapse
          in={showAlert}
          sx={{
            marginBottom: showAlert ? 2 : 0,
            marginTop: showAlert ? 1 : 0,
          }}
        >
          <Alert
            icon={<AlertTriangle />}
            color="orange"
            title={alertInfo.title}
          >
            {alertInfo.message}
          </Alert>
        </Collapse>
        <Stack p={20}>
          <Select
            label="Instagram Account"
            data={userAccounts}
            value={userId}
            placeholder="Select an instagram account"
            required
            onChange={setUserId}
          />
          <Group sx={{ marginTop: 8 }} position="center">
            <Button onClick={handleCreateUser} loading={createLead.isLoading}>
              Make lead
            </Button>
          </Group>
        </Stack>
      </Stack>
    </Modal>
  );
}
