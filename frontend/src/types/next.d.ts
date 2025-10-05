// src/types/next.d.ts
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

/**
 * Extend NextPage with optional getLayout function
 * This allows pages to define a custom layout
 */
export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
