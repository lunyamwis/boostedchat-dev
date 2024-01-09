import React from "react";
import {
  Icon,
  IconBrandInstagram,
  IconBrandMessenger,
  IconChartInfographic,
  IconGraph,
  IconUserPlus,
  IconUsers,
  IconUserSearch,
  IconUsersGroup,
} from "@tabler/icons-react";

export type PrimaryPageData = {
  group: EGroup;
  title: string;
  isNavItem: boolean;
  url?: string;
};

type Level1 =
  | {
      hasChildren: true;
      icon: Icon;
      children: ChildKeys[];
    }
  | {
      hasChildren: false;
      url: string;
      icon: Icon;
    };

export type TPageData = PrimaryPageData &
  (({ level: "1" } & Level1) | { level: "2"; url: string });

export type ParentKeys = "Snapshot" | "Accounts" | "Threads";

export type ChildKeys = string;

type TMPageData = Record<ParentKeys | ChildKeys, TPageData>;

export enum EGroup {
  summaries = "Summaries",
  instagram = "Instagram",
  userManagement = "User Management",
}

export const GroupIcons: Record<EGroup, Icon> = {
  Instagram: IconBrandInstagram,
  "User Management": IconUsers,
  Summaries: IconGraph,
};

export const componentData: {
  key: keyof TMPageData;
  component: React.LazyExoticComponent<() => JSX.Element>;
}[] = [
  {
    key: "Snapshot",
    component: React.lazy(() =>
      import("./Dashboard/index").then(({ Summary }) => ({
        default: Summary,
      }))
    ),
  },
  {
    key: "Threads",
    component: React.lazy(() =>
      import("./Instagram/Threads").then(({ Threads }) => ({
        default: Threads,
      }))
    ),
  },
  {
    key: "Accounts",
    component: React.lazy(() =>
      import("./Instagram/Account/Accounts").then(({ Accounts }) => ({
        default: Accounts,
      }))
    ),
  },
];

export const pageData: TMPageData = {
  Snapshot: {
    level: "1",
    group: EGroup.summaries,
    hasChildren: false,
    title: "Snapshot",
    isNavItem: true,
    icon: IconChartInfographic,
    url: "/dashboard/snapshot",
  },
  Threads: {
    level: "1",
    group: EGroup.instagram,
    hasChildren: false,
    title: "Threads",
    isNavItem: true,
    icon: IconBrandMessenger,
    url: "/instagram/threads",
  },
  Accounts: {
    level: "1",
    group: EGroup.instagram,
    hasChildren: false,
    url: "/instagram/accounts",
    title: "Accounts",
    isNavItem: true,
    icon: IconUsersGroup,
  },
};
