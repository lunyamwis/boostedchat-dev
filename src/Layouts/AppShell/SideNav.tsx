import {
  Avatar,
  Box,
  Flex,
  Group,
  Menu,
  Overlay,
  Stack,
  Title,
  Tooltip,
  Transition,
  UnstyledButton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { SetStateAction } from "react";
import { ASIDE_WIDTH, SIDENAV_WIDTH } from "../../Constants/GeneralConstants";
import { EGroup, GroupIcons, pageData, TPageData } from "../../Pages";
import { MenuItem, ParentMenuItem } from "../../Components/SideNav/MenuItem";
import {
  IconChevronLeft,
  IconChevronRight,
  IconSettings,
} from "@tabler/icons-react";
import { useAuth } from "../../Context/AuthContext/AuthProvider";
import { useLocation } from "react-router-dom";
import { LogoSmall } from "../../Assets/LogoSmall";
import classes from "./SideNav.module.css";

type Props = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<SetStateAction<boolean>>;
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

const Links = ({ navKey }: { navKey: string }) => {
  const [navKeys, navValues] = navStructure();
  const idx = navKeys.indexOf(navKey);
  return (
    <>
      {navValues[idx].map((navValue, index) => {
        if (navValue.level === "1" && !navValue.hasChildren) {
          return (
            <MenuItem
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
            leftSection={<IconSettings size={14} />}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}
export function SideNav({ collapsed, setCollapsed, opened, setOpened }: Props) {
  const smallScreen = useMediaQuery("(max-width: 768px)");
  const location = useLocation();
  const [active, setActive] = React.useState<EGroup>(EGroup.summaries);
  const [navKeys] = navStructure();

  const GroupIcon = (title: EGroup) => {
    const MIcon = GroupIcons[title];
    return <MIcon size={17} />;
  };

  React.useEffect(() => {
    const currentSplitPath = location.pathname.split("/");

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
        opened && (
          <Box
            component="nav"
            style={{
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
                  style={{
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
        <Group>
          <Box
            mih={"100vh"}
            w={{ sm: collapsed ? ASIDE_WIDTH : SIDENAV_WIDTH }}
            style={{
              zIndex: 100,
              background: "transparent",
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
                        <Flex
                          className={classes.mainLink}
                          justify="center"
                          align="center"
                          key={navKey}
                        >
                          <Tooltip
                            label={navKey}
                            position="right"
                            withArrow
                            transitionProps={{ duration: 0 }}
                            key={navKey}
                          >
                            <UnstyledButton
                              style={{ display: "flex" }}
                              onClick={() => setActive(navKey as EGroup)}
                            >
                              {GroupIcon(navKey as EGroup)}
                            </UnstyledButton>
                          </Tooltip>
                          {/*<NavGroup navKey={navKey} navValues={navValues} idx={idx} />*/}
                          {idx !== navKeys.length - 1 && (
                            <Box mt={{ base: 1, sm: 6 }} mb={0} />
                          )}
                        </Flex>
                      ))}
                    </Stack>
                  </Box>
                  <UserMenu />
                </Stack>
              </div>
              {!collapsed && (
                <div className={classes.main}>
                  <Title order={4} className={classes.title}>
                    {active}
                  </Title>

                  <Links navKey={active} />
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
