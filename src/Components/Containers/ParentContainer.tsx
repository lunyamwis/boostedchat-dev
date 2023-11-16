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

function UserStat({ title, count }: { title: string; count: number }) {
  return (
    <Group spacing={5}>
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
    <Stack spacing={variant === "email" ? 20 : 0}>
      <Group
        sx={{
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
          <Stack spacing={4}>
            <Group spacing={6} ref={ref}>
              <Text
                component={Link}
                to={`https://www.instagram.com/${titleProps.igname}`}
                target="_blank"
                color={hovered ? theme.colors[color][6] : "black"}
                sx={{
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
              sx={(theme) => ({
                color: theme.colors.gray[9],
                fontSize: "13px",
              })}
            >
              {titleProps.fullName}
            </Text>
            <Text
              sx={(theme) => ({
                color: theme.colors.gray[9],
                fontSize: "13px",
              })}
            >
              {titleProps.bio}
            </Text>
          </Stack>
          <Group>
            <UserStat title="followers" count={statProps.followers} />
            <UserStat title="following" count={statProps.following} />
            <UserStat title="posts" count={statProps.posts} />
          </Group>
        </Stack>
      </Group>

      <Box sx={{ display: "flex", flexDirection: "column" }}>{children}</Box>
    </Stack>
  );
}
