import {
  Box,
  Divider,
  Navbar,
  Overlay,
  ScrollArea,
  Transition,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { SetStateAction } from "react";
import { SIDENAV_WIDTH } from "../../Constants/GeneralConstants";
import { pageData, TPageData } from "../../Pages";
import { GroupTitle } from "../../Components/SideNav/GroupTitle";
import { MenuItem, ParentMenuItem } from "../../Components/SideNav/MenuItem";

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

function SideNavItems() {
  const [navKeys, navValues] = navStructure();
  return (
    <>
      {navKeys.map((navKey, idx) => (
        <Box key={idx}>
          <GroupTitle title={navKey as string} />
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
          })}
          {idx !== navKeys.length - 1 && (
            <Divider mt={{ base: 1, sm: 24 }} mb={32} color="#eeeeee" />
          )}
        </Box>
      ))}
    </>
  );
}

export function SideNav({ opened, setOpened }: Props) {
  const smallScreen = useMediaQuery("(max-width: 768px)");
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
                  <SideNavItems />
                </Box>
              )}
            </Transition>
          </Box>
        )
      ) : (
        // )
        <Navbar
          width={{ sm: SIDENAV_WIDTH }}
          height="100vh"
          position={{ top: 1, left: 0 }}
        >
          <Navbar.Section>
            <Box
              sx={{ display: "flex", justifyContent: "center" }}
              py={64}
              mb={8}
              mt={8}
            >
              {"Boosted Chat"}
            </Box>
          </Navbar.Section>
          <Navbar.Section grow component={ScrollArea}>
            <SideNavItems />
          </Navbar.Section>
        </Navbar>
      )}
    </>
  );
}
