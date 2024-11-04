import {
  Avatar,
  Box,
  Divider,
  Group,
  Menu,
  NavLink,
  Overlay,
  Stack,
  Text,
  Title,
  Tooltip,
  Transition,
  UnstyledButton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { SetStateAction } from "react";
import { ASIDE_WIDTH, SIDENAV_WIDTH } from "../../Constants/GeneralConstants";
import { EGroup, GroupIcons, pageData, TPageData } from "../../Pages";
import {
  MenuItem,
  MobileMenuItem,
  ParentMenuItem,
} from "../../Components/SideNav/MenuItem";
import {
  IconChevronLeft,
  IconChevronRight,
  IconLogout2,
  IconSettings,
} from "@tabler/icons-react";
import { useAuth } from "../../Context/AuthContext/AuthProvider";
import { useLocation } from "react-router-dom";
import { LogoSmall } from "../../Assets/LogoSmall";
import classes from "./SideNav.module.css";
import { Logo } from "../../Assets/Logo";

type Props = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<SetStateAction<boolean>>;
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

const MobileLinks = () => {
  const [, navValues] = navStructure();
  const { dispatch } = useAuth();
  return (
    <Stack gap={12}>
      {navValues.map((navValue, index) => {
        return (
          <Stack gap={2}>
            <Text fw={500} ml={20} mb={12} fz={15}>
              {navValue[0].group}
            </Text>
            <Stack gap={0}>
              {navValue.map((val) => (
                <MobileMenuItem
                  closeNav={() => dispatch({ type: "TOGGLE_NAV" })}
                  key={val.url}
                  url={val.url as string}
                  title={val.title}
                  Icon={val.icon}
                />
              ))}
            </Stack>
            {index < navValues.length - 1 && <Divider mb={32} color="#eee" />}
          </Stack>
        );
      })}
    </Stack>
  );
};
const Links = ({
  navKey,
  setCollapsed,
}: {
  navKey: string;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [navKeys, navValues] = navStructure();
  const idx = navKeys.indexOf(navKey);
  return (
    <>
      {navValues[idx].map((navValue, index) => {
        if (navValue.level === "1" && !navValue.hasChildren) {
          return (
            <MenuItem
              setCollapsed={setCollapsed}
              key={navValue.url}
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
          <Avatar
            style={{ cursor: "pointer" }}
            color="brand"
            src={null}
            size="md"
          />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item
            onClick={() => dispatch({ type: "LOGOUT" })}
            leftSection={<IconSettings size={14} />}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}
export function SideNav({ collapsed, setCollapsed }: Props) {
  const smallScreen = useMediaQuery("(max-width: 768px)");
  const location = useLocation();
  const [active, setActive] = React.useState<EGroup>(EGroup.summaries);
  const [navKeys] = navStructure();
  const { isNavOpened, dispatch } = useAuth();

  const GroupIcon = (title: EGroup) => {
    const MIcon = GroupIcons[title];
    return <MIcon size={17} />;
  };

  React.useEffect(() => {
    const currentSplitPath = location.pathname?.split("/");

    const paths = Object.values(pageData);
    for (let i = 0; i < paths.length; i++) {
      if (paths[i].url != null) {
        const splitPath = paths[i].url?.split("/");
        if (splitPath?.[1] === currentSplitPath[1]) {
          setActive(paths[i].group);
          break;
        }
      }
    }
  }, [location.pathname]);

  return (
    <>
      {smallScreen ? (
        isNavOpened && (
          <Box
            component="nav"
            style={{
              zIndex: 110,
              position: "absolute",
              width: smallScreen ? "100vw" : SIDENAV_WIDTH,
              height: "100vh",
            }}
          >
            <Transition
              mounted={isNavOpened}
              transition="fade"
              duration={10000}
            >
              {() => (
                <Overlay
                  opacity={0.5}
                  color="#000"
                  zIndex={120}
                  onClick={() => dispatch({ type: "TOGGLE_NAV" })}
                />
              )}
            </Transition>
            <Transition mounted={isNavOpened} transition="slide-left">
              {() => (
                <Stack
                  style={{
                    zIndex: 130,
                    height: "100%",
                    width: smallScreen ? "75%" : "100%",
                    backgroundColor: "#ffffff",
                    position: "absolute",
                  }}
                  px={12}
                >
                  <Group justify="center" py={12} my={32}>
                    <Logo />
                  </Group>
                  <Stack style={{ flex: 1 }} justify="space-between">
                    <MobileLinks />
                    <NavLink
                      onClick={() => {
                        dispatch({ type: "LOGOUT" });
                        dispatch({ type: "TOGGLE_NAV" });
                      }}
                      mb={12}
                      label="Logout"
                      leftSection={<IconLogout2 size="17px" stroke={1.5} />}
                      variant="subtle"
                      active
                    />
                  </Stack>
                </Stack>
              )}
            </Transition>
          </Box>
        )
      ) : (
        <Group>
          <Box
            mih={"100vh"}
            w={{ sm: collapsed ? ASIDE_WIDTH : SIDENAV_WIDTH }}
            style={{
              zIndex: 100,
              backgroundClip: "#FFF",
              border: 0,
              display: "flex",
            }}
          >
            <Box className={classes.wrapper}>
              <div className={classes.aside}>
                <Stack h="100%" justify="space-between">
                  <Box>
                    <div className={classes.logo}>
                      <LogoSmall />
                    </div>
                    <Stack gap={5}>
                      {navKeys.map((navKey, idx) => (
                        <>
                          <Tooltip
                            label={navKey}
                            position="right"
                            withArrow
                            transitionProps={{ duration: 0 }}
                            key={navKey}
                          >
                            <UnstyledButton
                              className={classes.link}
                              data-active={active === navKey || undefined}
                              onClick={() => {
                                setActive(navKey as EGroup);
                                setCollapsed(false);
                              }}
                            >
                              {GroupIcon(navKey as EGroup)}
                            </UnstyledButton>
                          </Tooltip>
                          {/*<NavGroup navKey={navKey} navValues={navValues} idx={idx} />*/}
                          {idx !== navKeys.length - 1 && (
                            <Box mt={{ base: 1, sm: 6 }} mb={0} />
                          )}
                        </>
                      ))}
                    </Stack>
                  </Box>
                  <UserMenu />
                </Stack>
              </div>
              {!collapsed && (
                <div style={{ padding: "0px 12px" }} className={classes.main}>
                  <Title order={4} className={classes.title}>
                    {active}
                  </Title>

                  <Links setCollapsed={setCollapsed} navKey={active} />
                </div>
              )}
            </Box>
          </Box>
          <Box
            style={{
              position: "absolute",
              marginLeft: (collapsed ? ASIDE_WIDTH : SIDENAV_WIDTH) - 7,
              cursor: "pointer",
              transition: "0.2s",
            }}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            <Box
              style={{
                position: "absolute",
                zIndex: 1,
                borderLeft: "20px solid white",
                borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent",
                width: 0,
                height: "50px",
                borderTopRightRadius: " 12px",
                borderBottomRightRadius: "12px",
                boxShadow: "1px 1px 5px 0px #00000026",
              }}
            ></Box>
            <Box
              style={{
                zIndex: 2,
                position: "absolute",
                marginTop: 18,
                marginLeft: 7,
              }}
            >
              {collapsed ? (
                <IconChevronRight size={14} />
              ) : (
                <IconChevronLeft size={14} />
              )}
            </Box>
          </Box>
        </Group>
      )}
    </>
  );
}
