// AccountDrawer.tsx
import React from 'react';
import { Drawer, Text, Title, Stack, Divider, Button } from '@mantine/core';

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  messageDetails: {
    username: string;
    assignedTo: string;
    lastMsgSentAt: string;
    msgSentBy: string;
  } | null;
}

const AccountDrawer: React.FC<AccountDrawerProps> = ({ isOpen, onClose, messageDetails }) => {
  if (!messageDetails) return null;

  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      title="Message Details"
      padding="md"
      position='right'
      size="lg"
      offset={8} 
    >
      <Stack gap="sm">
        <Title order={5}>Username: {messageDetails.username}</Title>
        <Divider />
        <Text><strong>Message Sent By:</strong> {messageDetails.msgSentBy}</Text>
        <Text><strong>Last Message Sent At:</strong> {messageDetails.lastMsgSentAt}</Text>
        <Text><strong>Assigned To:</strong> {messageDetails.assignedTo}</Text>
      </Stack>
      <Button variant="outline" mt="xl" onClick={onClose}>Close</Button>
    </Drawer>
  );
};

export default AccountDrawer;
