import React from "react";
import { MantineColor } from "@mantine/core";
import { useState } from "react";
import { AlertCircle } from "tabler-icons-react";

export type TAlertInfo = {
  title: string;
  message: string;
  color: MantineColor;
  icon?: JSX.Element | null;
};

export const useAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState<TAlertInfo>({
    title: "",
    message: "",
    color: "teal",
    icon: <AlertCircle size={16} />,
  });

  return {
    showAlert,
    setShowAlert,
    alertInfo,
    setAlertInfo,
  };
};
