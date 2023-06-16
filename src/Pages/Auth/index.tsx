import React from "react";

export type TAuthPageData = {
  title: string;
  description: string;
  url: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
};

type TAuthPageDataObj = {
  login: TAuthPageData;
  register: TAuthPageData;
  forgotPassword: TAuthPageData;
  resetPassword: TAuthPageData;
};

export const authPageData: TAuthPageDataObj = {
  login: {
    title: "Log in",
    description: "Enter your email and password to log in",
    url: "/login",
    component: React.lazy(() =>
      import("./Login").then(({ Login }) => ({ default: Login }))
    ),
  },
  register: {
    title: "Register",
    description: "Enter your details to register",
    url: "/register",
    component: React.lazy(() =>
      import("./Register").then(({ Register }) => ({ default: Register }))
    ),
  },
  forgotPassword: {
    title: "Forgot password",
    description:
      "Enter your email address and we'll mail you a password reset link",
    url: "/forgot-password",
    component: React.lazy(() =>
      import("./ForgotPassword").then(({ ForgotPassword }) => ({
        default: ForgotPassword,
      }))
    ),
  },
  resetPassword: {
    title: "Log in",
    description: "Reset your account password",
    url: "/reset-password",
    component: React.lazy(() =>
      import("./ResetPassword").then(({ ResetPassword }) => ({
        default: ResetPassword,
      }))
    ),
  },
};
