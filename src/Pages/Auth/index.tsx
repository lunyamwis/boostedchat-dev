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
  instagramAutoLogin: TAuthPageData;  
  registerDevice: TAuthPageData;
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

  registerDevice: {
    title: "Register Device",
    description: "Enter your details to register",
    url: "/register-device",
    component: React.lazy(() =>
      import("./RegisterDevice").then(({ RegisterDevice }) => ({ default: RegisterDevice }))
    ),
  },

  instagramAutoLogin: {
    title: "Instagram Auto Login",
    description: "Automatically login to IG",
    url: "/instagram-login",
    component: React.lazy(() =>
      import("./InstagramLogin").then(({ InstagramLogin }) => ({ default: InstagramLogin }))
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
