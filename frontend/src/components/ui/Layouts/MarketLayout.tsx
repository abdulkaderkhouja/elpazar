// src/components/ui/Layout.tsx
import React, { ReactNode } from 'react';
import MarketHeader from '../Headers/MarketHeader';
import MarketFooter from '../Footers/MarketFooter';


type Props = { children: ReactNode };



/**
 * Market Layout
 *
 * A reusable layout wrapper for all marketplace-related pages.
 * It defines the shared structure (e.g., navigation bar, footer,
 * sidebar, global containers).
 *
 * @param {React.ReactNode} children - The child components (e.g., Home, Products, etc.)
 * that will be rendered inside this layout.
 * @returns {JSX.Element} The layout container with navigation + page content.
 */
const MarketLayout = ({ children }: Props) => {
  return (
    <>
      <MarketHeader />  {/* Fully SSR */}
      <main>{children}</main>
      <MarketFooter />  {/* Fully SSR */}
    </>
  );
};

export default MarketLayout;