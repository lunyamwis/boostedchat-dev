import { Loader, Stack, Text } from "@mantine/core";
import React from "react";

type Props = {
  loadingText?: string;
};

export const Loading = ({ loadingText }: Props) => {
  return (
    <Stack>
      <Loader />
      <Text>{loadingText ? loadingText : "Please wait..."}</Text>
    </Stack>
  );
};
