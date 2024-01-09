import { Box, Button, Group, Loader, Modal, Stack, Text } from "@mantine/core";
import React from "react";

type componentProps = {
  title: string;
  message: string;
  loadingMessage?: string;
  isLoading: boolean;
  isOpen: boolean;
  handleClose: () => void;
  next?: {
    label: string;
    fn: () => any;
  } | null;
};

export function LoadingDialog({
  title,
  message,
  loadingMessage,
  isLoading,
  isOpen,
  handleClose,
  next,
}: componentProps) {
  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title={
        isLoading ? null : (
          <Text
            style={{ fontWeight: 500, fontSize: "20px", color: "#000000DE" }}
          >
            {title}
          </Text>
        )
      }
      withCloseButton={false}
      centered
      size={isLoading ? "150px" : "sm"}
      padding="md"
      closeOnClickOutside={!isLoading}
      closeOnEscape={!isLoading}
    >
      {isLoading ? (
        <Stack
          gap={4}
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
          <Text c="dimmed">{loadingMessage ?? "Please wait..."}</Text>
        </Stack>
      ) : (
        <Stack>
          <Text style={{ color: "rgb(0 0 0 / 78%)" }}>{message}</Text>
          <Group justify="space-between">
            <Box />
            {next ? (
              <Button onClick={next.fn} fullWidth={false} variant="subtle">
                {next.label}
              </Button>
            ) : (
              <Button onClick={handleClose} fullWidth={false} variant="subtle">
                OK
              </Button>
            )}
          </Group>
        </Stack>
      )}
    </Modal>
  );
}
