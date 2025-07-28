import React from "react";
import {
  Icon,
  IconBrandInstagram,
  IconBrandMessenger,
  IconChartInfographic,
  IconTestPipe,
  IconGraph,
  IconTerminal2,
  IconUsers,
  IconUsersGroup,
  IconUserShield,
  IconWindmill,
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
  | "AccountsCanban"
  | "Accounts"
  | "Experiments"
  | "AccountDetails"
  | "Threads"
  | "ManageServices"
  | "WeeklyReportDetails"
  | "ExperimentDetails";

export type ChildKeys = "";

type TMPageData = Record<ParentKeys, TPageData>;

export enum EGroup {
  summaries = "Summaries",
  instagram = "Instagram",
  userManagement = "User Management",
  scripts = "Scripts",
  leadsManagement = "Services",
}

export const GroupIcons: Record<EGroup, Icon> = {
  Instagram: IconBrandInstagram,
  "User Management": IconUsers,
  Summaries: IconGraph,
  Scripts: IconTerminal2,
  "Services": IconWindmill,
};

export const componentData: {
  key: keyof TMPageData;
  component: React.LazyExoticComponent<() => JSX.Element>;
}[] = [
    {
      key: "AccountsCanban",
      component: React.lazy(() =>
        import("./Dashboard/AccountsCanban").then(({ AccountsCanban }) => ({
          default: AccountsCanban,
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
      key: "Experiments",
      component: React.lazy(() =>
        import("./Instagram/Experiment/Experiments").then(({ Experiments }) => ({
          default: Experiments,
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
      key: "ManageServices",
      component: React.lazy(() =>
        import("./LeadsGeneration/ManageServices/").then(({ ManageServices }) => ({
          default: ManageServices,
        })),
      ),
    },
    {
      key: "WeeklyReportDetails",
      component: React.lazy(() =>
        import("./Instagram/Account/WeeklyReportDetails").then(
          ({ WeeklyReportDetails }) => ({
            default: WeeklyReportDetails,
          }),
        ),
      ),
    },
    {
      key: "ExperimentDetails",
      component: React.lazy(() =>
        import("./Instagram/Experiment/Details/ExperimentDetails").then(
          ({ ExperimentDetails }) => ({
            default: ExperimentDetails,
          }),
        ),
      ),
    },
  ];

export const pageData: TMPageData = {
  AccountsCanban: {
    level: "1",
    group: EGroup.summaries,
    hasChildren: false,
    title: "Accounts canban",
    isNavItem: true,
    icon: IconChartInfographic,
    url: "/dashboard/accounts_canban",
  },
  Accounts: {
    level: "1",
    group: EGroup.summaries,
    hasChildren: false,
    url: "/instagram/accounts",
    title: "Accounts",
    isNavItem: true,
    icon: IconUsersGroup,
  },
  Experiments: {
    level: "1",
    group: EGroup.summaries,
    hasChildren: false,
    title: "Experiments",
    isNavItem: true,
    icon: IconTestPipe,
    url: "/instagram/experiments",
  },
  // Snapshot: {
  //   level: "1",
  //   group: EGroup.summaries,
  //   hasChildren: false,
  //   title: "Snapshot",
  //   isNavItem: true,
  //   icon: IconChartInfographic,
  //   url: "/dashboard/snapshot",
  // },
  Threads: {
    level: "1",
    group: EGroup.instagram,
    hasChildren: false,
    title: "Threads",
    isNavItem: true,
    icon: IconBrandMessenger,
    url: "/instagram/threads",
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
  ManageServices: {
    level: "1",
    group: EGroup.leadsManagement,
    hasChildren: false,
    url: "/leads-management/services",
    title: "Manage Services",
    isNavItem: true,
    icon: IconUserShield,
  },
  WeeklyReportDetails: {
    level: "1",
    group: EGroup.summaries,
    hasChildren: false,
    url: "/instagram/outreach/weekly-report",
    title: "Weekly Report Details",
    isNavItem: false,
    icon: IconChartInfographic,
  },
  ExperimentDetails:{
    level: "1",
    group: EGroup.summaries,
    hasChildren: false,
    url: "/instagram/experiment/:experimentId",
    title: "Experiment Details",
    isNavItem: false,
    icon: IconChartInfographic,
  }
};
