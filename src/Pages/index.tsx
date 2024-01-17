import React from "react";
import {
  Icon,
  IconBrandInstagram,
  IconBrandMessenger,
  IconChartInfographic,
  IconGraph,
  IconTerminal2,
  IconUsers,
  IconUsersGroup,
  IconUserShield,
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

export type TPageData = PrimaryPageData & ({ level: "1" } & Level1);

export type ParentKeys =
  | "Snapshot"
  | "Accounts"
  | "AccountDetails"
  | "Threads"
  | "Prompts"
  | "Roles";

export type ChildKeys = "";

type TMPageData = Record<ParentKeys, TPageData>;

export enum EGroup {
  summaries = "Summaries",
  instagram = "Instagram",
  userManagement = "User Management",
  scripts = "Scripts",
}

export const GroupIcons: Record<EGroup, Icon> = {
  Instagram: IconBrandInstagram,
  "User Management": IconUsers,
  Summaries: IconGraph,
  Scripts: IconTerminal2,
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
      })),
    ),
  },
  {
    key: "Threads",
    component: React.lazy(() =>
      import("./Instagram/Threads").then(({ Threads }) => ({
        default: Threads,
      })),
    ),
  },
  {
    key: "Accounts",
    component: React.lazy(() =>
      import("./Instagram/Account/Accounts").then(({ Accounts }) => ({
        default: Accounts,
      })),
    ),
  },
  {
    key: "AccountDetails",
    component: React.lazy(() =>
      import("./Instagram/Account/Details/index").then(
        ({ AccountDetails }) => ({
          default: AccountDetails,
        }),
      ),
    ),
  },
  {
    key: "Prompts",
    component: React.lazy(() =>
      import("./Scripts/Prompts/index").then(({ Prompts }) => ({
        default: Prompts,
      })),
    ),
  },
  {
    key: "Roles",
    component: React.lazy(() =>
      import("./Scripts/Roles/index").then(({ ScriptRoles }) => ({
        default: ScriptRoles,
      })),
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
  AccountDetails: {
    level: "1",
    group: EGroup.instagram,
    hasChildren: false,
    url: "/instagram/accounts/:id",
    title: "Account Details",
    isNavItem: false,
    icon: IconUsersGroup,
  },
  Prompts: {
    level: "1",
    group: EGroup.scripts,
    hasChildren: false,
    url: "/scripts/prompts",
    title: "Prompts",
    isNavItem: true,
    icon: IconUsersGroup,
  },
  Roles: {
    level: "1",
    group: EGroup.scripts,
    hasChildren: false,
    url: "/scripts/roles",
    title: "Roles",
    isNavItem: true,
    icon: IconUserShield,
  },
};
