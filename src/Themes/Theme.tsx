import { DefaultMantineColor, Tuple } from "@mantine/core";
import React from "react";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";

type ExtendedCustomColors = "brand" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}

const theme: MantineThemeOverride = {
  colorScheme: "light",
  primaryColor: "brand",
  fontFamily: "Figtree",
  defaultRadius: "12px",
  black: "#1d1d1d",
  colors: {
    brand: [
      "#DEF4F6",
      "#98E3E7",
      "#58DAE2",
      "#1DD9E5",
      "#0CBDC7",
      "#077980",
      "#00A3AD",
      "#0B595E",
      "#0C4346",
      "#0C3234",
    ],
    brand2: [
      "#E3FAFF",
      "#4DE0FF",
      "#00D0FF",
      "#0096ED",
      "#005C93",
      "#004872",
      "#03A9F4",
      "#0076BC",
      "#003859",
      "#002C46",
    ],
  },
  components: {
    Button: {
      styles: {
        root: {
          borderRadius: "7px",
          textTransform: "capitalize",
          fontWeight: 500,
          letterSpacing: "0.3px",
          fontSize: "15px",
          height: "2.625rem",
          padding: "0 1.875rem",
        },
      },
    },
    TextInput: {
      styles: {
        input: {
          borderRadius: "7px",
        },
        label: {
          fontWeight: 500,
          fontSize: "13px",
          color: "#333",
        },
      },
    },
    Select: {
      styles: {
        input: {
          borderRadius: "7px",
        },
        label: {
          fontWeight: 500,
          fontSize: "13px",
          color: "#333",
        },
      },
    },
    NumberInput: {
      styles: {
        input: {
          borderRadius: "7px",
        },
        label: {
          fontWeight: 500,
          fontSize: "13px",
          color: "#333",
        },
      },
    },
    PasswordInput: {
      styles: {
        input: {
          borderRadius: "7px",
        },
        label: {
          fontWeight: 500,
          fontSize: "13px",
          color: "#333",
        },
      },
    },
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider withNormalizeCSS theme={theme}>
      {children}
    </MantineProvider>
  );
}
