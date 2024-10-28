import { useState, useEffect } from "react";

const useClientSide = () => {
  const [isSSR, setSSR] = useState(false);

  useEffect(() => {
    setSSR(true);
  }, []);

  return isSSR;
};

export default useClientSide;
