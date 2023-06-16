import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loader } from "@mantine/core";
import { AuthLayout } from "../Layouts/AuthLayout";
import { authPageData } from "../Pages/Auth";
import AppShell from "../Layouts/AppShell/AppShell";
import { NotFound } from "../Pages/Default/404";
import { RequireAuth } from "./RequireAuth";
import { Home } from "../Pages/Default/Home";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <AppShell />
            </RequireAuth>
          }
        >
          <Route path={"/"} element={<Home />} />
        </Route>

        <Route element={<AuthLayout />}>
          {Object.values(authPageData).map((route) => (
            <Route
              key={Math.floor(Math.random())}
              path={route.url}
              element={
                <React.Suspense fallback={<Loader />}>
                  <route.component />
                </React.Suspense>
              }
            />
          ))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
