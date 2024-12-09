import { Box, Group, ScrollArea, Stack } from "@mantine/core";
import React from "react";
import { DateHolder } from "../../DateHolder";
import { ChatItem } from "../../ChatItem";
import { format, parseISO } from "date-fns";
import { EDateFormats } from "@/Interfaces/general.interface";
import { MessageBox } from "../../MessageBox";
import { UseQueryResult } from "@tanstack/react-query";
import {
  GetThreadMessage,
  Thread,
} from "@/Interfaces/Instagram/Threads/thread.interface";
import { FormattedThreads } from "../../Hooks/direct_messages.hooks";
import { GetSingleAccount } from "@/Interfaces/Instagram/account.interface";
import { Loading } from "@/Components/UIState/Loading";
import { Error } from "@/Components/UIState/Error";

type Props = {
  threadQR: UseQueryResult<Thread>;
  viewport: React.RefObject<HTMLDivElement>;
  formattedThreads: FormattedThreads | null;
  accountQR: UseQueryResult<GetSingleAccount>;
  messagesQR: UseQueryResult<GetThreadMessage[]>;
  avatarColor: string;
};

export function ThreadsBody({
  threadQR,
  viewport,
  formattedThreads,
  avatarColor,
  accountQR,
  messagesQR,
}: Props) {
  if (messagesQR.isPending) {
    return (
      <Box style={{ height: "100%", backgroundColor: "#F8f9fa" }}>
        <Loading loaderVariant="dots" loadingText="Loading messages..." />
      </Box>
    );
  }
  if (messagesQR.isError || messagesQR.data == null) {
    <Error
      onClickAction={() => messagesQR.refetch()}
      errorText="There was a problem loading the threads"
    />;
  }
  if (formattedThreads == null) {
    return (
      <Box style={{ height: "100%", backgroundColor: "#F8f9fa" }}>
        <Loading loaderVariant="dots" loadingText="Loading messages..." />
      </Box>
    );
  }

  return (
    <Stack gap={0} h="100%">
      <Box
        viewportRef={viewport}
        component={ScrollArea}
        style={{ height: 400, flexGrow: 1, backgroundColor: "#F8f9fa" }}
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
                        formattedThreadBody.username === "Me" ? "right" : "left"
                      }
                    >
                      <Group
                        justify={
                          formattedThreadBody.username === "Me"
                            ? "right"
                            : "left"
                        }
                        style={{
                          width: "60%",
                        }}
                      >
                        <ChatItem
                          avatarColor={avatarColor}
                          profilePicture={null}
                          content={formattedThreadBody?.text}
                          userInitials={formattedThreadBody?.username?.charAt(0)}
                          userNames={formattedThreadBody?.username}
                          content_type={null}
                          date={format(
                            parseISO(formattedThreadBody?.date),
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
      <MessageBox
        assignedTo={accountQR.data?.assigned_to ?? "Robot"}
        threadId={threadQR.data?.id}
      />
    </Stack>
  );
}
