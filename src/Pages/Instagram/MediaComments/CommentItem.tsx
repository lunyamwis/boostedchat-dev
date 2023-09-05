import { Avatar, Group, Text } from "@mantine/core";
import React from "react";
import { MediaComment } from "../../../Interfaces/Instagram/comment.interface";
import { format, parseISO } from "date-fns";

type Props = {
  comment: MediaComment;
};

export function CommentItem({ comment }: Props) {
  return (
    <Group sx={{ flexWrap: "nowrap" }}>
      <Avatar size="sm" radius="xl" src={comment[2][1][3][1]} color="cyan">
        {comment[2][1][2][1].charAt(0)}
      </Avatar>
      <Text fw={400} fz={12}>
        <Text component="span" fw={600}>
          {comment[2][1][1][1]}
        </Text>{" "}
        {comment[1][1]}
      </Text>
      <Text fz={12}></Text>
      <Text fz={12}>{format(parseISO(comment[3][1]), "dd/MM")}</Text>
    </Group>
  );
}
