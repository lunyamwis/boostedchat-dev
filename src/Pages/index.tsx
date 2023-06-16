import React from "react";
import { Icon } from "tabler-icons-react";

export type TPageData = {
  title: string;
  url: string;
  icon: Icon;
  group: EGroup;
  isNavItem: boolean;
};

type pageKeys = "";

type TMPageData = Record<pageKeys, TPageData>;

export enum EGroup {}

export const componentData: {
  key: keyof TMPageData;
  component: React.LazyExoticComponent<() => JSX.Element>;
}[] = [];

export const pageData: TMPageData | null = null;
