import {
  ActionIcon,
  Box,
  Button,
  Group,
  Space,
  Stack,
  TextInput,
  Tooltip,
  SimpleGrid,
  useMantineTheme,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSalesRepApi } from "../../Apis/UserManagement/SalesRep.api";
import { RegisterDeviceParams } from "../../Interfaces/UserManagement/salesRep.interface";
import { CollapsingAlert } from "../../Components/Widgets/CollapsingAlert";
import { useAlert } from "../../Hooks/useAlert";
import { axiosError, LoginState } from "../../Interfaces/general.interface";
import { authPageData } from ".";
import { IconArrowLeft } from "@tabler/icons-react";

export function RegisterDevice ()  {
  
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { showAlert, setShowAlert, alertInfo, setAlertInfo } = useAlert();

  const [user, setUser] = useState({
    'email': '',
    'role':'',
    'id': '',
  });

  const [app_version, setappVersion] = useState("");
  const [android_version, setandroidVersion] = useState("");
  const [android_release, setandroidRelease] = useState("");
  const [dpi, setDpi] = useState("");
  const [resolution, setResolution] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [device, setDevice] = useState("");
  const [model, setModel] = useState("");
  const [cpu, setCpu] = useState("");
  const [version_code, setVersionCode] = useState("");
  const { create } = useSalesRepApi();
  const location = useLocation();


  useEffect(() => {
    setappVersion(location.state?.app_version)
    setandroidVersion(location.state?.android_version)
    setandroidRelease(location.state?.android_release)
    setDpi(location.state?.dpi)
    setResolution(location.state?.resolution)
    setManufacturer(location.state?.manufacturer)
    setDevice(location.state?.device)
    setModel(location.state?.model)
    setCpu(location.state?.cpu)
    setVersionCode(location.state?.version_code)
    setUser(location.state?.userData?.user)
  },[location.state]);

  const register = useMutation({
    mutationFn: (params: RegisterDeviceParams) => create(params),
    onSuccess: () => {
      console.log("success");
      navigate("/login", {
        replace: true,
        state: {
          color: "teal",
          title: "Success",
          message:
            "Your account was created successfully. You can now log in with your email and password.",
        } as LoginState,
      }
      );
     
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

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowAlert(false);

    register.mutate({
      user: user.id,
      ig_username: 'ig_username',
      ig_password: 'ig_password',
      instagram: [],
      app_version: app_version,
      android_version: 10,
      android_release: android_release,
      dpi: dpi,
      resolution: resolution,
      manufacturer: manufacturer,
      device: device,
      model: model,
      cpu: cpu,
      version_code: version_code,
    });
  };

  console.log(location.state);
  // console.log()
  return (
    <Box component="form" autoComplete="false" onSubmit={handleRegister}>
      {/* <Container my="md"> */}
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {/* <Skeleton radius="md" animate={false} /> */}
        <TextInput
          label="App version"
          autoFocus
          name="app_version"
          value={app_version}
          onChange={(e) => setappVersion(e.target.value)}
        />

        <TextInput
          label="Android Version"
          name="android_version"
          value={android_version}
          onChange={(e) => setandroidVersion(e.target.value)}
        />

      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {/* <Skeleton radius="md" animate={false} /> */}
        <TextInput
          label="android_release"
          value={android_release}
          name="android_release"
          onChange={(e) => setandroidRelease(e.target.value)}
        />
        <TextInput
          label="dpi"
          value={dpi}
          name="dpi"
          onChange={(e) => setDpi(e.target.value)}
        />

      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">

        <TextInput
          label="resolution"
          value={resolution}
          name="resolution"
          onChange={(e) => setResolution(e.target.value)}
        />
        <TextInput
          label="manufacturer"
          value={manufacturer}
          name="manufacturer"
          onChange={(e) => setManufacturer(e.target.value)}
        />

      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">

        <TextInput
          label="device"
          value={device}
          name="device"
          onChange={(e) => setDevice(e.target.value)}
        />

        <TextInput
          label="model"
          value={model}
          name="model"
          onChange={(e) => setModel(e.target.value)}
        />

      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">

        <TextInput
          label="cpu"
          value={cpu}
          name="cpu"
          onChange={(e) => setCpu(e.target.value)}
        />

        <TextInput
          label="version_code"
          value={version_code}
          name="version_code"
          onChange={(e) => setVersionCode(e.target.value)}
        />


      </SimpleGrid>



      {/* </Container> */}
      <Space h="md" />
        <Stack>
          <CollapsingAlert
            alertInfo={alertInfo}
            onClose={() => setShowAlert(false)}
            showAlert={showAlert}
          />


          <Button type="submit" loading={register.isPending}>
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
};