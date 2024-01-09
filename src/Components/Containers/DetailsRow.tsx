import React from "react";
import { Box, Group, Text, ThemeIcon } from "@mantine/core";

type RowProps = {
  title: string;
  iconColor: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export function DetailsRow({ title, iconColor, icon, children }: RowProps) {
  return (
    <>
      <Group
        style={{
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <ThemeIcon color={iconColor} variant="light">
          {icon}
        </ThemeIcon>
        <Text
          style={(theme) => ({
            color: theme.black,
            fontSize: "16px",
            fontWeight: 500,
          })}
        >
          {title}
        </Text>
      </Group>
      <Box style={{ paddingLeft: 66, paddingRight: 40, paddingBottom: 16 }}>
        {children}
      </Box>
    </>
  );
}
