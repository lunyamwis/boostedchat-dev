// AccountDrawer.tsx
import React from 'react';
import { Drawer, Text, Title, Stack, Divider, Box, ScrollArea, Group, Avatar, Badge, Button } from '@mantine/core';
import { Loading } from '@/Components/UIState/Loading';
import { ChatItem } from '../Instagram/Threads/ChatItem';
import { EDateFormats } from '@/Interfaces/general.interface';
import { format, parseISO } from "date-fns";
import { useCommonStateForAccountThreads } from '../Instagram/Account/Hooks/common.hooks';
import { Link } from 'react-router-dom';
import { FollowStat } from '@/Components/Containers/ParentContainer';
import { Icon, IconCheck, IconMail, IconMapPin, IconPhone, IconX } from '@tabler/icons-react';
import { openConfirmModal } from "@mantine/modals";
import { notifications, showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useAccountsApi } from '@/Apis/Instagram/Accounts.api';
type ContactDetailsProps = {
  Icon: Icon;
  value: string;
};

function ContactDetails({ Icon, value }: ContactDetailsProps) {
  return (
    <Group>
      <Icon size={16} color="#444" />
      {value == null || "" ? (
        <Text fz={14} c="dimmed">
          n/a
        </Text>
      ) : (
        <Text fz={14}>{value}</Text>
      )}
    </Group>
  );
}

type PropertyBadgeProps = {
  value: boolean;
  trueVal: string;
  falseVal: string;
};
function PropertyBadge({ value, trueVal, falseVal }: PropertyBadgeProps) {
  return (
    <Badge
      color={value ? "teal" : "orange"}
      variant="light"
      radius="sm"
      styles={{
        label: {
          fontWeight: 500,
          textTransform: "capitalize",
        },
      }}
    >
      {value ? trueVal : falseVal}
    </Badge>
  );
}

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
  const { clearConversation } = useAccountsApi()

  const resetConversation = useMutation({
    mutationFn: (params: string) => clearConversation(params),
    onSuccess: () => {
      accountDetailsQR.refetch()
      notifications.update({
        id: "RESET_CONVERSATION_NOTIFICATION",
        color: "teal",
        icon: <IconCheck />,
        message: "Messages cleared successfully.",
        loading: false,
        autoClose: 3000,
        
      });
    },
    onError: (err) => {
      showNotification({
        color: "red",
        icon: <IconX />,
        title: "Error",
        message: err.message,
      });
    },
  });

  const handleOnClick = (id: any) => {
    openConfirmModal({
      title: "Alert",
      children: (
        <Text>
          Are you sure you want to delete all messages? This
          action is irreversible.
        </Text>
      ),
      onConfirm: () => {
        notifications.show({
          id: "RESET_CONVERSATION_NOTIFICATION",
          loading: true,
          message: "Deleting messages",
          autoClose: false,
          withCloseButton: false,
        });

        resetConversation.mutate(id)
      },
      labels: { confirm: "Confirm", cancel: "Cancel" },
    });
  }

  if (accountDetailsQR.isError) return <>Error</>;

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

        <Box px={24}>
          <Stack align="center">
            <Avatar size="xl" color={'brand'}>
              {accountDetailsQR?.data?.igname?.charAt(0).toUpperCase()}
            </Avatar>
            <Stack gap={2} align="center">
              <Text
                style={{
                  "&:hover": { color: "yellow" },
                }}
                fz={16}
                component={Link}
                target="_blank"
                to={`https://instagram.com/${accountDetailsQR.data?.igname}`}
              >
                {accountDetailsQR.data?.igname}
              </Text>
              <Text fz={14} fw={600}>
                {accountDetailsQR?.data?.account?.full_name}
              </Text>
              <Group>
                <Text
                  component={Link}
                  target="_blank"
                  c="blue"
                  fz={14}
                  fw={500}
                  to={accountDetailsQR.data?.account?.outsourced?.external_url || ''}
                >
                  {accountDetailsQR.data?.account?.outsourced?.external_url}
                </Text>
              </Group>
            </Stack>
            <Text style={{ textAlign: "center", fontSize: 14 }}>
              {accountDetailsQR.data?.account?.outsourced?.biography}
            </Text>
            <Group>
              <FollowStat
                title="followers"
                count={accountDetailsQR.data?.account?.outsourced?.follower_count || 0}
              />
              <FollowStat
                title="following"
                count={accountDetailsQR.data?.account?.outsourced?.following_count || 0}
              />
              <FollowStat
                title="posts"
                count={accountDetailsQR.data?.account?.outsourced?.media_count || 0}
              />
            </Group>

            <Group my={24} justify="center">
              <PropertyBadge
                value={accountDetailsQR.data?.account?.outsourced?.is_verified || false}
                trueVal="Verified"
                falseVal="Not Verified"
              />
              <PropertyBadge
                value={accountDetailsQR.data?.account?.outsourced?.is_business || false}
                trueVal="Business"
                falseVal="Not a business"
              />
              <PropertyBadge
                value={accountDetailsQR.data?.account?.outsourced?.is_popular || false}
                trueVal="Popular"
                falseVal="Not popular"
              />
              <PropertyBadge
                value={accountDetailsQR.data?.account?.outsourced?.is_posting_actively || false}
                trueVal="Posts actively"
                falseVal="Posts rarely"
              />
              <PropertyBadge
                value={accountDetailsQR.data?.account?.outsourced?.is_private || false}
                trueVal="Private Account"
                falseVal="Public account"
              />
              <PropertyBadge
                value={accountDetailsQR.data?.account?.outsourced?.book_button || false}
                trueVal="Book Button"
                falseVal="No Book Button"
              />
            </Group>
          </Stack>
          <Stack>
            <ContactDetails
              Icon={IconPhone}
              value={accountDetailsQR.data?.account?.outsourced?.public_phone_number || ''}
            />
            <ContactDetails
              Icon={IconMail}
              value={accountDetailsQR.data?.account?.outsourced?.public_email || ''}
            />
            <ContactDetails
              Icon={IconMapPin}
              value={accountDetailsQR.data?.account?.outsourced?.city_name || ''}
            />
            <Button color='red' onClick={() => {
              handleOnClick(accountDetailsQR.data?.id)
            }}>
              Reset Conversation
            </Button>
          </Stack>
        </Box>

        <Divider />
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
