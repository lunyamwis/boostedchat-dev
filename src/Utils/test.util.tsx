import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach } from "vitest";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { ThemeProvider } from "../Themes/Theme";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../Context/AuthContext/AuthProvider";

const queryClient = new QueryClient();
const AppProviders = ({ children }: { children: JSX.Element }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Notifications autoClose={8000} />
      <ThemeProvider>
        <ModalsProvider>
          <AuthProvider>
            <BrowserRouter>
              {children}
            </BrowserRouter>
          </AuthProvider>
        </ModalsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

afterEach(() => {
  cleanup();
});

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: AppProviders,
    ...options,
  });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
