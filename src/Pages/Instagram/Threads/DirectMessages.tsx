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
import { Loading } from "../../../Components/UIState/Loading";
import { Error } from "../../../Components/UIState/Error";
import { EDateFormats } from "../../../Interfaces/general.interface";
import {
  useClearThread,
  useGetThreadByIgThreadId,
  useGetThreadMessagesByIgThreadId,
  useResetThreadCount,
} from "./Hooks/thread.hooks";
import { formatChatDate } from "../../../Utils/validator.util";
import { MessageBox } from "./MessageBox";
import { IconDotsVertical } from "@tabler/icons-react";
import { IconExternalLink } from "@tabler/icons-react";
import { openConfirmModal } from "@mantine/modals";
import { AssignedToSwitch } from "./AssignedToSwitch";
import { useGetAccountByThreadId } from "../Account/Hooks/accounts.hook";
import { LogItem } from "./LogItem";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../Constants/ApiConstants";
import { Link, useSearchParams } from "react-router-dom";
import { ChatItem } from "./ChatItem";
import { DateHolder } from "./DateHolder";

type Props = {
  avatarColor: string;
};

type FormattedThreadsBody =
  | {
      type: "message";
      text: string;
      username: string;
      date: string;
    }
  | {
      type: "log";
      change: string;
      username: string;
      date: string;
    };

