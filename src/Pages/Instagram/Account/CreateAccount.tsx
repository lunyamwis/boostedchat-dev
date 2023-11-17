import React from "react";
import {
  ActionIcon,
  Alert,
  Button,
  Collapse,
  FileInput,
  Group,
  Modal,
  Stack,
  Tabs,
  TextInput,
  Tooltip,
} from "@mantine/core";
import {
  useAccountsWrapperApi,
  useBulkUploadAccounts,
} from "./Hooks/accounts.hook";
import { showNotification } from "@mantine/notifications";
import {
  IconAlertTriangle,
  IconCheck,
  IconDownload,
} from "@tabler/icons-react";
import { apiErrorMessage } from "../../../Utils/api.util";
import { axiosError } from "../../../Interfaces/general.interface";
import { useAlert } from "../../../Hooks/useAlert";
import { Link } from "react-router-dom";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CreateAccount({ isOpen, setIsOpen }: Props) {
  const { alertInfo, setAlertInfo, showAlert, setShowAlert } = useAlert();
  const [igName, setIgName] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [csvFile, setCsvFile] = React.useState<null | File>(null);
  const [accountTab, setAccountTab] = React.useState<string | null>("single");
  const bulkUploadAccounts = useBulkUploadAccounts();
  const { createAccount } = useAccountsWrapperApi();

  const handleCreateAccount = () => {
    setShowAlert(false);
    if (igName === "") {
      setShowAlert(true);
      setAlertInfo({
        title: "Error",
        color: "orange",
        message: "Please enter the Instagram name",
      });
      return;
    }

    createAccount.mutate(
      {
        full_name: fullName === "" ? null : fullName,
        igname: igName,
      },
      {
        onSuccess: () => {
          onModalClose();
          showNotification({
            color: "teal",
            message: "Account created successfully",
            icon: <IconCheck />,
          });
        },
        onError: (err) => {
          const errorMessage = apiErrorMessage(err as axiosError);
          showNotification({
            color: "red",
            message: errorMessage,
            icon: <IconAlertTriangle />,
          });
        },
      }
    );
  };

  const handleBulkUploadAccounts = () => {
    if (csvFile == null) {
      showNotification({
        color: "orange",
        message: "Please upload a file",
        icon: <IconAlertTriangle />,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file_uploaded", csvFile);
    bulkUploadAccounts.mutate(
      {
        formData,
      },
      {
        onSuccess: () => {
          onModalClose();
          showNotification({
            color: "teal",
            message: "Accounts uploaded successfully",
            icon: <IconCheck />,
          });
        },
        onError: (err) => {
          const errorMessage = apiErrorMessage(err as axiosError);
          showNotification({
            color: "red",
            message: errorMessage,
            icon: <IconAlertTriangle />,
          });
        },
      }
    );
  };

  function onModalClose() {
    setCsvFile(null);
    setIgName("");
    setFullName("");
    setAccountTab("single");
    setIsOpen(false);
  }
  return (
    <Modal
      opened={isOpen}
      onClose={() => {
        onModalClose();
      }}
      title="Create New Account"
    >
      <Tabs
        value={accountTab}
        onTabChange={setAccountTab}
        classNames={{ tabLabel: "material-tab" }}
      >
        <Tabs.List position="center">
          <Tabs.Tab value="single">Single</Tabs.Tab>
          <Tabs.Tab value="bulk">Bulk Upload</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="single" pt="xs">
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
            <TextInput
              label="Instagram username"
              withAsterisk={true}
              required
              value={igName}
              onChange={(e) => setIgName(e.target.value)}
            />
            <TextInput
              label="Full Name"
              withAsterisk={true}
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Group position="center">
              <Button
                loading={createAccount.isLoading}
                onClick={handleCreateAccount}
              >
                Create Account
              </Button>
            </Group>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="bulk" pt="xs">
          <Stack px={20} pb={8}>
            <Group position="right">
              <Tooltip label="Download template">
                <ActionIcon
                  color="brand"
                  variant="light"
                  size="lg"
                  component={Link}
                  to="../AccountTemplate.csv"
                  target="_blank"
                >
                  <IconDownload />
                </ActionIcon>
              </Tooltip>
            </Group>
            <Stack spacing={32}>
              <FileInput
                label="Accounts"
                placeholder="Click to choose a file"
                value={csvFile}
                onChange={setCsvFile}
              />
              <Group position="center">
                <Button
                  loading={createAccount.isLoading}
                  onClick={handleBulkUploadAccounts}
                >
                  Upload Accounts
                </Button>
              </Group>
            </Stack>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
}
