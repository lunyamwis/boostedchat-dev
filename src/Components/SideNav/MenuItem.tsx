import { NavLink, useMantineTheme } from "@mantine/core";
import React from "react";
import { Icon as IconType } from "tabler-icons-react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  title: string;
  Icon: IconType;
  url: string;
};

export function MenuItem({ title, Icon, url }: Props) {
  const { pathname } = useLocation();
  const theme = useMantineTheme();
  return (
    <NavLink
      key={title}
      active={pathname === url}
      label={title}
      color={theme.primaryColor}
      component={Link}
      to={url}
      my={{ base: 8, sm: 4 }}
      pl={24}
      py={12}
      icon={<Icon size={18} strokeWidth={1.5} />}
      styles={{
        label: {
          fontSize: "14px",
          // color: "#616161",
        },
        root: {
          "&:hover": {
            borderTopRightRadius: "16px",
            borderBottomRightRadius: "16px",
            backgroundColor: theme.fn.lighten("#00D0FF", 0.9),
          },
        },
      }}
    />
  );
}
