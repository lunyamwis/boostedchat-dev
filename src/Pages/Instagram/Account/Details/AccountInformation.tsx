import React from "react";
import { Box, Divider } from "@mantine/core";
import { IconLoader, IconUser } from "@tabler/icons-react";
import { useLoadingDialog } from "../../../../Hooks/useLoadingDialog";
import { LoadingDialog } from "../../../../Components/Widgets/LoadingDialog";
import { Text } from "../../../../Components/Containers/Text";
import { DetailsRow } from "../../../../Components/Containers/DetailsRow";
import {,
  GetSingleAccount,
  AccountStatusParam
} from "../../../../Interfaces/Instagram/account.interface";
// import RelevantInfoViewer from "./RelevantInfoViewer";

type ComponentProps = {
  account: GetSingleAccount | null;
};

// const renderStatus = (accountStatus: AccountStatus | undefined | null) => {
//   if (accountStatus == null) {
//     return { color: "orange", message: "Awaiting engagement" };
//   }
//   if (accountStatus === AccountStatus.onHold) {
//     return { color: "yellow", message: "On Hold" };
//   }
//   if (accountStatus === AccountStatus.sentCompliment) {
//     return { color: "brand2", message: "engaging" };
//   }
//   if (accountStatus === AccountStatus.sentFirstQuestion) {
//     return { color: "teal", message: "Sent Question" };
//   }
//   return { color: "yellow", message: "Awaiting Engagement" };
// };

const renderStatusParam = (accountStatusParam: AccountStatusParam | undefined | null) => {
  let lower_case_status_param = accountStatusParam?.toLowerCase();
  if (accountStatusParam == null) {
    return { color: "orange", message: "Awaiting engagement" };
  }
  if (lower_case_status_param === AccountStatusParam.prequalified) {
    return { color: "yellow", message: "Prequalified" };
  }
  if (lower_case_status_param === AccountStatusParam.sales_qualified) {
    return { color: "brand2", message: "Sales qualified" };
  }
  if (lower_case_status_param === AccountStatusParam.won) {
    return { color: "teal", message: "Won" };
  }

  if (lower_case_status_param === AccountStatusParam.lost) {
    return { color: "red", message: "Lost" };
  }
  return { color: "yellow", message: "Awaiting Engagement" };
};


export function AccountInformation({ account }: ComponentProps) {
  const {
    isLoadingDialogOpen,
    isDialogLoading,
    dialogMessage,
    closeLoadingDialog,
  } = useLoadingDialog();

  // let relevant_info_Json = JSON.parse(JSON.stringify((account?.relevant_information)) || "{}");

  return (
    <>
      <LoadingDialog
        title={dialogMessage.title}
        isLoading={isDialogLoading}
        message={dialogMessage.message}
        isOpen={isLoadingDialogOpen}
        handleClose={closeLoadingDialog}
      />
      <Box
        style={{
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <Text
          align="left"
          type="status"
          title="Status"
          value={
            renderStatusParam(account?.status_param)
          }
        />
        <Text
          align="left"
          type="text"
          title="Assigned to"
          value={account?.assigned_to ?? "Bot"}
        />
      </Box>
      <Divider />
      <DetailsRow
        title="User Information"
        iconColor="violet"
        icon={<IconUser size={14} />}
      >
        <Text
          align="left"
          type="text"
          title="Full names"
          value={`${account?.full_name}`}
        />
        <Text
          align="left"
          type="text"
          title="Instagram Name"
          value={account?.igname}
        />
        <Text
          align="left"
          type="text"
          title="Category"
          value={account?.outsourced?.category}
        />
      </DetailsRow>
      <Divider />
      <DetailsRow
        title="Account Information"
        iconColor="blue"
        icon={<IconLoader size={14} />}
      >
        <Text
          align="left"
          type="text"
          title="External URL"
          value={account?.outsourced?.external_url}
        />
        <Text
          align="left"
          type="text"
          title="Email"
          value={account?.outsourced?.public_email}
        />
        <Text
          align="left"
          type="text"
          title="Phone Number"
          value={account?.outsourced?.contact_phone_number}
        />
        <div>
      {/* <h1>User Profile</h1> */}
      {/* <RelevantInfoViewer data={relevant_info_Json} /> */}
    </div>

      </DetailsRow>
    </>
  );
}
