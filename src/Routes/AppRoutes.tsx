import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loader } from "@mantine/core";
import { AuthLayout } from "../Layouts/AuthLayout";
import { authPageData } from "../Pages/Auth";
import AppShell from "../Layouts/AppShell/AppShell";
import { NotFound } from "../Pages/Default/404";
import { RequireAuth } from "./RequireAuth";
import { Home } from "../Pages/Default/Home";
import { componentData, pageData, PrimaryPageData } from "../Pages";

export function AppRoutes() {
  const [permittedPageKeys, setPermittedPageKeys] = React.useState<
    Record<string, boolean>
  >({});

  React.useEffect(() => {
    const mPermittedPageKeys: Record<string, boolean> = {};
    for (let i = 0; i < Object.values(pageData).length; i += 1) {
      mPermittedPageKeys[Object.keys(pageData)[i]] = true;
    }
    setPermittedPageKeys(mPermittedPageKeys);
  }, []);

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
          {componentData.map((component) => {
            if (permittedPageKeys[component.key]) {
              const mPageData = pageData[component.key] as PrimaryPageData;
              return (
                <Route
                  key={component.key}
                  path={mPageData.url}
                  element={
                    <React.Suspense fallback={<Loader />}>
                      <component.component />
                    </React.Suspense>
                  }
                />
              );
            }
          })}
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
