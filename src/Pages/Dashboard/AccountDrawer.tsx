// AccountDrawer.tsx
import React from 'react';
import { Drawer, Text, Title, Stack, Divider, Box, ScrollArea, Group } from '@mantine/core';
import { Loading } from '@/Components/UIState/Loading';
import { ChatItem } from '../Instagram/Threads/ChatItem';
import { EDateFormats } from '@/Interfaces/general.interface';
import { format, parseISO } from "date-fns";
import { useCommonStateForAccountThreads } from '../Instagram/Account/Hooks/common.hooks';

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  messageDetails: {
    id: string;
    username: string;
    assignedTo: string;
    lastMsgSentAt: string;
    msgSentBy: string;
  } | null;
}

const AccountDrawer: React.FC<AccountDrawerProps> = ({ isOpen, onClose, messageDetails }) => {
  if (!messageDetails) return null;

  const { accountDetailsQR } = useCommonStateForAccountThreads(messageDetails.id);

  if (accountDetailsQR.isError) return <>Errot</>;


  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      title="Message Details"
      padding="md"
      position='right'
      size="xl"
      offset={8}
    >
      <Stack gap="sm">
        <Title order={5}>Username: {messageDetails.username}</Title>
        <Text><strong>Message Sent By:</strong> {messageDetails.msgSentBy}</Text>
        <Text><strong>Last Message Sent At:</strong> {messageDetails.lastMsgSentAt}</Text>
        <Text><strong>Assigned To:</strong> {messageDetails.assignedTo}</Text>
        <Divider />
        <Box
          // viewportRef={viewport}
          component={ScrollArea}
          style={{ height: '100%', flexGrow: 1, backgroundColor: "#F8f9fa" }}
        >
          {accountDetailsQR.isPending ? <Loading /> :
            accountDetailsQR.data.threads.map((thread) => {
              return thread.messages.map((message) => {
                return <Group
                  key={message.id}
                  justify={
                    message.sent_by === "Robot" ? "right" : "left"
                  }
                >
                  <Group
                    justify={
                      message.sent_by === "Robot" ? "right" : "left"
                    }
                    style={{
                      width: "60%",
                    }}
                  >
                    <ChatItem
                      avatarColor={'#ff4115'}
                      profilePicture={null}
                      content={message?.content}
                      userInitials={message?.sent_by?.charAt(0)}
                      userNames={accountDetailsQR.data.igname}
                      date={format(
                        parseISO(message?.sent_on),
                        EDateFormats.time,
                      )}
                      owner={
                        message?.sent_by === "Robot"
                          ? "system"
                          : "lead"
                      }
                    />
                  </Group>
                </Group>
              })
            })
          }


        </Box>

      </Stack>
      {/* <Button variant="outline" mt="xl" onClick={onClose}>Close</Button> */}
    </Drawer>
  );
};

export default AccountDrawer;
