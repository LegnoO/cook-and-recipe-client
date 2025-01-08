"use client";

// ** React Imorts
import { useState, useEffect, Dispatch, SetStateAction } from "react";

// ** Helpers
import { isSSR } from "@/utils/helpers";

const useLocalStorage = <T>(
  key: string,
  defaultValue?: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    if (!isSSR) {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    }

    return defaultValue;
  });

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      setValue(JSON.parse(storedValue));
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, setValue]);

  return [value, setValue];
};

export default useLocalStorage;
