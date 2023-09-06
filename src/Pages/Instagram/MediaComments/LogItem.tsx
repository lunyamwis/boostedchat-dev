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

    default:
      return newStatus;
  }
};

const formatLogAction = (action: string) => {
  const parsedAction: AuditChange = JSON.parse(action);
  if (parsedAction["status"].length > 1) {
    return formatStatusChange(parsedAction["status"][1] as StatusChange);
  }
  return ` changed status from ${parsedAction["status"][0]} to ${parsedAction["status"][1]}`;
};
export function LogItem({ actor, date, action }: Props) {
  return (
    <Divider
      labelPosition="center"
      label={`${actor} ${formatLogAction(action)} at ${format(
        parseISO(date),
        "hh:mm aaa"
      )}`}
    />
  );
}
