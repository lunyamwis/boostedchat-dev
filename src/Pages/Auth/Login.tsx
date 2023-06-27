import {
  Anchor,
  Box,
  Button,
  Divider,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CollapsingAlert } from "../../Components/Widgets/CollapsingAlert";
import { useAlert } from "../../Hooks/useAlert";
import { isValidEmail } from "../../Utils/validator.util";
import { axiosError, LoginState } from "../../Interfaces/general.interface";
import { Google } from "../../Assets/Google";
import { Facebook } from "../../Assets/Facebook";
import { Twitter } from "../../Assets/Twitter";
import { useLogin } from "./Hooks/login.hooks";
import { useAuth } from "../../Context/AuthContext/AuthProvider";

export function Login() {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const login = useLogin();
  const location = useLocation();
  const { showAlert, setShowAlert, alertInfo, setAlertInfo } = useAlert();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowAlert(false);
    if (email === "" || password === "") {
      setShowAlert(true);
      setAlertInfo({
        color: "orange",
        title: "Error",
        message: "Please fill in all fields",
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

    login.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          dispatch({
            type: "LOGIN",
            payload: {
              access: data.access,
              refresh: data.refresh,
              authenticatedUser: data.authenticatedUser,
            },
          });
          navigate("/", { replace: true });
        },
        onError: (error) => {
          const err = error as axiosError;
          const errMessage = err.data;
          setShowAlert(true);
          setAlertInfo({
            color: "red",
            title: "Error",
            message: errMessage,
          });
        },
      }
    );
  };

  React.useEffect(() => {
    const locationState = location.state as LoginState;
    if (locationState) {
      setShowAlert(true);
      setAlertInfo({
        color: locationState.color ?? "teal",
        title: locationState.title,
        message: locationState.message,
      });
    }
  }, [location.state]);

  return (
    <Box component="form" autoComplete="false" onSubmit={handleLogin}>
      <Stack>
        <CollapsingAlert
          alertInfo={alertInfo}
          onClose={() => setShowAlert(false)}
          showAlert={showAlert}
        />
        <TextInput
          label="Email address"
          autoFocus
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          label="Password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Anchor
          sx={{ textDecoration: "none", textAlign: "end", fontSize: 14 }}
          component={Link}
          to="/forgot-password"
        >
          Forgot password?
        </Anchor>
        <Button type="submit" loading={login.isLoading}>
          Log in
        </Button>
        <Anchor
          sx={{ textDecoration: "none", textAlign: "center", fontSize: 14 }}
          component={Link}
          to="/register"
        >
          Don't have an account? Register
        </Anchor>
        <Box sx={{ mb: 2, px: 10, width: "100%" }}>
          <Divider my="xs" label="OR" labelPosition="center" />
        </Box>
        <Button
          type="submit"
          variant="default"
          leftIcon={
            <Box h={25} w={25}>
              <Google />
            </Box>
          }
          loading={login.isLoading}
        >
          Continue with Google
        </Button>
        <Button
          leftIcon={
            <Box h={25} w={25}>
              <Facebook />
            </Box>
          }
          type="submit"
          variant="default"
          loading={login.isLoading}
        >
          Continue with Facebook
        </Button>
        <Button
          leftIcon={
            <Box h={25} w={25}>
              <Twitter />
            </Box>
          }
          type="submit"
          variant="default"
          loading={login.isLoading}
        >
          Continue with Twitter
        </Button>
      </Stack>
    </Box>
  );
}