type FormattedThreads = {
  [key: string]: FormattedThreadsBody[];
};
export function DirectMessages({ avatarColor }: Props) {
  const queryClient = useQueryClient();

  const [igThreadIdSearchParam] = useSearchParams();
  const [igThreadId, setIgThreadId] = React.useState<string | null>(null);
  const [formattedThreads, setFormattedThreads] =
    React.useState<FormattedThreads | null>(null);

  const [menuOpened, setMenuOpened] = React.useState(false);

  const viewport = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    viewport.current?.scrollTo({
      top: viewport.current?.scrollHeight,
      behavior: "smooth",
    });

  const messagesQR = useGetThreadMessagesByIgThreadId(igThreadId);
  const accountQR = useGetAccountByThreadId(igThreadId);
  const threadQR = useGetThreadByIgThreadId(igThreadId);
  const resetThreadCount = useResetThreadCount();
  /*
  const statusChangeLogsQR = useGetAccountStatusAuditLogs(
    threadDetails.account_id
  );
  */
  const clearThread = useClearThread();

  const handleClearChat = () => {
    if (threadQR.data == null) return;
    setMenuOpened(false);
    openConfirmModal({
      title: "Alert",
      children: (
        <Text size="sm">
          Are you sure you want to clear this thread? This action cannot be
          undone.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => clearThread.mutate(threadQR.data.id),
    });
  };

  React.useEffect(() => {
    setIgThreadId(igThreadIdSearchParam.get("thread"));
  }, [igThreadIdSearchParam]);

  React.useEffect(() => {
    if (
      messagesQR.data == null ||
      accountQR.data == null /* || statusChangeLogsQR.data == null*/
    ) {
      return;
    }
    const mFormattedThreads: FormattedThreads = {};

    // let logIndex = 0;
    for (let i = 0; i < messagesQR.data.length; i++) {
      const currThread = messagesQR.data[i];
      const commentDate = formatChatDate(currThread.sent_on, true, true);
      const formattedThreadBody: FormattedThreadsBody = {
        type: "message",
        username:
          currThread.sent_by === "Client" ? accountQR.data.igname : "Me",
        text: currThread.content,
        date: currThread.sent_on,
      };
      /*
      if (
        i < messagesQR.data.length - 1 &&
        logIndex < statusChangeLogsQR.data.length
      ) {
        const nextThread = messagesQR.data[i + 1];
        const currLog = statusChangeLogsQR.data[logIndex];
        if (
          isAfter(parseISO(currLog.timestamp), parseISO(currThread.sent_on)) &&
          isBefore(parseISO(currLog.timestamp), parseISO(nextThread.sent_on))
        ) {
          const exisitingLogDate = formatChatDate(
            currLog.timestamp,
            true,
            true
          );
          for (let q = logIndex; q < statusChangeLogsQR.data.length; q++) {
            const newCurrLog = statusChangeLogsQR.data[q];
            if (
              isBefore(
                parseISO(newCurrLog.timestamp),
                parseISO(nextThread.sent_on)
              )
            ) {
              const mLog = {
                type: "log",

                change: newCurrLog.changes,
                username:
                  newCurrLog.actor === " "
                    ? newCurrLog.actor_email
                    : newCurrLog.actor,
                date: newCurrLog.timestamp,
              } as FormattedThreadsBody;
              if (mFormattedThreads[exisitingLogDate]) {
                mFormattedThreads[exisitingLogDate].push(mLog);
              } else {
                mFormattedThreads[exisitingLogDate] = [mLog];
              }
              mFormattedThreads[commentDate].push();
              logIndex = logIndex + 1;
            } else {
              break;
            }
          }
        }
      }
      if (mFormattedThreads[commentDate]) {
        mFormattedThreads[commentDate].push(formattedThreadBody);
      } else {
        mFormattedThreads[commentDate] = [formattedThreadBody];
      }

      if (
        i >= messagesQR.data.length - 1 &&
        logIndex !== statusChangeLogsQR.data.length - 1
      ) {
        for (let k = logIndex; k < statusChangeLogsQR.data.length; k++) {
          const mLogDate = formatChatDate(
            statusChangeLogsQR.data[k].timestamp,
            true,
            true
          );

          if (mFormattedThreads[mLogDate]) {
            mFormattedThreads[mLogDate].push({
              type: "log",
              change: statusChangeLogsQR.data[k].changes,
              username:
                statusChangeLogsQR.data[k].actor === " "
                  ? statusChangeLogsQR.data[k].actor_email
                  : statusChangeLogsQR.data[k].actor,
              date: statusChangeLogsQR.data[k].timestamp,
            });
          } else {
            mFormattedThreads[mLogDate] = [
              {
                type: "log",
                change: statusChangeLogsQR.data[k].changes,
                username:
                  statusChangeLogsQR.data[k].actor === " "
                    ? statusChangeLogsQR.data[k].actor_email
                    : statusChangeLogsQR.data[k].actor,
                date: statusChangeLogsQR.data[k].timestamp,
              } as FormattedThreadsBody,
            ];
          }
        }
      }
      */
      if (mFormattedThreads[commentDate]) {
        mFormattedThreads[commentDate].push(formattedThreadBody);
      } else {
        mFormattedThreads[commentDate] = [formattedThreadBody];
      }
    }
    setFormattedThreads(mFormattedThreads);
  }, [messagesQR.data, accountQR.data]);

  React.useEffect(() => {
    if (messagesQR.data != null && viewport.current != null) {
      scrollToBottom();
    }
  }, [messagesQR.data]);

  React.useEffect(() => {
    if (threadQR.data == null) return;
    resetThreadCount.mutate(threadQR.data.id, {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.instagram.threads.getAll]);
      },
    });
  }, [threadQR.data]);

  return (
    <Stack justify="space-between" spacing={0} sx={{ height: "100%" }}>
      <Group
        position="apart"
        py={16}
        pl={8}
        pr={16}
        sx={{ borderBottom: "1px solid #F0F0F0" }}
      >
        {accountQR.isLoading && (
          <Group>
            <Avatar color={avatarColor}>
              <Skeleton />
            </Avatar>
            <Stack spacing={1}>
              <Skeleton />
              <Skeleton />
            </Stack>
          </Group>
        )}
        {accountQR.data != null && (
          <Group>
            <Avatar color={avatarColor}>
              {accountQR.data.igname.charAt(0)}
            </Avatar>
            <Stack spacing={1}>
              <Text>{accountQR.data.igname}</Text>
              <Text fz={13} color="dimmed">
                Assigned to{" "}
                <Text component="span" color="dimmed">
                  {accountQR.data.assigned_to === "Robot" ? "Bot" : "me"}
                </Text>
              </Text>
            </Stack>
          </Group>
        )}
        <Group>
          <ActionIcon
            component={Link}
            to="http://promptemplate.boostedchat.com/admin/"
            target="_blank"
          >
            <IconExternalLink />
          </ActionIcon>
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
                <ActionIcon>
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
                <Menu.Item onClick={handleClearChat}>Clear Chat</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </Group>
      {messagesQR.isLoading ? (
        <Box sx={{ height: "100%", backgroundColor: "#F8f9fa" }}>
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
            sx={{ height: 200, flexGrow: 1, backgroundColor: "#F8f9fa" }}
          >
            <Stack
              py={24}
              px={12}
              sx={{ height: "100%", backgroundColor: "#F9F8Fa" }}
            >
              {Object.keys(formattedThreads).map((threadDate) => (
                <Stack key={threadDate}>
                  <DateHolder isoDate={threadDate} />
                  {formattedThreads[threadDate].map((formattedThreadBody) => (
                    <>
                      {formattedThreadBody.type === "message" ? (
                        <Group
                          key={formattedThreadBody.date}
                          position={
                            formattedThreadBody.username === "Me"
                              ? "right"
                              : "left"
                          }
                        >
                          <Group
                            position={
                              formattedThreadBody.username === "Me"
                                ? "right"
                                : "left"
                            }
                            sx={{
                              width: "60%",
                            }}
                          >
                            <ChatItem
                              avatarColor={avatarColor}
                              profilePicture={null}
                              content={formattedThreadBody.text}
                              userInitials={formattedThreadBody.username.charAt(
                                0
                              )}
                              userNames={formattedThreadBody.username}
                              date={format(
                                parseISO(formattedThreadBody.date),
                                EDateFormats.time
                              )}
                            />
                          </Group>
                        </Group>
                      ) : (
                        <LogItem
                          date={formattedThreadBody.date}
                          actor={formattedThreadBody.username}
                          action={formattedThreadBody.change}
                        />
                      )}
                    </>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Box>
          <MessageBox
            assignedTo={accountQR.data?.assigned_to ?? "Robot"}
            threadId={threadQR.data?.id}
          />
        </>
      )}
    </Stack>
  );
}
