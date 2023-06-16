import { Text } from "@mantine/core";
import React from "react";

type Props = {
  title: string;
};

export function GroupTitle({ title }: Props) {
  return (
    <Text
      ml="lg"
      mb="sm"
      sx={{
        fontSize: "15px",
        fontWeight: 500,
        color: "#212121",
      }}
    >
      {title}
    </Text>
  );
}
