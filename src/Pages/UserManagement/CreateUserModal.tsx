import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Check, X } from "tabler-icons-react";
import {
  Alert,
  Button,
  Collapse,
  Group,
  Modal,
  Stack,
  TextInput,
} from "@mantine/core";
import { capitalize, isValidEmail } from "../../Utils/validator.util";
import { axiosError } from "../../Interfaces/general.interface";
import { useAlert } from "../../Hooks/useAlert";
import { showNotification } from "@mantine/notifications";
import { useRegisterUser } from "./Hooks/userAccounts.hook";

type Props = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  queryKey: string[];
};
export function CreateUserModal({ isOpened, setIsOpened, queryKey }: Props) {
  const queryClient = useQueryClient();

  const { alertInfo, setAlertInfo, showAlert, setShowAlert } = useAlert();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const createUser = useRegisterUser();

  const handleCreateUser = () => {
    setShowAlert(false);
    if (firstName === "") {
      setShowAlert(true);
      setAlertInfo({
        title: "Error",
        color: "orange",
        message: "Please fill in the user's first name",
      });
      return;
    }
    if (lastName === "") {
      setShowAlert(true);
      setAlertInfo({
        title: "Error",
        color: "orange",
        message: "Please fill in the user's last name",
      });
      return;
    }
    if (email === "") {
      setShowAlert(true);
      setAlertInfo({
        title: "Error",
        color: "orange",
        message: "Please fill in the user's email address",
      });
      return;
    }
    if (!isValidEmail(email)) {
      setShowAlert(true);
      setAlertInfo({
        title: "Error",
        color: "red",
        message: "The email address is invalid",
      });
      return;
    }

    createUser.mutate(
      {
        first_name: capitalize(firstName),
        last_name: capitalize(lastName),
        email: email.trim().toLowerCase(),
        password: "Test12345",
      },
      {
        onSuccess: () => {
          showNotification({
            color: "teal",
            icon: <Check />,
            autoClose: 15000,
            title: "Success",
            message: "The user has been successfully created.",
          });

          queryClient.invalidateQueries(queryKey);
          setFirstName("");
          setLastName("");
          setEmail("");
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
    setFirstName("");
    setLastName("");
    setEmail("");
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
            icon={<AlertTriangle />}
            color="orange"
            title={alertInfo.title}
          >
            {alertInfo.message}
          </Alert>
        </Collapse>
        <Stack p={20}>
          <TextInput
            label="First Name"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextInput
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            label="Last Name"
          />

          <TextInput
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
          />
          <Group sx={{ marginTop: 8 }} position="center">
            <Button onClick={handleCreateUser} loading={createUser.isLoading}>
              Create User
            </Button>
          </Group>
        </Stack>
      </Stack>
    </Modal>
  );
}
