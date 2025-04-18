import React from "react";
import { GetSingleAccount } from "../../../../Interfaces/Instagram/account.interface";
import { EditDetailsContainer } from "../../../../Components/Containers/EditDetailsContainer";
import { useLoadingDialog } from "../../../../Hooks/useLoadingDialog";
import { Row } from "../../../../Components/Containers/Row";
import { Column } from "../../../../Components/Containers/Column";
import { Select } from "../../../../Components/Containers/Select";
import { TextField } from "../../../../Components/Containers/TextField";
import { DateField } from "../../../../Components/Containers/DateField";
import { ButtonRow } from "../../../../Components/FormComponents/ButtonRow";
import { Button } from "@mantine/core";
import { useUpdateAccount } from "../Hooks/accounts.hook";
import { showNotification } from "@mantine/notifications";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";

type Props = {
  account: GetSingleAccount;
};

export function EditDetails({ account }: Props) {
  const queryClient = useQueryClient();


  const {
    isLoadingDialogOpen,
    setIsLoadingDialogOpen,
    isDialogLoading,
    setIsDialogLoading,
    dialogMessage,
    setDialogMessage,
    closeLoadingDialog,
  } = useLoadingDialog();

  const [igname, setIgname] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [accountStatus, setAccountStatus] = React.useState<null | string>(null);
  const [outReachDate, setoutReachDate] = React.useState<Date | null>(null);
  const [respondedDate, setRespondedDate] = React.useState<Date | null>(null);
  const [callScheduleDate, setCallScheduleDate] = React.useState<Date | null>(null);
  const [closingDate, setClosingDate] = React.useState<Date | null>(null);
  const [wonDate, setWonDate] = React.useState<Date | null>(null);
  const [lostDate, setLostDate] = React.useState<Date | null>(null);
  const [successDate, setSuccessDate] = React.useState<Date | null>(null);

  const updateAccount = useUpdateAccount();

  const handleUpdateAccount = () => {
    if (igname === "") {
      showNotification({
        message: "The instagram username cannot be empty",
        color: "orange",
        icon: <IconAlertTriangle />,
      });
      return;
    }
    if (fullName === "") {
      showNotification({
        message: "The full name cannot be empty",
        color: "orange",
        icon: <IconAlertTriangle />,
      });
      return;
    }

    setIsDialogLoading(true);
    setIsLoadingDialogOpen(true);
    updateAccount.mutate(
      {
        id: account.id,
        data: {
          full_name: fullName,
          igname,
          status_id: accountStatus === "" ? null : account.status_id,
        },
      },
      {
        onSuccess: () => {
          setIsDialogLoading(false);
          setDialogMessage({
            ...dialogMessage,
            success: true,
            title: "Success",
            message: "The account has been updated successfully",
          });
          queryClient.invalidateQueries({
            queryKey: [queryKeys.instagram.accounts.getById, account.id],
          });
        },
        onError: (err) => {
          //const errMessage = apiErrorMessage(err );
          const errMessage = err.message;
          setIsDialogLoading(false);
          setDialogMessage({
            ...dialogMessage,
            success: false,
            title: "Error",
            message: errMessage,
          });
        },
      }
    );
  };

  React.useEffect(() => {
    setIgname(account?.igname ?? "");
    setFullName(account?.full_name ?? "");
    setAccountStatus(account?.status ?? null);
  }, [account]);

  return (
    <EditDetailsContainer
      loadingDialogProps={{
        dialogTitle: dialogMessage.title,
        loading: isDialogLoading,
        message: dialogMessage.message,
        isOpen: isLoadingDialogOpen,
        handleDialogClose: closeLoadingDialog,
      }}
    >
      <Row>
        <Column single>
          <TextField
            title="Instagram Username"
            textFieldProps={{
              value: igname,
              onChange: (e) => setIgname(e.target.value),
            }}
          />
          <TextField
            title="Full name"
            textFieldProps={{
              value: fullName,
              onChange: (e) => setFullName(e.target.value),
            }}
          />
          <Select
            title="Status"
            selectProps={{
              value: accountStatus,
              onChange: setAccountStatus,
              data: [{ value: "", label: "None" }],
              placeholder: "Choose",
              searchable: true,
            }}
          />

          <DateField
            title="Outreach Date"
            // date={outReachDate}
            value={outReachDate}
            setDate={setoutReachDate} />

          <DateField
            title="Responded Date"
            // date={respondedDate}
            value={respondedDate}
            setDate={setRespondedDate} />

          <DateField
            title="Call scheduled Date"
            // date={respondedDate}
            value={callScheduleDate}
            setDate={setCallScheduleDate} />

          <DateField
            title="Closing Date"
            // date={respondedDate}
            value={closingDate}
            setDate={setClosingDate} />

          <DateField
            title="Won Date"
            // date={respondedDate}
            value={wonDate}
            setDate={setWonDate} />

          <DateField
            title="Success Story Date"
            // date={respondedDate}
            value={successDate}
            setDate={setSuccessDate} />

          <DateField
            title="Lost Date"
            // date={respondedDate}
            value={lostDate}
            setDate={setLostDate} />

        </Column>

      </Row>

      <ButtonRow>
        <Button onClick={() => handleUpdateAccount()}>Update Account</Button>
      </ButtonRow>
    </EditDetailsContainer>
  );
}
