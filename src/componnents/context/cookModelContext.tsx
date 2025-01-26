"use client";
import { createContext, useState, ReactNode, useContext } from "react";
import ICookModel from "@/interfaces/ICookModel";

interface CookModelContextType {
  modelSelected: ICookModel | null;
  setModelSelected: (model: ICookModel | null) => void;
}

const CookModelContext = createContext<CookModelContextType | undefined>(
  undefined
);

const CookModelProvider = ({ children }: { children: ReactNode }) => {
  const [modelSelected, setModelSelected] = useState<ICookModel | null>(null);

  return (
    <CookModelContext.Provider value={{ modelSelected, setModelSelected }}>
      {children}
    </CookModelContext.Provider>
  );
};

export const useCookModel = () => {
  const context = useContext(CookModelContext);
  if (!context) {
    throw new Error(
      "useCookModel deve ser usado dentro de um CookModelProvider"
    );
  }
  return context;
};

export default CookModelProvider;
