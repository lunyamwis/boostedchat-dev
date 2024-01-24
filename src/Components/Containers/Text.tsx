import { Group, MantineColor, Text as MantineText } from "@mantine/core";
import { format } from "date-fns";
import React from "react";
import { Badge } from "../MantineWrappers/Badge";

type DefaultProps = {
  title: string;
  comment?: { error: boolean; value: string };
  align?: AlignSetting;
};

type ComponentProps =
  | {
      type: "date";
      value: { date: Date | string | null | undefined; withTime: boolean };
    }
  | {
      type: "status";
      value: { color: MantineColor; message?: string; timeStatus?: boolean };
    }
  | {
      type: "text";
      value?: string | null;
    };

export function Text({
  title,
  value,
  type,
  comment,
  align = "right",
}: ComponentProps & DefaultProps) {
  return (
    <Group w="100%">
      <MantineText
        style={{
          flex: 0.5,
          fontWeight: 600,
          fontSize: "0.875rem",
          textAlign: align,
        }}
      >
        {title}:
      </MantineText>
      {type === "date" && <DateComponent {...value} />}
      {type === "status" && <StatusComponent {...value} />}
      {type === "text" && <TextComponent value={value} />}
      {comment && (
        <MantineText
          c={comment.error ? "#ef5350" : "#999999"}
          style={{ fontSize: "0.8rem" }}
        >
          {comment.value}
        </MantineText>
      )}
    </Group>
  );
}

function NAComponent() {
  return (
    <MantineText style={{ flex: 0.5, fontSize: "0.875rem" }} c="#999999">
      n/a
    </MantineText>
  );
}

function DateComponent({
  date,
  withTime,
}: {
  date: Date | string | null | undefined;
  withTime: boolean;
}) {
  if (date == null) {
    return <NAComponent />;
  }
  return typeof date === "string" ? (
    <MantineText style={{ fontSize: "0.875rem" }} c="#444">
      {withTime
        ? format(new Date(date), "dd MMM yyy, h:mm aaa")
        : format(new Date(date), "dd MMMM yyy")}
    </MantineText>
  ) : (
    <MantineText style={{ fontSize: "0.875rem" }} c="#444">
      {withTime
        ? format(date as Date, "dd MMM yyy, h:mm aaa")
        : format(date as Date, "dd MMMM yyy")}
    </MantineText>
  );
}

function StatusComponent({
  timeStatus,
  color,
  message,
}: {
  color: MantineColor;
  message?: string;
  timeStatus?: boolean;
}) {
  if (message == null) {
    return <NAComponent />;
  }
  return timeStatus ? (
    <MantineText style={{ fontSize: "0.875rem" }} c={color}>
      {message}
    </MantineText>
  ) : (
    <Group justify="left">
      <Badge size="lg" color={color} text={message} />
    </Group>
  );
}

function TextComponent({ value }: { value?: string | null }) {
  if (value == null) {
    return <NAComponent />;
  }
  return (
    <MantineText style={{ flex: 0.5, fontSize: "0.875rem" }} c="#444">
      {value}
    </MantineText>
  );
}
