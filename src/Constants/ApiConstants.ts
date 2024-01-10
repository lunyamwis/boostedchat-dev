export const API_URL = import.meta.env.PROD
  ? "https://api.booksy.us.boostedchat.com/v1"
  : "http://127.0.0.1:8001/v1";

export const PROMPT_URL = import.meta.env.PROD
  ? "https://promptemplate.booksy.boostedchat.com"
  : "http://localhost:8000";

export const queryKeys = {
  users: {
    getAll: "get-all-users",
  },
  accountRequests: {
    getAll: "get-all-account-requests",
  },
  salesReps: {
    getAll: "get-all-sales-representatives",
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
  },
};
