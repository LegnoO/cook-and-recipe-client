"use client";

import { useState, useEffect, ReactNode } from "react";

const ClientComponent = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    // const interval = setInterval(async () => {
    //   const response = await fetch("http://localhost:3000/api/test");
    //   const data = await response.json();
    //   setState(JSON.stringify(data));
    // }, 3000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  return <>{children}</>;
};
export default ClientComponent;
