import React from "react";
import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Menu,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { format, parseISO } from "date-fns";
import { Loading } from "../../../Components/UIState/Loading";
import { Error } from "../../../Components/UIState/Error";
import { EDateFormats } from "../../../Interfaces/general.interface";
import { useClearThread, useGetThreadMessages } from "./Hooks/thread.hooks";
import { formatChatDate } from "../../../Utils/validator.util";
import { ChatItem } from "../MediaComments/ChatItem";
import { DateHolder } from "../MediaComments/Comments";
import { MessageBox } from "./MessageBox";
import { ThreadDetails } from ".";
import { DotsVertical } from "tabler-icons-react";
import { openConfirmModal } from "@mantine/modals";

type Props = {
  threadDetails: ThreadDetails;
  avatarColor: string;
};

type FormattedThreadsBody = {
  text: string;
  username: string;
  date: string;
};

type FormattedThreads = {
  [key: string]: FormattedThreadsBody[];
};
export function DirectMessages({ threadDetails, avatarColor }: Props) {
  const [formattedThreads, setFormattedThreads] =
    React.useState<FormattedThreads | null>(null);

  const viewport = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    viewport.current?.scrollTo({
      top: viewport.current?.scrollHeight,
      behavior: "smooth",
    });

  const messagesQR = useGetThreadMessages(threadDetails.threadId);
  const clearThread = useClearThread();

  const handleClearChat = () => {
    openConfirmModal({
      title: "Alert",
      children: (
        <Text size="sm">
          Are you sure you want to clear this thread? This action cannot be
          undone.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => clearThread.mutate(threadDetails.threadId),
    });
  };

  React.useEffect(() => {
    if (messagesQR.data == null) {
      return;
    }
    const mFormattedThreads: FormattedThreads = {};

    for (let i = 0; i < messagesQR.data.length; i++) {
      const currThread = messagesQR.data[i];
      const commentDate = formatChatDate(currThread.sent_on, true, true);
      const formattedThreadBody: FormattedThreadsBody = {
        username:
          currThread.sent_by === "Client" ? threadDetails.username : "Me",
        text: currThread.content,
        date: currThread.sent_on,
      };
      if (mFormattedThreads[commentDate]) {
        mFormattedThreads[commentDate].push(formattedThreadBody);
      } else {
        mFormattedThreads[commentDate] = [formattedThreadBody];
      }
    }
    setFormattedThreads(mFormattedThreads);
  }, [messagesQR.data]);

  React.useEffect(() => {
    if (messagesQR.data != null && viewport.current != null) {
      scrollToBottom();
    }
  }, [messagesQR.data]);

  return (
    <Stack justify="space-between" spacing={0} sx={{ height: "100%" }}>
      <Group
        position="apart"
        py={16}
        pl={8}
        pr={16}
        sx={{ borderBottom: "1px solid #F0F0F0" }}
      >
        <Group>
          <Avatar color={avatarColor}>
            {threadDetails.username.charAt(0)}
          </Avatar>
          <Stack spacing={1}>
            <Text>{threadDetails.username}</Text>
          </Stack>
        </Group>
        <Menu position="bottom-end" shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon>
              <DotsVertical />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={handleClearChat}>Clear Chat</Menu.Item>
          </Menu.Dropdown>
        </Menu>
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
                    <Group
                      key={formattedThreadBody.date}
                      position={
                        formattedThreadBody.username === "Me" ? "right" : "left"
                      }
                    >
                      <Box
                        sx={{
                          width: "60%",
                        }}
                      >
                        <ChatItem
                          avatarColor={avatarColor}
                          profilePicture={null}
                          content={formattedThreadBody.text}
                          userInitials={formattedThreadBody.username.charAt(0)}
                          userNames={formattedThreadBody.username}
                          date={format(
                            parseISO(formattedThreadBody.date),
                            EDateFormats.time
                          )}
                        />
                      </Box>
                    </Group>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Box>
          <MessageBox threadId={threadDetails.threadId} />
        </>
      )}
    </Stack>
  );
}
