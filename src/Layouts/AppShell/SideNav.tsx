import {
  Avatar,
  Box,
  createStyles,
  Menu,
  Navbar,
  Overlay,
  rem,
  Stack,
  Title,
  Tooltip,
  Transition,
  UnstyledButton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { SetStateAction } from "react";
import { SIDENAV_WIDTH } from "../../Constants/GeneralConstants";
import { EGroup, GroupIcons, pageData, TPageData } from "../../Pages";
import { MenuItem, ParentMenuItem } from "../../Components/SideNav/MenuItem";
import { Settings } from "tabler-icons-react";
import { useAuth } from "../../Context/AuthContext/AuthProvider";

type Props = {
  opened: boolean;
  setOpened: React.Dispatch<SetStateAction<boolean>>;
};

const navStructure = (): [string[], TPageData[][]] => {
  if (pageData == null) return [[], []];
  const navMap: { [key: string]: TPageData[] } = {};
  const _navValues = Object.values(pageData);
  _navValues.forEach((pageItem) => {
    if (!pageItem.isNavItem) return;
    if (navMap[pageItem.group]) {
      navMap[pageItem.group].push(pageItem);
    } else {
      navMap[pageItem.group] = [pageItem];
    }
  });
  return [Object.keys(navMap), Object.values(navMap)];
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
  },

  aside: {
    flex: `0 0 ${rem(64)}`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : "#f1f5f8"
    }`,
  },

  main: {
    flex: 1,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
  },

  mainLink: {
    width: rem(44),
    height: rem(44),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },

  title: {
    boxSizing: "border-box",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: rem(18),
    height: rem(60),
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  logo: {
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    height: rem(60),
    paddingTop: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },

  link: {
    boxSizing: "border-box",
    display: "block",
    textDecoration: "none",
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: rem(44),
    lineHeight: rem(44),

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  linkActive: {
    "&, &:hover": {
      borderLeftColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      color: theme.white,
    },
  },
}));

const Links = ({ navKey }: { navKey: string }) => {
  const [navKeys, navValues] = navStructure();
  const idx = navKeys.indexOf(navKey);
  console.log(navKey, navKeys, idx);
  return (
    <>
      {navValues[idx].map((navValue, index) => {
        if (navValue.level === "1" && !navValue.hasChildren) {
          return (
            <MenuItem
              key={index}
              url={navValue.url}
              title={navValue.title}
              Icon={navValue.icon}
            />
          );
        }
        if (navValue.level === "1" && navValue.hasChildren) {
          return (
            <ParentMenuItem
              Icon={navValue.icon}
              key={index}
              title={navValue.title}
              childrenKeys={navValue.children}
            />
          );
        }
        return <></>;
      })}
    </>
  );
};

function UserMenu() {
  const { dispatch } = useAuth();
  return (
    <Box mb={16}>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Avatar color="brand" src={null} size="md" />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item
            onClick={() => dispatch({ type: "LOGOUT" })}
            icon={<Settings size={14} />}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}
export function SideNav({ opened, setOpened }: Props) {
  const smallScreen = useMediaQuery("(max-width: 768px)");
  const { classes, cx } = useStyles();
  const [active, setActive] = React.useState<EGroup>(EGroup.userManagement);
  const [navKeys] = navStructure();

  const GroupIcon = (title: EGroup) => {
    const MIcon = GroupIcons[title];
    return <MIcon size={16} />;
  };

  return (
    <>
      {smallScreen ? (
        opened && (
          <Box
            component="nav"
            sx={{
              zIndex: 110,
              position: "absolute",
              width: smallScreen ? "100vw" : SIDENAV_WIDTH,
              height: "100vh",
            }}
          >
            <Transition mounted={opened} transition="fade" duration={10000}>
              {() => (
                <Overlay
                  opacity={0.5}
                  color="#000"
                  zIndex={120}
                  onClick={() => setOpened(false)}
                />
              )}
            </Transition>
            <Transition mounted={opened} transition="slide-left">
              {() => (
                <Box
                  sx={{
                    zIndex: 130,
                    height: "100%",
                    width: smallScreen ? "65%" : "100%",
                    backgroundColor: "#ffffff",
                    position: "absolute",
                  }}
                >
                  {/*                  <SideNavItems />*/}
                </Box>
              )}
            </Transition>
          </Box>
        )
      ) : (
        <Navbar
          position={{ top: 1, left: 0 }}
          mih={"100vh"}
          width={{ sm: 300 }}
        >
          <Navbar.Section grow className={classes.wrapper}>
            <div className={classes.aside}>
              <Stack h="100%" justify="space-between">
                <Box>
                  <div className={classes.logo}>
                    <>B</>
                  </div>
                  {navKeys.map((navKey, idx) => (
                    <Box key={idx}>
                      <Tooltip
                        label={navKey}
                        position="right"
                        withArrow
                        transitionProps={{ duration: 0 }}
                        key={navKey}
                      >
                        <UnstyledButton
                          onClick={() => setActive(navKey as EGroup)}
                          className={cx(classes.mainLink, {
                            [classes.mainLinkActive]: navKey === active,
                          })}
                        >
                          {GroupIcon(navKey as EGroup)}
                        </UnstyledButton>
                      </Tooltip>
                      {/*<NavGroup navKey={navKey} navValues={navValues} idx={idx} />*/}
                      {idx !== navKeys.length - 1 && (
                        <Box mt={{ base: 1, sm: 6 }} mb={0} />
                      )}
                    </Box>
                  ))}
                </Box>
                <UserMenu />
              </Stack>
            </div>
            <div className={classes.main}>
              <Title order={4} className={classes.title}>
                {active}
              </Title>

              <Links navKey={active} />
            </div>
          </Navbar.Section>
        </Navbar>
      )}
    </>
  );
}
