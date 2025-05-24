"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface DashboardMenuContextProps {
  selected: string;
  setSelected: (item: string) => void;
}

const DashboardMenuContext = createContext<
  DashboardMenuContextProps | undefined
>(undefined);

export function useDashboardMenu() {
  const ctx = useContext(DashboardMenuContext);
  if (!ctx)
    throw new Error(
      "useDashboardMenu must be used within DashboardMenuProvider",
    );
  return ctx;
}

export function DashboardMenuProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string>("Início");
  return (
    <DashboardMenuContext.Provider value={{ selected, setSelected }}>
      {children}
    </DashboardMenuContext.Provider>
  );
}
