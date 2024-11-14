import React from 'react';
import { Card, Text, Group, Avatar, ThemeIcon } from '@mantine/core';
import { IconUser, IconRobot } from '@tabler/icons-react';

interface MessageCardProps {
  username: string;
  msgSentBy: 'robot' | 'person';
  lastMsgSentAt: string;
  assignedTo: 'robot' | 'person';
  onClick?: () => void;
}

const AccountCard: React.FC<MessageCardProps> = ({ username, msgSentBy, lastMsgSentAt, assignedTo, onClick }) => {
  const renderIcon = (type: 'robot' | 'person') => (
    <ThemeIcon variant="outline" color={type === 'robot' ? 'blue' : 'green'}>
      {type === 'robot' ? <IconRobot size={20} /> : <IconUser size={20} />}
    </ThemeIcon>
  );

  return (
    <Card shadow="sm" p="lg" radius="md" onClick={onClick} withBorder style={{ cursor: 'pointer', backgroundColor: 'white' }}>
      <Text fw={500} size="lg" mb="sm">
        Username: {username}
      </Text>
      <Group gap="xs" mb="xs">
        <Text fw={500}>Sent By:</Text>
        {renderIcon(msgSentBy)}
      </Group>
      <Text mb="xs">
        Last message sent at: {lastMsgSentAt}
      </Text>
      <Group //spacing="xs"
      >
        <Text fw={500}>Assigned to:</Text>
        {renderIcon(assignedTo)}
      </Group>
    </Card>
  );
};

export default AccountCard;
