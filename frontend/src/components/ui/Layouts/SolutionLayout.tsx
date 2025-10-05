import { useQuery } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import MarketHeader from "../Headers/SolutionHeader";
import MarketFooter from "../Footers/SolutionFooter";


function SolutionData() {
  const { data, isLoading } = useQuery(["solutionData"], fetchSolutionData);

  if (isLoading) return <Loader />;
  return <div>{JSON.stringify(data)}</div>;
}


/*
  Use SolutionLayout for wrapping Solution pages.
  Fetch data client-side using React Query:
  WebSockets:
    Initialize a WebSocket in useEffect inside your SolutionLayout or page.
    Keep it client-only; SSR pages cannot open WS connections.
*/