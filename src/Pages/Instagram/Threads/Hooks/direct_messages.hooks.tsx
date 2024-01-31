import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  useGetThreadByIgThreadId,
  useGetThreadMessagesByIgThreadId,
  useResetThreadCount,
} from "./thread.hooks";
import { useGetAccountByThreadId } from "../../Account/Hooks/accounts.hook";
import { formatChatDate } from "@/Utils/validator.util";
import { queryKeys } from "@/Constants/ApiConstants";

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

export type FormattedThreads = {
  [key: string]: FormattedThreadsBody[];
};

export const useDirectMessages = () => {
  const queryClient = useQueryClient();

  const [igThreadIdSearchParam] = useSearchParams();
  const [igThreadId, setIgThreadId] = React.useState<string | null>(null);
  const [formattedThreads, setFormattedThreads] =
    React.useState<FormattedThreads | null>(null);

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
        queryClient.invalidateQueries({
          queryKey: [queryKeys.instagram.threads.getAll],
        });
      },
    });
  }, [threadQR.data]);

  return {
    accountQR,
    messagesQR,
    threadQR,
    igThreadId,
    viewport,
    formattedThreads,
  };
};
