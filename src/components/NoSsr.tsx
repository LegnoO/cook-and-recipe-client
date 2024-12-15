// ** React Imports
import { useState, useEffect, ReactNode, Fragment } from "react";

// ** Types
type Props = {
  fallback?: ReactNode;
  children: ReactNode;
};

const NoSsr = ({ children, fallback }: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return fallback;
  }

  return <Fragment>{children}</Fragment>;
};

export default NoSsr;
