import {
  ActionIcon,
  Box,
  Button,
  Group,
  Stack,
  TextInput,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { CollapsingAlert } from "../../Components/Widgets/CollapsingAlert";
import { useAlert } from "../../Hooks/useAlert";
import { isValidEmail } from "../../Utils/validator.util";
import { AuthAPI } from "../../Apis/UserManagement/Auth.api";
import { axiosError } from "../../Interfaces/general.interface";
import { apiErrorMessage } from "../../Utils/api.util";
import { authPageData } from ".";

export function ForgotPassword() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { showAlert, setShowAlert, alertInfo, setAlertInfo } = useAlert();

  const [email, setEmail] = useState("");

  const forgotPassword = useMutation({
    mutationFn: (params: { email: string }) => AuthAPI.forgotPassword(params),
    onSuccess: () => {
      setShowAlert(true);
      setEmail("");
      setAlertInfo({
        color: "teal",
        title: "Success",
        message:
          "We have emailed you a password reset link. Log into your email and click it to reset your account password.",
      });
    },
    onError: (error: axiosError) => {
      const msg = apiErrorMessage(error);
      setShowAlert(true);
      setAlertInfo({
        color: "red",
        title: "Error",
        message: msg,
      });
    },
  });
  const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowAlert(false);
    if (email === "") {
      setShowAlert(true);
      setAlertInfo({
        color: "orange",
        title: "Error",
        message: "Please fill in your email address",
      });
      return;
    }
    if (!isValidEmail(email)) {
      setShowAlert(true);
      setAlertInfo({
        color: "orange",
        title: "Error",
        message: "Please enter a valid email address",
      });

      return;
    }
    forgotPassword.mutate({ email });
  };

  return (
    <Box component="form" autoComplete="false" onSubmit={handleForgotPassword}>
      <Stack>
        <CollapsingAlert
          alertInfo={alertInfo}
          onClose={() => setShowAlert(false)}
          showAlert={showAlert}
        />
        <TextInput
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" loading={forgotPassword.isPending}>
          Get Password reset link
        </Button>
        <Group align="center">
          <Tooltip label="Back to Login">
            <ActionIcon
              variant="subtle"
              radius="xl"
              size="xl"
              onClick={() => navigate(`${authPageData.login.url}`)}
              color={theme.primaryColor}
            >
              <IconArrowLeft />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Stack>
    </Box>
  );
}
