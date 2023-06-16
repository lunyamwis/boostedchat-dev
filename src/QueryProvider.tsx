import React from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { AuthAPI } from "./Apis/UserManagement/Auth.api";
import { useAuth } from "./Context/AuthContext/AuthProvider";
import { axiosError } from "./Interfaces/general.interface";

function TokenRefresher({ children }: { children: React.ReactNode }) {
  const [shouldRefresh, setShouldRefresh] = React.useState(false);
  const { user, refreshToken, dispatch } = useAuth();

  useQuery(
    ["refresh", shouldRefresh],
    () => AuthAPI.refresh(user?.id!, refreshToken!),
    {
      enabled:
        shouldRefresh === true && user?.id != null && refreshToken != null,
      onSuccess: (data) => {
        setShouldRefresh(false);
        dispatch({ type: "REFRESH", payload: { tokens: data } });
      },
    }
  );

  React.useEffect(() => {
    if (shouldRefresh === true) return;
    const x = setTimeout(() => {
      setShouldRefresh(true);
    }, 480000); // 8 minutes
    return () => clearInterval(x);
  }, [shouldRefresh]);

  return <>{children}</>;
}
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const { dispatch } = useAuth();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        const customErr = error as axiosError;
        if (customErr.statusCode === 401) {
          dispatch({ type: "LOGOUT" });
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        const customErr = error as axiosError;
        if (customErr.statusCode === 401) {
          dispatch({ type: "LOGOUT" });
        }
      },
    }),
    defaultOptions: {
      queries: {
        notifyOnChangeProps: ["data", "error"],
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TokenRefresher>{children}</TokenRefresher>
    </QueryClientProvider>
  );
}
