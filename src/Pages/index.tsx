import React from "react";
import {
  Icon,
  IconBrandInstagram,
  IconBrandMessenger,
  IconCalendarCog,
  IconChartInfographic,
  // IconClock,
  IconGraph,
  // IconRouteSquare2,
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
  | "Snapshot"
  | "Accounts"
  | "AccountDetails"
  | "Threads"
  | "Prompts"
  | "Roles"
  // | "QualifyingAlgorithm"
  | "OutreachList"
  // | "LeadSources"
  | "ManageServices"
  // | "SetupScraper";

export type ChildKeys = "";

type TMPageData = Record<ParentKeys, TPageData>;

export enum EGroup {
  summaries = "Summaries",
  instagram = "Instagram",
  userManagement = "User Management",
  scripts = "Scripts",
  leadsManagement = "Leads Management",
}

export const GroupIcons: Record<EGroup, Icon> = {
  Instagram: IconBrandInstagram,
  "User Management": IconUsers,
  Summaries: IconGraph,
  Scripts: IconTerminal2,
  "Leads Management": IconWindmill,
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
    {
      key: "OutreachList",
      component: React.lazy(() =>
        import("./Instagram/Outreach/index").then(
          ({ OutreachList }) => ({
            default: OutreachList,
          }),
        ),
      ),
    },
    // {
    //   key: "QualifyingAlgorithm",
    //   component: React.lazy(() =>
    //     import("./LeadsGeneration/QualifyingAlgorithm/").then(
    //       ({ QualifyingAlgorithms }) => ({
    //         default: QualifyingAlgorithms,
    //       }),
    //     ),
    //   ),
    // },
    // {
    //   key: "LeadSources",
    //   component: React.lazy(() =>
    //     import("./LeadsGeneration/LeadSources/").then(({ LeadSources }) => ({
    //       default: LeadSources,
    //     })),
    //   ),
    // },
    {
      key: "ManageServices",
      component: React.lazy(() =>
        import("./LeadsGeneration/ManageServices/").then(({ ManageServices }) => ({
          default: ManageServices,
        })),
      ),
    },
    // {
    //   key: "SetupScraper",
    //   component: React.lazy(() =>
    //     import("./LeadsGeneration/Setup/Layout").then(
    //       ({ SetupScraperLayout }) => ({
    //         default: SetupScraperLayout,
    //       }),
    //     ),
    //   ),
    // },
  ];

export const pageData: TMPageData = {
  AccountsCanban: {
    level: "1",
    group: EGroup.summaries,
    hasChildren: false,
    title: "Accounts canban",
    isNavItem: true,
    icon: IconChartInfographic,
    url: "/dashboard/accounts",
  },
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
  ManageServices: {
    level: "1",
    group: EGroup.leadsManagement,
    hasChildren: false,
    url: "/leads-management/services",
    title: "Manage Services",
    isNavItem: true,
    icon: IconUserShield,
  },
  // LeadSources: {
  //   level: "1",
  //   group: EGroup.leadsManagement,
  //   hasChildren: false,
  //   url: "/leads-management/lead-sources",
  //   title: "Lead Sources",
  //   isNavItem: true,
  //   icon: IconUserShield,
  // },
  OutreachList: {
    level: "1",
    group: EGroup.leadsManagement,
    hasChildren: false,
    url: "/leads-management/outreach-list",
    title: "Outreach Scheduler",
    isNavItem: true,
    icon: IconCalendarCog,
  },
  // QualifyingAlgorithm: {
  //   level: "1",
  //   group: EGroup.leadsManagement,
  //   hasChildren: false,
  //   url: "/leads-management/qualifying-algorithm",
  //   title: "Qualifying Algorithm",
  //   isNavItem: true,
  //   icon: IconRouteSquare2,
  // },
  // SetupScraper: {
  //   level: "1",
  //   group: EGroup.leadsManagement,
  //   hasChildren: false,
  //   url: "/leads-management/setup-scraper",
  //   title: "Setup scraper",
  //   isNavItem: true,
  //   icon: IconClock,
  // },
};
