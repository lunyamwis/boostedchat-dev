import { useState } from "react";

type TDialogMessage = {
  success: boolean;
  title: string;
  message: string;
  loadingMessage?: string;
};

type TNextAction = {
  label: string;
  fn: () => unknown;
} | null;

type TCloseWithAction =
  | {
      withAction: false;
    }
  | {
      withAction: true;
      action: () => void;
    };

export const useLoadingDialog = () => {
  const [isLoadingDialogOpen, setIsLoadingDialogOpen] = useState(false);
  const [isDialogLoading, setIsDialogLoading] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<TDialogMessage>({
    success: false,
    title: "",
    message: "",
    loadingMessage: "",
  });
  const [nextDialogAction, setNextDialogAction] = useState<
    TNextAction | undefined
  >(undefined);

  const [closeWithAction, setCloseWithAction] = useState<TCloseWithAction>({
    withAction: false,
  });

  const handleLoadingDialogClose = () => {
    setIsLoadingDialogOpen(false);
  };
  const closeLoadingDialog = () => {
    setIsLoadingDialogOpen(false);
    setIsDialogLoading(false);
    setDialogMessage({
      success: false,
      title: "",
      message: "",
      loadingMessage: "",
    });
    if (closeWithAction.withAction) {
      closeWithAction.action();
    }
  };
  return {
    isLoadingDialogOpen,
    setIsLoadingDialogOpen,
    isDialogLoading,
    setIsDialogLoading,
    dialogMessage,
    setDialogMessage,
    closeLoadingDialog,
    handleLoadingDialogClose,
    nextDialogAction,
    setNextDialogAction,
    closeWithAction,
    setCloseWithAction,
  };
};
