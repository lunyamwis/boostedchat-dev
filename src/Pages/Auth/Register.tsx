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
import { UAParser } from 'ua-parser-js';
import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../Apis/UserManagement/Auth.api";
import { RegisterParams } from "../../Interfaces/UserManagement/auth.interface";
import { CollapsingAlert } from "../../Components/Widgets/CollapsingAlert";
import { useAlert } from "../../Hooks/useAlert";
import { isValidEmail } from "../../Utils/validator.util";
import { axiosError, LoginState } from "../../Interfaces/general.interface";
import { authPageData } from ".";
import { IconArrowLeft } from "@tabler/icons-react";
import { useSalesRepApi } from "../../Apis/UserManagement/SalesRep.api";
import { CreateSalesRep } from "@/Interfaces/UserManagement/salesRep.interface";

export function Register() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { showAlert, setShowAlert, alertInfo, setAlertInfo } = useAlert();
  const {create } = useSalesRepApi();
  

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [igName, setIgName] = useState("");
  const [full_names, setFullNames] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userAgent, setUserAgent] = useState("");
  const [loading, setLoading] = useState(false);

  const [app_version, setappVersion] = useState("");
  const [android_version, setandroidVersion] = useState(10);
  const [android_release, setandroidRelease] = useState("");
  const [dpi, setDpi] = useState("");
  const [resolution, setResolution] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [device, setDevice] = useState("");
  const [model, setModel] = useState("");
  const [cpu, setCpu] = useState("");
  const [version_code, setVersionCode] = useState("");

  useEffect(() => {
    let agent_string = ''
    try {
      agent_string = navigator.userAgent
      if (agent_string) {
        setUserAgent(agent_string)
      }
    } catch (error) {
      console.log(error);
    }

  }, []);

  useEffect(() => {
    const parser = new UAParser(userAgent);
    const device_details = parser.getResult();

    console.log('', device_details);

    setappVersion(device_details.cpu.architecture || '');
    setandroidVersion(10)
    setandroidRelease(device_details.os?.version || '')
    setDpi('');
    setResolution('');
    setManufacturer(device_details.device?.vendor || '');
    setDevice(device_details.device?.type || '');
    setModel(device_details.device?.model || '')
    setCpu(device_details.cpu?.architecture || '')
    setVersionCode(device_details.os?.version || '')
  }, [userAgent]);

  useEffect(() => {
    if (full_names) {
      let first_name = full_names?.split(' ')[0];
      let last_name = full_names?.split(' ')[1];
      setFirstName(first_name);
      setLastName(last_name);
    }
  }, [full_names]);


  const register = useMutation({
    mutationFn: (params: RegisterParams) => AuthAPI.register(params),
    onSuccess: (data) => {
      // attempt instagram login
      handleRepRegistration(data?.user?.id);
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
  });

  const registerRep = useMutation({
    mutationFn: (params: CreateSalesRep) => create(params),
    onSuccess: () => {
      console.log("success fhfhfhfh");
      navigate("/instagram-login", {
        replace: true,
        state: {
          ig_username: igName,
          message:
            "Registration successful.",
        }
      });
      setLoading(false);
      // setFirstName("");
      // setLastName("");
      // setEmail("");
      // setPassword("");
      // setConfirmPassword("");
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
  });

  const handleRepRegistration = async(user_id: string) => {
    registerRep.mutate({
      user: user_id,
      ig_username: igName,
      ig_password: password,
      instagram: [],
      app_version: app_version,
      android_version: android_version,
      android_release: android_release,
      dpi: dpi,
      resolution: resolution,
      manufacturer: manufacturer,
      device: device,
      model: model,
      cpu: cpu,
      version_code: version_code,
    });
  }

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
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
      available: true,
      email,
      password,
    })
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
          label="Name"
          autoFocus
          name="full_names"
          value={full_names}
          onChange={(e) => setFullNames(e.target.value)}
        />
        <TextInput
          label="Instagram name"
          name="ig_name"
          value={igName}
          onChange={(e) => setIgName(e.target.value)}
        />
        <TextInput
          label="Email address"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          label="Instagram password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordInput
          label="Confirm Instagram password"
          value={confirmPassword}
          name="confirm_password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" loading={loading}>
          Register
        </Button>
        <Group align="center">
          <Tooltip label="Back to Login">
            <ActionIcon
              disabled={register.isPending}
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
