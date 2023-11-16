import { Divider } from "@mantine/core";
import React from "react";
import { format, parseISO } from "date-fns";
import {
  AuditChange,
  StatusChange,
} from "../../../Interfaces/Logs/logs.interface";

type Props = {
  actor: string;
  date: string;
  action: string;
};

const formatStatusChange = (newStatus: StatusChange) => {
  switch (newStatus) {
    case StatusChange.firstCompliment:
      return "sent first compliment";
    case StatusChange.sentFirstQuestion:
      return "sent first question";
    case StatusChange.confirmedProblem:
      return "confirmed problem";
    case StatusChange.sentCompliment:
      return "sent compliment";
    case StatusChange.overcomeObjections:
      return "overcome objections";
    case StatusChange.overcome:
      return "overcome";
    case StatusChange.none:
      return "";
    default:
      return newStatus;
  }
};

const formatLogAction = (action: string) => {
  const parsedAction: AuditChange = JSON.parse(action);
  if (parsedAction["status"].length > 1) {
    return ` Changed status from ${formatStatusChange(
      parsedAction["status"][0] as StatusChange
    )} to ${formatStatusChange(parsedAction["status"][1] as StatusChange)}`;
  }
  return ` changed status from ${parsedAction["status"][0]} to ${parsedAction["status"][1]}`;
};

export function LogItem({ date, action }: Props) {
  return (
    <Divider
      labelPosition="center"
      label={`${formatLogAction(action)} at ${format(
        parseISO(date),
        "h:mm aaa"
      )}`}
    />
  );
}
