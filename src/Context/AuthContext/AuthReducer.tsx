import { Buffer } from "buffer";
import { TAuthContextData } from "./AuthProvider";

export type TAuthActions =
  | {
      type: "LOGIN";
      payload: {
        access: string;
        refresh: string;
        authenticatedUser: {
          email: string;
          role: string;
        };
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

export const authReducer: React.Reducer<TAuthContextData, TAuthActions> = (
  state,
  action
) => {
  switch (action.type) {
    case "LOGIN": {
      const accessToken = action.payload.access;
      const refreshToken = action.payload.refresh;
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("access_token", accessToken);

      const splitToken = Buffer.from(accessToken.split(".")[1], "base64");
      const parsedIdToken = JSON.parse(splitToken.toString());
      return {
        ...state,
        user: {
          id: parsedIdToken.id,
          email: action.payload.authenticatedUser.email,
          role: action.payload.authenticatedUser.role,
        },
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    }
    case "REFRESH": {
      const accessToken = action.payload.tokens.access_token;
      const refreshToken = action.payload.tokens.refresh_token;
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("access_token", accessToken);

      return {
        ...state,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    }
    case "LOGOUT":
      localStorage.removeItem("id_token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return {
        ...state,
        user: null,
        idToken: null,
        accessToken: null,
        refreshToken: null,
      };
  }
};
