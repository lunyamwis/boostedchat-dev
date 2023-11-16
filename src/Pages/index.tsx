import React from "react";
import {
  Icon,
  IconBrandInstagram,
  IconBrandMessenger,
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

export type ParentKeys =
  | "AccountRequests"
  | "SystemAccounts"
  | "SalesRepresentatives"
  | "Accounts"
  | "Threads";

export type ChildKeys =
  | "CreateAccount"
  | "AccountDetails"
  | "BulkUploadAccounts";

type TMPageData = Record<ParentKeys | ChildKeys, TPageData>;

export enum EGroup {
  instagram = "Instagram",
  userManagement = "User Management",
}

export const GroupIcons: Record<EGroup, Icon> = {
  Instagram: IconBrandInstagram,
  "User Management": IconUsers,
};

export const componentData: {
  key: keyof TMPageData;
  component: React.LazyExoticComponent<() => JSX.Element>;
}[] = [
  {
    key: "AccountDetails",
    component: React.lazy(() =>
      import("./Instagram/Account/Details/").then(({ AccountDetails }) => ({
        default: AccountDetails,
      }))
    ),
  },
  {
    key: "BulkUploadAccounts",
    component: React.lazy(() =>
      import("./Instagram/Account/BulkUploadAccounts").then(
        ({ BulkUploadAccounts }) => ({
          default: BulkUploadAccounts,
        })
      )
    ),
  },
  {
    key: "SystemAccounts",
    component: React.lazy(() =>
      import("./UserManagement/Users").then(({ Users }) => ({
        default: Users,
      }))
    ),
  },
  {
    key: "AccountRequests",
    component: React.lazy(() =>
      import("./UserManagement/AccountRequests").then(
        ({ AccountRequests }) => ({
          default: AccountRequests,
        })
      )
    ),
  },
  {
    key: "SalesRepresentatives",
    component: React.lazy(() =>
      import("./UserManagement/SalesRepresentatives/SalesRepresentatives").then(
        ({ SalesRepresentatives }) => ({
          default: SalesRepresentatives,
        })
      )
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
  AccountRequests: {
    level: "1",
    group: EGroup.userManagement,
    hasChildren: false,
    title: "Account Requests",
    url: "/user-management/account-requests",
    isNavItem: true,
    icon: IconUserSearch,
  },
  SystemAccounts: {
    level: "1",
    group: EGroup.userManagement,
    hasChildren: false,
    title: "User Accounts",
    url: "/user-management/system-users",
    isNavItem: true,
    icon: IconUsers,
  },
  SalesRepresentatives: {
    level: "1",
    group: EGroup.userManagement,
    hasChildren: false,
    title: "Sales Representatives",
    url: "/user-management/sales-representatives",
    isNavItem: true,
    icon: IconUserPlus,
  },
  CreateAccount: {
    level: "2",
    group: EGroup.instagram,
    title: "Create Account",
    isNavItem: true,
    url: "/create-account",
  },
  AccountDetails: {
    level: "2",
    group: EGroup.instagram,
    title: "Accounts List",
    isNavItem: false,
    url: "/instagram/accounts/:id",
  },
  BulkUploadAccounts: {
    level: "2",
    group: EGroup.instagram,
    title: "Bulk Upload",
    isNavItem: true,
    url: "/upload-accounts",
  },
};
