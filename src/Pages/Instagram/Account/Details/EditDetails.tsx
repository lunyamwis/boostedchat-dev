import React from "react";
import { AccountStatusParam, AccountAssignedTo, GetSingleAccount } from "../../../../Interfaces/Instagram/account.interface";
import { EditDetailsContainer } from "../../../../Components/Containers/EditDetailsContainer";
import { useLoadingDialog } from "../../../../Hooks/useLoadingDialog";
import { Row } from "../../../../Components/Containers/Row";
import { Column } from "../../../../Components/Containers/Column";
import { Select } from "../../../../Components/Containers/Select";
import { TextField } from "../../../../Components/Containers/TextField";
import { DateField } from "../../../../Components/Containers/DateField";
import { ButtonRow } from "../../../../Components/FormComponents/ButtonRow";
import { Button, SimpleGrid } from "@mantine/core";
import { useUpdateAccount } from "../Hooks/accounts.hook";
import { showNotification } from "@mantine/notifications";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../Constants/ApiConstants";
import dayjs from 'dayjs';

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
  const [accountStatusParam, setAccountStatusParam] = React.useState<null | string>(null);
  const [outReachDate, setoutReachDate] = React.useState<Date | null>(null);
  const [respondedDate, setRespondedDate] = React.useState<Date | null>(null);
  const [salesQualifiedDate, setSalesQualifiedDate] = React.useState<Date | null>(null);
  const [callScheduleDate, setCallScheduleDate] = React.useState<Date | null>(null);
  const [closingDate, setClosingDate] = React.useState<Date | null>(null);
  const [wonDate, setWonDate] = React.useState<Date | null>(null);
  const [lostDate, setLostDate] = React.useState<Date | null>(null);
  const [successDate, setSuccessDate] = React.useState<Date | null>(null);
  const [qualified, setQualified] = React.useState<null | string>(null);
  const [outreach_success, setOutreachSuccess] = React.useState<null | string>(null)
  const [engagementVersion, setEngagementVersion] = React.useState("")
  const [assignedTo, setAssignedTo] = React.useState<null | string>(null);

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
    // if (fullName === "") {
    //   showNotification({
    //     message: "The full name cannot be empty",
    //     color: "orange",
    //     icon: <IconAlertTriangle />,
    //   });
    //   return;
    // }

    let stparam = AccountStatusParam.none;
    switch (accountStatusParam) {
      case 'Prequalified':
        stparam = AccountStatusParam.prequalified;
        break;
      case 'Sales Qualified':
        stparam = AccountStatusParam.sales_qualified;
        break;
      case 'Won':
        stparam = AccountStatusParam.won;
        break;
      case 'Lost':
        stparam = AccountStatusParam.lost;
        break;
      default:
        console.log("else", accountStatusParam);
        stparam = AccountStatusParam.none;
    }

    let assignedToParam = AccountAssignedTo.robot
    switch (assignedTo) {
      case 'Human':
        assignedToParam = AccountAssignedTo.human;
        break;
      case 'Robot':
        assignedToParam = AccountAssignedTo.robot;
        break;
      default:
        assignedToParam = AccountAssignedTo.robot;
    }


    setIsDialogLoading(true);
    setIsLoadingDialogOpen(true);
    updateAccount.mutate(
      {
        id: account.id,
        data: {
          full_name: fullName,
          igname,
          status_id: accountStatusParam == null ? null : account.status_id,
          status_param: stparam,
          won_date: wonDate == null ? null : dayjs(wonDate).format('YYYY-MM-DD'),
          lost_date: lostDate == null ? null : dayjs(lostDate).format('YYYY-MM-DD'),
          success_story_date: successDate == null ? null : dayjs(successDate).format('YYYY-MM-DD'),
          outreach_time: outReachDate == null ? null : dayjs(outReachDate).format('YYYY-MM-DD'),
          responded_date: respondedDate == null ? null : dayjs(respondedDate).format('YYYY-MM-DD'),
          call_scheduled_date: callScheduleDate == null ? null : dayjs(callScheduleDate).format('YYYY-MM-DD'),
          closing_date: closingDate == null ? null : dayjs(closingDate).format('YYYY-MM-DD'),
          outreach_success: outreach_success,
          sales_qualified_date: salesQualifiedDate == null ? null : dayjs(outReachDate).format('YYYY-MM-DD'),
          assigned_to: assignedToParam,
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
    setAccountStatusParam(account?.status_param ?? null);
    setoutReachDate(account?.outreach_time ? new Date(account.outreach_time) : null);
    setRespondedDate(account?.responded_date ? new Date(account.responded_date) : null);
    setCallScheduleDate(account?.call_scheduled_date ? new Date(account.call_scheduled_date) : null);
    setClosingDate(account?.closing_date ? new Date(account.closing_date) : null);
    setWonDate(account?.won_date ? new Date(account.won_date) : null);
    setSuccessDate(account?.success_story_date ? new Date(account.success_story_date) : null);
    setLostDate(account?.lost_date ? new Date(account.lost_date) : null);
    setQualified(account?.qualified ? account.qualified.toString() : null);
    setOutreachSuccess(account?.outreach_success ? account.outreach_success.toString() : null);
    setEngagementVersion(account?.engagement_version ?? "")
    setSalesQualifiedDate(account?.sales_qualified_date ? new Date(account.sales_qualified_date) : null)
    setAssignedTo(account?.assigned_to ?? null);

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
          <SimpleGrid cols={3}>

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
              title="Stage"
              selectProps={{
                value: accountStatusParam,
                onChange: setAccountStatusParam,
                // (event)=>{
                //   // setAccountStatusParam(event);
                //   console.log("event", event)
                // },
                data: [
                  { value: AccountStatusParam.prequalified, label: AccountStatusParam.prequalified },
                  { value: AccountStatusParam.sales_qualified, label: AccountStatusParam.sales_qualified },
                  { value: AccountStatusParam.won, label: AccountStatusParam.won },
                  { value: AccountStatusParam.lost, label: AccountStatusParam.lost }],
                placeholder: "Choose",
                searchable: true,
              }}
            />

            <Select
              title="Assigned To"
              selectProps={{
                value: assignedTo,
                onChange: setAssignedTo,
                data: [
                  { value: AccountAssignedTo.human, label: AccountAssignedTo.human },
                  { value: AccountAssignedTo.robot, label: AccountAssignedTo.robot },
                  ],
                placeholder: "Choose",
                searchable: true,
              }}
            />

            <Select
              title="Qualified"
              selectProps={{
                value: qualified,
                onChange: setAccountStatusParam,
                data: [
                  { value: "true", label: "True" },
                  { value: "false", label: "False" },
                ],
                placeholder: "Choose",
                // searchable: true,
              }}
            />

            <Select
              title="Outreach success"
              selectProps={{
                value: outreach_success,
                onChange: setOutreachSuccess,
                data: [
                  { value: "true", label: "True" },
                  { value: "false", label: "False" },
                ],
                placeholder: "Choose",
                // searchable: true,
              }}
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
              title="Sales Qualified Date"
              valueFormat="YYYY-MM-DD"
              value={salesQualifiedDate}
              setDate={setSalesQualifiedDate} />

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

            <TextField
              title="Engagement Version"
              textFieldProps={{
                value: engagementVersion,
                onChange: (e) => setEngagementVersion(e.target.value),
              }}
            />
          </SimpleGrid>
        </Column>
      </Row>

      <ButtonRow>
        <Button onClick={() => handleUpdateAccount()}>Update Account</Button>
      </ButtonRow>
    </EditDetailsContainer>
  );
}
