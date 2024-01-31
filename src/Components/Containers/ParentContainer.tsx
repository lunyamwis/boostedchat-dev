import {
  Avatar,
  Box,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";
import React from "react";
import { getRandomColor } from "../../Utils/validator.util";
import { IconExternalLink } from "@tabler/icons-react";
import { useHover } from "@mantine/hooks";

type ComponentProps = {
  titleProps: {
    igname?: string;
    fullName?: string;
    bio: string;
  };
  statProps: {
    followers: number;
    following: number;
    posts: number;
  };
  children?: React.ReactNode;
};

const containerStyles = {
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.07)",
  borderRadius: "16px",
};

const color = getRandomColor();

export function FollowStat({ title, count }: { title: string; count: number }) {
  return (
    <Group gap={5}>
      <Text fw={600} fz={15}>
        {count}
      </Text>
      <Text fz={15}>{title}</Text>
    </Group>
  );
}
export function ParentContainer({
  variant = "content",
  titleProps,
  children,
  statProps,
}: { variant: "email" | "content" } & ComponentProps) {
  const { hovered, ref } = useHover();

  const theme = useMantineTheme();
  return (
    <Stack gap={variant === "email" ? 20 : 0}>
      <Group
        style={{
          paddingTop: 35,
          paddingLeft: 20,
          paddingBottom: 35,
          backgroundColor: variant === "email" ? "#FFFEFE" : "white",
          ...containerStyles,
        }}
      >
        <Avatar variant="light" radius="100%" size="xl" color={color}>
          {titleProps.igname?.charAt(0).toUpperCase()}
        </Avatar>
        <Stack>
          <Stack gap={4}>
            <Group gap={6} ref={ref}>
              <Text
                component={Link}
                to={`https://www.instagram.com/${titleProps.igname}`}
                target="_blank"
                c={hovered ? theme.colors[color][6] : "black"}
                style={{
                  fontWeight: 600,
                  fontSize: "20px",
                }}
              >
                {titleProps.igname}
              </Text>
              {hovered && (
                <IconExternalLink
                  color={hovered ? theme.colors[color][6] : "black"}
                  size={17}
                />
              )}
            </Group>
            <Text
              style={(theme) => ({
                color: theme.colors.gray[9],
                fontSize: "13px",
              })}
            >
              {titleProps.fullName}
            </Text>
            <Text
              style={(theme) => ({
                color: theme.colors.gray[9],
                fontSize: "13px",
              })}
            >
              {titleProps.bio}
            </Text>
          </Stack>
          <Group>
            <FollowStat title="followers" count={statProps.followers} />
            <FollowStat title="following" count={statProps.following} />
            <FollowStat title="posts" count={statProps.posts} />
          </Group>
        </Stack>
      </Group>

      <Box style={{ display: "flex", flexDirection: "column" }}>{children}</Box>
    </Stack>
  );
}
