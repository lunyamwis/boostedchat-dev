import {
  Anchor,
  Box,
  Button,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CollapsingAlert } from "../../Components/Widgets/CollapsingAlert";
import { useAlert } from "../../Hooks/useAlert";
import { isValidEmail } from "../../Utils/validator.util";
import { LoginState } from "../../Interfaces/general.interface";
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

  /*
  const googleLogin = useGoogleLogin();
  const facebookLogin = useFacebookLogin();
  const twitterLogin = useTwitterLogin();
  const handleGoogleLogin = () => {
    googleLogin.mutate();
  };

  const handleFacebookLogin = () => {
    facebookLogin.mutate();
  };

  const handleTwitterLogin = () => {
    twitterLogin.mutate();
  };
  */
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
          const errMessage = error.message;
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
          label="IG Password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Anchor
          style={{ textDecoration: "none", textAlign: "end", fontSize: 14 }}
          component={Link}
          to="/forgot-password"
        >
          Forgot password?
        </Anchor>
        <Button type="submit" loading={login.isPending}>
          Log in
        </Button>
        <Anchor
          style={{ textDecoration: "none", textAlign: "center", fontSize: 14 }}
          component={Link}
          to="/register"
        >
          Don't have an account? Register
        </Anchor>
      </Stack>
    </Box>
  );
}
