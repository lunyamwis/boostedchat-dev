import React from "react";
import { createContext, useContext, useReducer } from "react";
import { Buffer } from "buffer";
import { authReducer, TAuthActions } from "./AuthReducer";

export type TAuthContextData = {
  isNavOpened: boolean;
  user: {
    id: string;
    email: string;
    role: string;
  } | null;
  accessToken: string | null;
  refreshToken: string | null;
  dispatch: React.Dispatch<TAuthActions>;
};

const parseTokens = () => {
  const mRefreshToken = localStorage.getItem("refresh_token");
  const mAccessToken = localStorage.getItem("access_token");
  const emptyObj = {
    user: null,
    refreshToken: null,
    accessToken: null,
  };
  if (mRefreshToken == null || mAccessToken == null) {
    return emptyObj;
  }

  const splitAccessToken = Buffer.from(mAccessToken.split(".")[1], "base64");

  const decodedToken: TAuthContextData["user"] & { exp: number } = JSON.parse(
    splitAccessToken.toString()
  );
  const { exp } = decodedToken;

  if (exp * 1000 < Date.now()) {
    return emptyObj;
  }

  return {
    user: decodedToken,
    accessToken: mAccessToken,
    refreshToken: mRefreshToken,
  };
};

const AuthContext = createContext<TAuthContextData>({
  user: parseTokens().user,
  accessToken: parseTokens().accessToken,
  refreshToken: parseTokens().refreshToken,
  dispatch: () => null,
  isNavOpened: false,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: JSX.Element }) {
  const info = parseTokens();
  const [state, dispatch] = useReducer(authReducer, {
    user: info.user,
    accessToken: info.accessToken,
    refreshToken: info.refreshToken,
    dispatch: () => null,
    isNavOpened: false,
  });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        dispatch,
        isNavOpened: state.isNavOpened,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
