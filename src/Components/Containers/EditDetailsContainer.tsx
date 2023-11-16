import React from "react";
import { LoadingDialog } from "../Widgets/LoadingDialog";

type DialogProps = {
  dialogTitle: string;
  message: string;
  isOpen: boolean;
  loading: boolean;
  handleDialogClose: () => void;
};

type ComponentProps = {
  loadingDialogProps?: DialogProps;
  children: React.ReactNode;
};

export function EditDetailsContainer({
  loadingDialogProps,
  children,
}: ComponentProps) {
  return (
    <>
      {loadingDialogProps && (
        <LoadingDialog
          title={loadingDialogProps.dialogTitle}
          message={loadingDialogProps.message}
          isOpen={loadingDialogProps.isOpen}
          isLoading={loadingDialogProps.loading}
          handleClose={loadingDialogProps.handleDialogClose}
        />
      )}
      {children}
    </>
  );
}
