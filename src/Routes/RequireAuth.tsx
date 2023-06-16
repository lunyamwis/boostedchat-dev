import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext/AuthProvider";
import { authPageData } from "../Pages/Auth";

export function RequireAuth({ children }: { children?: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <Navigate
        to={`${authPageData.login.url}`}
        replace
      />
    );
  }

  return <>{children}</>;
}
