import React from "react";
import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Menu,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { format, parseISO } from "date-fns";
import { Loading } from "../../../../Components/UIState/Loading";
import { Error } from "../../../../Components/UIState/Error";
import { EDateFormats } from "../../../../Interfaces/general.interface";
import { IconArrowLeft, IconDotsVertical } from "@tabler/icons-react";
import { AssignedToSwitch } from "../AssignedToSwitch";
import { useSearchParams } from "react-router-dom";
import { ChatItem } from "../ChatItem";
import { DateHolder } from "../DateHolder";
import { useDirectMessages } from "../Hooks/direct_messages.hooks";
import { MobileMessageBox } from "./MessageBox";

type Props = {
  avatarColor: string;
};

export function MobileDirectMessages({ avatarColor }: Props) {
  const {
    accountQR,
    threadQR,
    igThreadId,
    messagesQR,
    viewport,
    formattedThreads,
  } = useDirectMessages();
  const [menuOpened, setMenuOpened] = React.useState(false);
  const [, setSearchParams] = useSearchParams();

  return (
    <Stack justify="space-between" gap={0} style={{ height: "100%" }}>
      <Group
        justify="space-between"
        py={16}
        pl={8}
        bg="#FFF"
        pr={16}
        style={{ borderBottom: "1px solid #ECEFE0" }}
      >
        {accountQR.isLoading && (
          <Group>
            <Avatar c={avatarColor}>
              <Skeleton />
            </Avatar>
            <Stack gap={1}>
              <Skeleton />
              <Skeleton />
            </Stack>
          </Group>
        )}
        {accountQR.data != null && (
          <Group>
            <Group gap={2}>
              <ActionIcon
                onClick={() => setSearchParams(undefined)}
                color="gray"
                variant="subtle"
                radius="xl"
              >
                <IconArrowLeft />
              </ActionIcon>
              <Avatar color={avatarColor}>
                {accountQR?.data?.igname?.charAt(0)}
              </Avatar>
            </Group>
            <Stack gap={1}>
              <Text>{accountQR?.data?.igname}</Text>
              <Text fz={13} c="dimmed">
                Assigned to{" "}
                <Text fz={13} component="span" c="dimmed">
                  {accountQR?.data?.assigned_to === "Robot" ? "Bot" : "me"}
                </Text>
              </Text>
            </Stack>
          </Group>
        )}
        <Group>
          {accountQR.data != null && igThreadId != null && (
            <Menu
              position="bottom-end"
              shadow="md"
              opened={menuOpened}
              onChange={setMenuOpened}
              width={200}
              closeOnItemClick={false}
            >
              <Menu.Target>
                <ActionIcon variant="subtle">
                  <IconDotsVertical />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item>
                  <AssignedToSwitch
                    setMenuOpened={setMenuOpened}
                    igThreadId={igThreadId}
                    accountId={accountQR.data?.id}
                    assignedTo={accountQR.data?.assigned_to ?? "Robot"}
                  />
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </Group>
      {messagesQR.isLoading ? (
        <Box style={{ height: "100%", backgroundColor: "#F8f9fa" }}>
          <Loading loaderVariant="dots" loadingText="Loading messages..." />
        </Box>
      ) : messagesQR.isError ||
        messagesQR.data == null ||
        formattedThreads == null ? (
        <Error
          onClickAction={() => messagesQR.refetch()}
          errorText="There was a problem loading the threads"
        />
      ) : (
        <>
          <Box
            viewportRef={viewport}
            component={ScrollArea}
            style={{ height: 200, flexGrow: 1, backgroundColor: "#F8f9fa" }}
          >
            <Stack
              py={24}
              px={12}
              style={{ height: "100%", backgroundColor: "#F9F8Fa" }}
            >
              {Object.keys(formattedThreads).map((threadDate) => (
                <Stack key={threadDate}>
                  <DateHolder isoDate={threadDate} />
                  {formattedThreads[threadDate].map((formattedThreadBody) => (
                    <>
                      {formattedThreadBody.type === "message" ? (
                        <Group
                          key={formattedThreadBody.date}
                          justify={
                            formattedThreadBody.username === "Me"
                              ? "right"
                              : "left"
                          }
                        >
                          <Group
                            justify={
                              formattedThreadBody.username === "Me"
                                ? "right"
                                : "left"
                            }
                            style={{
                              maxWidth: "80%",
                            }}
                          >
                            <ChatItem
                              avatarColor={avatarColor}
                              profilePicture={null}
                              content={formattedThreadBody.text}
                              content_type={null}
                              userInitials={formattedThreadBody?.username?.charAt(
                                0,
                              )}
                              userNames={formattedThreadBody.username}
                              date={format(
                                parseISO(formattedThreadBody.date),
                                EDateFormats.time,
                              )}
                              owner={
                                formattedThreadBody.username === "Me"
                                  ? "system"
                                  : "lead"
                              }
                            />
                          </Group>
                        </Group>
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Box>
          <MobileMessageBox
            assignedTo={accountQR.data?.assigned_to ?? "Robot"}
            threadId={threadQR.data?.id}
          />
        </>
      )}
    </Stack>
  );
}
