import { Button, Stack, Text } from "@mantine/core";
import React from "react";

type Props = {
  errorText: string;
  buttonText?: string;
  onClickAction?: () => void;
};

export const Error = ({
  errorText = "An error occurred. Please try again",
  buttonText = "Retry",
  onClickAction,
}: Props) => {
  return (
    <Stack>
      <Text>{errorText}</Text>
      <Button onClick={onClickAction}>{buttonText}</Button>
    </Stack>
  );
};
