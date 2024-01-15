import React from "react";
import { useNavigate } from "react-router-dom";
import { pageData } from "..";

export function Home() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(pageData.Threads.url ?? "/threads");
  }, [navigate]);
  return <>Home</>;
}
