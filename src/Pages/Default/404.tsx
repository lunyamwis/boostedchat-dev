import { useNavigate } from "react-router-dom";
import React from "react";
import {
  Box,
  Button,
  Card,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";

export function NotFound() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  return (
    <Box
      sx={{ alignItems: "center", justifyContent: "center" }}
      display="flex"
      h="100vh"
      w="100vw"
      bg="#f6f6f6"
    >
      <Card w="40%" h="40%" shadow="lg">
        <Stack h="100%" justify="center" align="center">
          <Group spacing={2}>
            <Text fz="100px" fw={600}>
              4
            </Text>
            <Text fz="100px" fw={600} color={theme.colors.brand[3]}>
              0
            </Text>
            <Text fz="100px" fw={600}>
              4
            </Text>
          </Group>
          <Text mt="-30px">We couldn't find that page</Text>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back Home
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
