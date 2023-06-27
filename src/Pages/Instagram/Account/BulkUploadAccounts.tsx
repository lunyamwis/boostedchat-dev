import React from "react";
import { FormLayout } from "../../../Layouts/FormLayout";
import { Button, Group, Stack } from "@mantine/core";
import { ButtonRow } from "../../../Components/FormComponents/ButtonRow";
import { useBulkUploadAccounts } from "./Hooks/accounts.hook";
import { showNotification } from "@mantine/notifications";
import { AlertTriangle, Check } from "tabler-icons-react";
import { apiErrorMessage } from "../../../Utils/api.util";
import { axiosError } from "../../../Interfaces/general.interface";
import { FileWithPath } from "@mantine/dropzone";
import { Dropzone } from "../../../Components/MantineWrappers/Dropzone";
import { Link } from "react-router-dom";

export function BulkUploadAccounts() {
  const [csvFile, setCsvFile] = React.useState<null | FileWithPath>(null);
  const bulkUploadAccounts = useBulkUploadAccounts();

  const handleCreateAccount = () => {
    if (csvFile == null) {
      showNotification({
        color: "orange",
        message: "Please upload a file",
        icon: <AlertTriangle />,
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
          showNotification({
            color: "teal",
            message: "Accounts uploaded successfully",
            icon: <Check />,
          });
          setCsvFile(null);
        },
        onError: (err) => {
          const errorMessage = apiErrorMessage(err as axiosError);
          showNotification({
            color: "red",
            message: errorMessage,
            icon: <AlertTriangle />,
          });
        },
      }
    );
  };

  return (
    <FormLayout span={7} title="Bulk Upload Accounts">
      <Group position="right">
        <Button
          variant="subtle"
          component={Link}
          to="../AccountTemplate.csv"
          target="_blank"
        >
          Download Template
        </Button>
      </Group>
      <Stack mx={32}>
        <Dropzone file={csvFile} setFile={setCsvFile} />
      </Stack>
      <ButtonRow>
        <Button onClick={handleCreateAccount}>Upload File</Button>
      </ButtonRow>
    </FormLayout>
  );
}
