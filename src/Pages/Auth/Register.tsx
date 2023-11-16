import {
  ActionIcon,
  Box,
  Button,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../Apis/UserManagement/Auth.api";
import { RegisterParams } from "../../Interfaces/UserManagement/auth.interface";
import { CollapsingAlert } from "../../Components/Widgets/CollapsingAlert";
import { useAlert } from "../../Hooks/useAlert";
import { isValidEmail } from "../../Utils/validator.util";
import { axiosError, LoginState } from "../../Interfaces/general.interface";
import { authPageData } from ".";
import { IconArrowLeft } from "@tabler/icons-react";

export function Register() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { showAlert, setShowAlert, alertInfo, setAlertInfo } = useAlert();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = useMutation(
    (params: RegisterParams) => AuthAPI.register(params),
    {
      onSuccess: () => {
        navigate("/login", {
          replace: true,
          state: {
            color: "teal",
            title: "Success",
            message:
              "Your account was created successfully. You can now log in with your email and password.",
          } as LoginState,
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      },
      onError: (error: axiosError) => {
        const errMessage = error.data;
        setShowAlert(true);
        setAlertInfo({
          color: "red",
          title: "Error",
          message: errMessage,
        });
      },
    }
  );

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowAlert(false);
    if (firstName === "") {
      setShowAlert(true);
      setAlertInfo({
        color: "orange",
        title: "Error",
        message: "Please fill in your first name",
      });
      return;
    }
    if (lastName === "") {
      setShowAlert(true);
      setAlertInfo({
        color: "orange",
        title: "Error",
        message: "Please fill in your last name",
      });
      return;
    }
    if (email === "") {
      setShowAlert(true);
      setAlertInfo({
        color: "orange",
        title: "Error",
        message: "Please fill in your email address",
      });
      return;
    }
    if (password === "") {
      setShowAlert(true);
      setAlertInfo({
        color: "orange",
        title: "Error",
        message: "Please enter your account password",
      });
      return;
    }
    if (confirmPassword === "") {
      setShowAlert(true);
      setAlertInfo({
        color: "orange",
        title: "Error",
        message: "Please confirm your account password",
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
    if (password !== confirmPassword) {
      setShowAlert(true);
      setAlertInfo({
        color: "orange",
        title: "Error",
        message: "Passwords do not match",
      });
      return;
    }

    register.mutate({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });
  };

  return (
    <Box component="form" autoComplete="false" onSubmit={handleRegister}>
      <Stack>
        <CollapsingAlert
          alertInfo={alertInfo}
          onClose={() => setShowAlert(false)}
          showAlert={showAlert}
        />
        <TextInput
          label="First name"
          autoFocus
          name="first_name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextInput
          label="Last name"
          name="last_name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextInput
          label="Email address"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          label="Password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordInput
          label="Confirm password"
          value={confirmPassword}
          name="confirm_password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" loading={register.isLoading}>
          Register
        </Button>
        <Group position="center">
          <Tooltip label="Back to Login">
            <ActionIcon
              disabled={register.isLoading}
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
