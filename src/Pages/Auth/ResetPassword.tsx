import {
  Alert,
  Anchor,
  Box,
  Button,
  PasswordInput,
  Stack,
  Text,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { CollapsingAlert } from '../../Components/Widgets/CollapsingAlert';
import { useAlert } from '../../Hooks/useAlert';
import { IResetPassword } from '../../Interfaces/UserManagement/auth.interface';
import { AuthAPI } from '../../Apis/UserManagement/Auth.api';
import { axiosError } from '../../Interfaces/general.interface';
import { apiErrorMessage } from '../../Utils/api.util';
import { authPageData } from '.';

export function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const {
    showAlert, setShowAlert, alertInfo, setAlertInfo,
  } = useAlert();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const resetPassword = useMutation(
    (params: IResetPassword) => AuthAPI.resetPassword(params),
    {
      onSuccess: () => {
        setResetSuccess(true);
      },
      onError: (error: axiosError) => {
        const msg = apiErrorMessage(error);
        setShowAlert(true);
        setAlertInfo({
          title: 'Error',
          color: 'red',
          message: msg,
        });
      },
    },
  );

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword === '') {
      setShowAlert(true);
      setAlertInfo({
        title: 'Error',
        color: 'orange',
        message: 'Please enter a new password',
      });
      return;
    }
    if (confirmPassword === '') {
      setShowAlert(true);
      setAlertInfo({
        title: 'Error',
        color: 'orange',
        message: 'Please confirm your password',
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setShowAlert(true);
      setAlertInfo({
        title: 'Error',
        color: 'red',
        message: 'Passwords do not match',
      });
      return;
    }
    resetPassword.mutate({
      token: params.get('token')!,
      new_password: newPassword,
    });
  };
  useEffect(() => {
    if (params.get('token') == null) {
      navigate(`${authPageData.login.url}`, { replace: true });
      // return
    }
  }, []);

  return (
    <>
      {resetSuccess ? (
        <Box px={80}>
          <Alert title="Success">
            <Text>
              Your password has been reset successfully. Click
              {' '}
              <Anchor
                sx={{ textDecoration: 'underline', fontWeight: 500 }}
                component={Link}
                to={authPageData.login.url}
              >
                here
              </Anchor>
              {' '}
              to log in with your new account password
            </Text>
          </Alert>
        </Box>
      ) : (
        <Box
          component="form"
          autoComplete="false"
          onSubmit={handleResetPassword}
        >
          <Stack px={80}>
            <CollapsingAlert
              alertInfo={alertInfo}
              onClose={() => setShowAlert(false)}
              showAlert={showAlert}
            />
            <PasswordInput
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <PasswordInput
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button type="submit" loading={resetPassword.isLoading}>
              Reset password
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
}
