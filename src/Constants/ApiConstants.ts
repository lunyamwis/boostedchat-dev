const DOMAIN1 = import.meta.env.DOMAIN1
const DOMAIN2 = import.meta.env.DOMAIN2


// console.log(DOMAIN1)
// console.log("import.meta.env")
// console.log(import.meta.env)
export const API_URL = import.meta.env.PROD
  ? `https://api.${DOMAIN1}.boostedchat.com/v1`
  : "http://127.0.0.1:8001/v1";

// export const API_URL = import.meta.env.PROD
//   ? `https://api.staging.boostedchat.com/v1`
//   : "http://127.0.0.1:8001/v1";


console.log(API_URL)
export const PROMPT_URL = import.meta.env.PROD
  ? `https://promptemplate.${DOMAIN2}.boostedchat.com`
  : "http://localhost:8000";

// export const PROMPT_URL = import.meta.env.PROD
//   ? `https://promptemplate.staging.boostedchat.com`
//   : "http://localhost:8000";

export const LEADS_GENERATION_URL = import.meta.env.PROD
  ? `https://scrapper.${DOMAIN2}.boostedchat.com`
  : "http://127.0.0.1:8002";

export const MQTT_API_URL = import.meta.env.PROD
  ? `https://mqtt.booksy.us.boostedchat.com`
  : "http://localhost:3000";

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
      getAccountThreadDetails: "get-account-details",
    },
    stages: {
      getAllStages: "get-all-stages",
      getStageStats: "get-stage-stats",
    },
    threads: {
      byIgThreadId: "get-thread-by-ig-thread-id",
      getAll: "get-all-threads",
      getMessages: "get-direct-messages",
      checkResponse: "check-response",
    },
    mqttHealth:{
      loggedInAccounts: "logged-in-accounts",
      connectedccounts: "connected-accounts",
      healthStatus: "health-status",
    }
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
