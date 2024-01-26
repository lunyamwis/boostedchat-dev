export const API_URL = import.meta.env.PROD
  ? "https://api.booksy.us.boostedchat.com/v1"
  : "http://127.0.0.1:8001/v1";

export const PROMPT_URL = import.meta.env.PROD
  ? "/prompt"
  : "http://localhost:8000";

export const LEADS_GENERATION_URL = import.meta.env.PROD
  ? "/prompt"
  : "http://localhost:8002";

export const queryKeys = {
  users: {
    getAll: "get-all-users",
  },
  accountRequests: {
    getAll: "get-all-account-requests",
  },
  salesReps: {
    getAll: "get-all-sales-representatives",
    getFlattened: "get-all-flattened-sales-representatives",
  },
  leads: {
    getAll: "get-all-leads",
  },
  instagram: {
    dashboard: {
      responseRate: "response-rates",
    },
    accounts: {
      getAccounts: "get-all-accounts",
      getById: "get-account-by-id",
      getByIgThreadId: "get-account-by-ig-thread-id",
    },
    threads: {
      byIgThreadId: "get-thread-by-ig-thread-id",
      getAll: "get-all-threads",
      getMessages: "get-direct-messages",
      checkResponse: "check-response",
    },
  },
  auditLogs: {
    getAll: "all-audit-logs",
  },
  scripts: {
    prompts: {
      promptById: "prompt-by-id",
      allPrompts: "all-prompts",
    },
    roles: {
      allRoles: "all-script-roles",
      roleById: "script-role-by-id",
    },
  },
  leadsGeneration: {
    qualifyingAlgos: {
      allAlgos: "all-qualifying-algos",
      algoById: "qualifying-algo-by-id",
    },
    leadSource: {
      allLeadSources: "all-lead-source",
      leadSourceById: "lead-source-by-id",
    },
    outreachSchedule: {
      allOutreachSchedules: "all-outreach-schedules",
      outreachScheduleById: "outreach-schedule-by-id",
    },
  },
};
