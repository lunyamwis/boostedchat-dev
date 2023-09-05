import React from "react";
import { createContext, useContext, useReducer } from "react";

export type TInstagrapiAuthContextData = {
  sessionId: string | null;
  dispatch: React.Dispatch<TInstagrapiAuthActions>;
};

const getSessionId = () => {
  const sessionId = localStorage.getItem("instagrapi_sessionId");

  return sessionId;
};

const InstagrapiAuthContext = createContext<TInstagrapiAuthContextData>({
  sessionId: null,
  dispatch: () => null,
});

export const useInstagrapiAuth = () => useContext(InstagrapiAuthContext);

export function AuthProvider({ children }: { children: JSX.Element }) {
  const sessionId = getSessionId();
  const [state, dispatch] = useReducer(instagrapiReducer, {
    sessionId,
    dispatch: () => null,
  });

  return (
    <InstagrapiAuthContext.Provider
      value={{
        sessionId: state.sessionId,
        dispatch,
      }}
    >
      {children}
    </InstagrapiAuthContext.Provider>
  );
}

export type TInstagrapiAuthActions =
  | {
      type: "LOGIN";
      payload: {
        sessionId: string;
      };
    }
  | {
      type: "REFRESH";
      payload: {
        tokens: {
          access_token: string;
          refresh_token: string;
        };
      };
    }
  | { type: "LOGOUT" };

export const instagrapiReducer: React.Reducer<
  TInstagrapiAuthContextData,
  TInstagrapiAuthActions
> = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("instagrapi_sessionId", action.payload.sessionId);

      return {
        ...state,
        sessionId: action.payload.sessionId,
      };
    }
    case "LOGOUT":
      localStorage.removeItem("instagrapi_sessionId");
      return {
        ...state,
        sessionId: null,
      };
    default:
      return state;
  }
};
