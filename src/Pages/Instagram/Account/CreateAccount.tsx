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
import { useAlert } from "../../../Hooks/useAlert";
import { Link } from "react-router-dom";
import { DateField } from "@/Components/Containers/DateField";
import dayjs from 'dayjs';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CreateAccount({ isOpen, setIsOpen }: Props) {
  const { alertInfo, setAlertInfo, showAlert, setShowAlert } = useAlert();
  const [igName, setIgName] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [outReachDate, setoutReachDate] = React.useState<Date | null>(null);
  const [respondedDate, setRespondedDate] = React.useState<Date | null>(null);
  const [callScheduleDate, setCallScheduleDate] = React.useState<Date | null>(null);
  const [closingDate, setClosingDate] = React.useState<Date | null>(null);
  const [wonDate, setWonDate] = React.useState<Date | null>(null);
  const [lostDate, setLostDate] = React.useState<Date | null>(null);
  const [successDate, setSuccessDate] = React.useState<Date | null>(null);
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
        full_name: fullName === "" ? "" : fullName,
        igname: igName,
        won_date: wonDate == null ? null : dayjs(wonDate).format('YYYY-MM-DD'),
        lost_date: lostDate == null ? null : dayjs(lostDate).format('YYYY-MM-DD'),
        success_story_date: successDate == null ? null : dayjs(successDate).format('YYYY-MM-DD'),
        outreach_time: outReachDate == null ? null : dayjs(outReachDate).format('YYYY-MM-DD'),
        responded_date: respondedDate == null ? null : dayjs(respondedDate).format('YYYY-MM-DD'),
        call_scheduled_date: callScheduleDate == null ? null : dayjs(callScheduleDate).format('YYYY-MM-DD'),
        closing_date: closingDate == null ? null : dayjs(closingDate).format('YYYY-MM-DD'),
        status_id: null,
        status_param: null,
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
          //const errorMessage = apiErrorMessage(err as axiosError);
          const errorMessage = err.message;
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
          //const errorMessage = apiErrorMessage(err as axiosError);
          const errorMessage = err.message;
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
    setoutReachDate(null);
    setRespondedDate(null);
    setCallScheduleDate(null);
    setClosingDate(null);
    setWonDate(null);
    setLostDate(null);
    setSuccessDate(null);

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
        onChange={setAccountTab}
        classNames={{ tabLabel: "material-tab" }}
      >
        <Tabs.List justify="center">
          <Tabs.Tab value="single">Single</Tabs.Tab>
          <Tabs.Tab value="bulk">Bulk Upload</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="single" pt="xs">
          <Collapse
            in={showAlert}
            style={{
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
            <DateField
              title="Outreach Date"
              // date={outReachDate}
              value={outReachDate}
              valueFormat="YYYY-MM-DD"
              setDate={setoutReachDate} />

            <DateField
              title="Responded Date"
              // date={respondedDate}
              valueFormat="YYYY-MM-DD"
              value={respondedDate}
              setDate={setRespondedDate} />

            <DateField
              title="Call scheduled Date"
              // date={respondedDate}
              valueFormat="YYYY-MM-DD"
              value={callScheduleDate}
              setDate={setCallScheduleDate} />

            <DateField
              title="Closing Date"
              // date={respondedDate}
              valueFormat="YYYY-MM-DD"
              value={closingDate}
              setDate={setClosingDate} />

            <DateField
              title="Won Date"
              // date={respondedDate}
              valueFormat="YYYY-MM-DD"
              value={wonDate}
              setDate={setWonDate} />

            <DateField
              title="Success Story Date"
              // date={respondedDate}
              valueFormat="YYYY-MM-DD"
              value={successDate}
              setDate={setSuccessDate} />

            <DateField
              title="Lost Date"
              // date={respondedDate}
              valueFormat="YYYY-MM-DD"
              value={lostDate}
              setDate={setLostDate} />
            <Group justify="center">
              <Button
                loading={createAccount.isPending}
                onClick={handleCreateAccount}
              >
                Create Account
              </Button>
            </Group>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="bulk" pt="xs">
          <Stack px={20} pb={8}>
            <Group justify="right">
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
            <Stack gap={32}>
              <FileInput
                label="Accounts"
                placeholder="Click to choose a file"
                value={csvFile}
                onChange={setCsvFile}
              />
              <Group justify="center">
                <Button
                  loading={createAccount.isPending}
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
