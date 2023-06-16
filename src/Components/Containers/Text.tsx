import { Grid, Group, MantineColor, Text as MantineText } from "@mantine/core";
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
      value?: string;
    };

export function Text({
  title,
  value,
  type,
  comment,
  align = "right",
}: ComponentProps & DefaultProps) {
  return (
    <Grid gutter={16} sx={{ marginTop: 16, marginBottom: 16 }}>
      <Grid.Col py={0} pr={0} pl={16} sm={5}>
        <MantineText
          sx={{ fontWeight: 600, fontSize: "0.875rem", textAlign: align }}
        >
          {title}:
        </MantineText>
      </Grid.Col>
      <Grid.Col py={0} pr={0} pl={16} sm={7}>
        {type === "date" && <DateComponent {...value} />}
        {type === "status" && <StatusComponent {...value} />}
        {type === "text" && <TextComponent value={value} />}
        {comment && (
          <MantineText
            color={comment.error ? "#ef5350" : "#999999"}
            sx={{ fontSize: "0.8rem" }}
          >
            {comment.value}
          </MantineText>
        )}
      </Grid.Col>
    </Grid>
  );
}

function NAComponent() {
  return (
    <MantineText sx={{ fontSize: "0.875rem" }} color="#999999">
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
    <MantineText sx={{ fontSize: "0.875rem" }} color="#444">
      {withTime
        ? format(new Date(date), "dd MMM yyy, h:mm aaa")
        : format(new Date(date), "dd MMMM yyy")}
    </MantineText>
  ) : (
    <MantineText sx={{ fontSize: "0.875rem" }} color="#444">
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
    <MantineText sx={{ fontSize: "0.875rem" }} color={color}>
      {message}
    </MantineText>
  ) : (
    <Group position="left">
      <Badge size="lg" color={color} text={message} />
    </Group>
  );
}

function TextComponent({ value }: { value?: string }) {
  if (value == null) {
    return <NAComponent />;
  }
  return (
    <MantineText sx={{ fontSize: "0.875rem" }} color="#444">
      {value}
    </MantineText>
  );
}
