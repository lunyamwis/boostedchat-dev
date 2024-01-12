import React from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        console.log(error);
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
        console.log(error);
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
