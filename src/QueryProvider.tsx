import React from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useAuth } from "./Context/AuthContext/AuthProvider";
import { axiosError } from "./Interfaces/general.interface";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const { dispatch } = useAuth();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        /*
        const customErr = error as axiosError;
        if (customErr.statusCode === 401) {
          dispatch({ type: "LOGOUT" });
        }
        */
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        /*
        const customErr = error as axiosError;
        if (customErr.statusCode === 401) {
          dispatch({ type: "LOGOUT" });
        }
        */
      },
    }),
    defaultOptions: {
      queries: {
        notifyOnChangeProps: ["data", "error"],
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
