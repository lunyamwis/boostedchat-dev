import {
  Box,
  Collapse,
  Group,
  NavLink,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { Icon as IconType, IconChevronDown } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { ChildKeys, pageData, PrimaryPageData } from "../../Pages";
import { useHover } from "@mantine/hooks";

type Props = {
  title: string;
  Icon: IconType;
  url: string;
};

type Level1Props = {
  title: string;
  Icon: IconType;
  childrenKeys: ChildKeys[];
};

export function MenuItem({ title, Icon, url }: Props) {
  const [isActive, setIsActive] = React.useState(false);
  const { pathname } = useLocation();
  const theme = useMantineTheme();

  React.useEffect(() => {
    setIsActive(false);
    const currentSplitPath = pathname.split("/");
    const menuSplitPath = url.split("/");

    if (currentSplitPath.length > 1 && menuSplitPath.length > 1) {
      if (currentSplitPath[2] === menuSplitPath[2]) {
        setIsActive(true);
      }
    }
  }, [pathname, url]);

  return (
    <NavLink
      key={title}
      active={isActive}
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
            backgroundColor:
              pathname === url
                ? "transparent"
                : theme.fn.lighten(theme.colors.brand[6], 0.9),
          },
        },
      }}
    />
  );
}
export function ParentMenuItem({ title, Icon, childrenKeys }: Level1Props) {
  const { ref, hovered } = useHover();
  const theme = useMantineTheme();
  const { pathname } = useLocation();
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <>
      <Box
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        ref={ref}
        sx={{
          marginTop: 0,
          marginBottom: 0,
          paddingTop: "12px",
          paddingBottom: "12px",
          "&:hover": {
            textDecoration: "none",
            backgroundColor: "transparent",
            color: theme.colors.brand[6],
            cursor: "pointer",
            fontWeight: 500,
          },
        }}
      >
        <Group position="apart" align="center" px={24}>
          <Group align="center">
            <Icon
              strokeWidth={1.3}
              size={21}
              color={isExpanded || hovered ? theme.colors.brand[6] : "#000000"}
            />
            <Text
              color={isExpanded || hovered ? "brand" : "#111111"}
              sx={{
                textTransform: "capitalize",
                fontWeight: isExpanded ? 500 : 400,
                fontSize: "15px",
                letterSpacing: "0.1px",
                "&:hover": {
                  textDecoration: "none",
                  color: theme.fn.darken(theme.colors.brand[6], 0.1),
                  cursor: "pointer",
                  fontWeight: 500,
                },
              }}
            >
              {title}
            </Text>
          </Group>
          <IconChevronDown
            size={14}
            strokeWidth={2}
            color={isExpanded || hovered ? theme.colors.brand[6] : "#000000"}
            style={{
              transition: "0.2s",
              transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
            }}
          />
        </Group>
      </Box>
      <Collapse in={isExpanded}>
        <Box
          sx={{
            borderLeft: "1px solid #dee2e6",
            marginLeft: 48,
            marginTop: 0,
          }}
        >
          {childrenKeys.map((childKey) => {
            const child = pageData[childKey] as PrimaryPageData & {
              level: "2";
              url: string;
            };
            return (
              <>
                <Text
                  my={{ base: 8, sm: 4 }}
                  pl={6}
                  py={12}
                  component={Link}
                  to={child.url}
                  color={pathname === child.url ? "brand" : "#222222"}
                  sx={{
                    fontWeight: pathname === child.url ? 500 : 400,
                    display: "list-item",
                    listStyleType: "disc",
                    fontSize: "14px",
                    lineHeight: "17px",
                    letterSpacing: "0.3px",
                    textDecoration: "none",
                    marginLeft: 24,
                    "&:hover": {
                      borderRadius: "4px",
                      color: theme.fn.darken(theme.colors.brand[6], 0.1),
                      cursor: "pointer",
                    },
                  }}
                >
                  {child.title}
                </Text>
              </>
            );
          })}
        </Box>
      </Collapse>
    </>
  );
}
