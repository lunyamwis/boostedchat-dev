import React from "react";
import "./App.css";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { ThemeProvider } from "./Themes/Theme";
import { AppRoutes } from "./Routes/AppRoutes";
import { AuthProvider } from "./Context/AuthContext/AuthProvider";
import { QueryProvider } from "./QueryProvider";

function App() {
  return (
    <>
      <Notifications autoClose={8000} />
      <ThemeProvider>
        <ModalsProvider>
          <AuthProvider>
            <QueryProvider>
              <AppRoutes />
            </QueryProvider>
          </AuthProvider>
        </ModalsProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
