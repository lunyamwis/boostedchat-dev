import React from "react";
import { Box, Divider } from "@mantine/core";
import { IconLoader, IconUser } from "@tabler/icons-react";
import { useLoadingDialog } from "../../../../Hooks/useLoadingDialog";
import { LoadingDialog } from "../../../../Components/Widgets/LoadingDialog";
import { Text } from "../../../../Components/Containers/Text";
import { DetailsRow } from "../../../../Components/Containers/DetailsRow";
import {
  AccountStatus,
  GetSingleAccount,
} from "../../../../Interfaces/Instagram/account.interface";

type ComponentProps = {
  account: GetSingleAccount | null;
};

const renderStatus = (accountStatus: AccountStatus | undefined | null) => {
  if (accountStatus == null) {
    return { color: "orange", message: "Awaiting engagement" };
  }
  if (accountStatus === AccountStatus.onHold) {
    return { color: "yellow", message: "On Hold" };
  }
  if (accountStatus === AccountStatus.sentCompliment) {
    return { color: "brand2", message: "engaging" };
  }
  if (accountStatus === AccountStatus.sentFirstQuestion) {
    return { color: "teal", message: "Sent Question" };
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
        sx={{
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
          value={renderStatus(account?.status)}
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
          value={account?.outsourced.category}
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
          value={account?.outsourced.external_url}
        />
        <Text
          align="left"
          type="text"
          title="Email"
          value={account?.outsourced.public_email}
        />
        <Text
          align="left"
          type="text"
          title="Phone Number"
          value={account?.outsourced.contact_phone_number}
        />
      </DetailsRow>
    </>
  );
}
