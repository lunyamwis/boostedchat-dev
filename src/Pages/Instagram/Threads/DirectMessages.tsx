import React from "react";
import { Avatar, Box, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { format, parseISO } from "date-fns";
import { Loading } from "../../../Components/UIState/Loading";
import { Error } from "../../../Components/UIState/Error";
import { EDateFormats } from "../../../Interfaces/general.interface";
import { DEFAULT_IG_USER } from "../../../Constants/GeneralConstants";
import { useGenerateMessage, useGetDirectMessages } from "./Hooks/thread.hooks";
import { formatChatDate } from "../../../Utils/validator.util";
import { ChatItem } from "../MediaComments/ChatItem";
import { DateHolder } from "../MediaComments/Comments";
import { MessageBox } from "./MessageBox";
import { GeneratedMessageModal } from "./GeneratedDMModal";
import { ThreadDetails } from ".";

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
  const [isGeneratedCommentModalOpen, setIsGeneratedCommentModalOpen] =
    React.useState(false);
  const [generatedResponse, setGeneratedComment] = React.useState("");
  const [formattedThreads, setFormattedThreads] =
    React.useState<FormattedThreads | null>(null);

  const prevTimestamp = React.useRef("");

  const hasNewMessage = React.useRef(false);

  const viewport = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    viewport.current?.scrollTo({
      top: viewport.current?.scrollHeight,
      behavior: "smooth",
    });

  const messagesQR = useGetDirectMessages(threadDetails.threadId);
  const generateMessage = useGenerateMessage();

  React.useEffect(() => {
    if (!messagesQR.data) {
      return;
    }
    if (messagesQR.data.length === 0) {
      return;
    }

    if (prevTimestamp.current === "") {
      return;
    }

    if (
      prevTimestamp.current ===
      messagesQR.data[messagesQR.data.length - 1].timestamp
    ) {
      return;
    }
    if (
      messagesQR.data[messagesQR.data.length - 1].username !==
      threadDetails.username
    ) {
      return;
    }

    hasNewMessage.current = true;

    generateMessage.mutate(
      {
        id: threadDetails.threadId,
        data: {
          text: messagesQR.data[messagesQR.data.length - 1].text,
        },
      },
      {
        onSuccess: (data) => {
          // NOTE: This logic is repeated in another effect
          if (typeof data.generated_comment === "string") {
            setGeneratedComment(data.generated_comment);
          } else {
            setGeneratedComment(
              `There was an error: ${data.generated_comment.error}. Please refresh the page and try again`
            );
          }
          setIsGeneratedCommentModalOpen(true);
        },
      }
    );
  }, [messagesQR.data, messagesQR.data?.length, threadDetails.threadId]);

  React.useEffect(() => {
    if (!messagesQR.data) {
      return;
    }
    if (messagesQR.data.length === 0) {
      return;
    }
    prevTimestamp.current =
      messagesQR.data[messagesQR.data.length - 1].timestamp;
  }, [messagesQR.data, messagesQR.data?.length]);

  React.useEffect(() => {
    if (messagesQR.data == null) {
      return;
    }
    const mFormattedThreads: FormattedThreads = {};

    for (let i = 0; i < messagesQR.data.length; i++) {
      const currThread = messagesQR.data[i];
      const commentDate = formatChatDate(currThread.timestamp, true, true);
      const formattedThreadBody: FormattedThreadsBody = {
        username: currThread.username,
        text: currThread.text,
        date: currThread.timestamp,
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

  React.useEffect(() => {
    if (messagesQR.data == null) {
      return;
    }
    if (threadDetails.replied) {
      return;
    }
    if (hasNewMessage.current === true) {
      return;
    }

    if (
      messagesQR.data[messagesQR.data.length - 1].username !==
      threadDetails.username
    ) {
      return;
    }

    generateMessage.mutate(
      {
        id: threadDetails.threadId,
        data: {
          text: messagesQR.data[messagesQR.data.length - 1].text,
        },
      },
      {
        onSuccess: (data) => {
          // NOTE: This logic is repeated in another effect
          if (typeof data.generated_comment === "string") {
            setGeneratedComment(data.generated_comment);
          } else {
            setGeneratedComment(
              `There was an error: ${data.generated_comment.error}. Please refresh the page and try again`
            );
          }
          setIsGeneratedCommentModalOpen(true);
        },
      }
    );
  }, [threadDetails.replied, messagesQR.data, threadDetails.threadId]);

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
                <Stack>
                  <DateHolder isoDate={threadDate} />
                  {formattedThreads[threadDate].map((formattedThreadBody) => (
                    <Group
                      position={
                        formattedThreadBody.username === DEFAULT_IG_USER
                          ? "right"
                          : "left"
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
          <GeneratedMessageModal
            threadId={threadDetails.threadId}
            isOpen={isGeneratedCommentModalOpen}
            setIsOpen={setIsGeneratedCommentModalOpen}
            generatedResponse={generatedResponse}
          />
        </>
      )}
    </Stack>
  );
}
