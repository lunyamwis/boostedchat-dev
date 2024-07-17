import {
  ActionIcon,
  Box,
  Button,
  Group,
  Space,
  Stack,
  // TextInput,
  Tooltip,
  Container,
  useMantineTheme,
} from "@mantine/core";
import { Checkbox } from '@mantine/core';
import { Text } from '@mantine/core';
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { useSalesRepApi } from "../../Apis/UserManagement/SalesRep.api";
// import { RegisterDeviceParams } from "../../Interfaces/UserManagement/salesRep.interface";
import { AuthAPI } from "../../Apis/UserManagement/Auth.api";
import { CollapsingAlert } from "../../Components/Widgets/CollapsingAlert";
import { useAlert } from "../../Hooks/useAlert";
import { axiosError } from "../../Interfaces/general.interface";
import { authPageData } from ".";
import { IconArrowLeft } from "@tabler/icons-react";

export function InstagramLogin() {

  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { showAlert, setShowAlert, alertInfo, setAlertInfo } = useAlert();

  const [checked, setChecked] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [user, setUser] = useState({
  //   'email': '',
  //   'role': '',
  //   'id': '',
  // });
  // const [ig_username, setigUsername] = useState("");
  // const [ig_password, setigPassword] = useState("");
  // const [instagram, setInstagram] = useState("");
  // const [app_version, setappVersion] = useState("");
  // const [android_version, setandroidVersion] = useState("");
  // const [android_release, setandroidRelease] = useState("");
  // const [dpi, setDpi] = useState("");
  // const [resolution, setResolution] = useState("");
  // const [manufacturer, setManufacturer] = useState("");
  // const [device, setDevice] = useState("");
  // const [model, setModel] = useState("");
  // const [cpu, setCpu] = useState("");
  // const [version_code, setVersionCode] = useState("");


  const location = useLocation();
  // const params = useParams();


  // useEffect(() => {
  //   setappVersion(location.state?.app_version)
  //   setandroidVersion(location.state?.android_version)
  //   setandroidRelease(location.state?.android_release)
  //   setDpi(location.state?.dpi)
  //   setResolution(location.state?.resolution)
  //   setManufacturer(location.state?.manufacturer)
  //   setDevice(location.state?.device)
  //   setModel(location.state?.model)
  //   setCpu(location.state?.cpu)
  //   setVersionCode(location.state?.version_code)
  //   setUser(location.state?.userData?.user)
  // }, [location.state]);


  useEffect(() => {
    if (!checked) {
      setShowLoginButton(true);
    } else {
      setShowLoginButton(false);
    }
  }, [checked]);

  console.log(checked);

  useEffect(() => {
    setShowAlert(true);
    setAlertInfo({
      color: "teal",
      title: 'Ready to connect',
      message: location?.state?.message,
    });
  }, [location?.state?.message])

  const register = useMutation({
    mutationFn: (login_data: any) => AuthAPI.instagramLogin(login_data),
    onSuccess: () => {
      console.log("success");
      // navigate("/login", {
      //   replace: true,
      //   state: {
      //     color: "teal",
      //     title: "Success",
      //     message:
      //       "Your account was created successfully. You can now log in with your email and password.",
      //   } as LoginState,
      // }
      // );
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



  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowAlert(false);
    // if (firstName === "") {
    //   setShowAlert(true);
    //   setAlertInfo({
    //     color: "orange",
    //     title: "Error",
    //     message: "Please fill in your first name",
    //   });
    //   return;
    // }
    // json={"igname":"ig_username"}
    register.mutate({
      'igname': location.state.ig_username,
    });
  };

  console.log('', location.state);
  // console.log()
  return (
    <Box component="form" autoComplete="false" onSubmit={handleRegister}>
      <Container my="md">


      </Container>
      <Space h="md" />
      <Stack>
        <CollapsingAlert
          alertInfo={alertInfo}
          onClose={() => setShowAlert(false)}
          showAlert={showAlert}
        />

        <Checkbox
          variant="outline"
          label={<>
            <Text fw={700}>I have removed 2 Factor Authentication in Meta Accounts Center</Text>
            IG app/Settings/Accounts Centre/ Password and Security/ Two-factor authentication/ your IG profile/ disable login codes & all other methods
          </>}
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />


        <Button disabled={showLoginButton} type="submit" loading={register.isPending}>
          Attempt instagram login
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