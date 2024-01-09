import { Loader, LoaderProps, Stack, Text } from "@mantine/core";
import React from "react";

type Props = {
  loadingText?: string;
  loaderVariant?: LoaderProps["variant"];
};

export const Loading = ({ loadingText, loaderVariant }: Props) => {
  return (
    <Stack justify="center" align="center" style={{ height: "100%" }}>
      <Loader variant={loaderVariant} />
      <Text>{loadingText ? loadingText : "Please wait..."}</Text>
    </Stack>
  );
};
