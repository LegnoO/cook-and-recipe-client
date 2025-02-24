"use client";

// ** React Imports
import { createContext, useState, useContext } from "react";

// ** Types
interface IdContext {
  modalId: string;
  setId: (newId: string) => void;
}

const IdContext = createContext<IdContext | undefined>(undefined);

export function IdProvider({ children }: { children: React.ReactNode }) {
  const [modalId, setModalId] = useState<string>("");

  function setId(newId: string) {
    setModalId(newId);
  }

  return (
    <IdContext.Provider
      value={{
        modalId,
        setId,
      }}>
      {children}
    </IdContext.Provider>
  );
}

export function useIdContext() {
  const context = useContext(IdContext);
  if (context === undefined) {
    throw new Error("useIdContext must be used within an IdProvider");
  }
  return context;
}
