"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ClientComponent = () => {
  const router = useRouter();
  return <div onClick={() => router.push("/test?abc=1")}>ClientComponent</div>;
};

export default ClientComponent;
