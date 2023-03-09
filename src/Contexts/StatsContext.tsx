import { createContext, useContext, useState } from "react";
import { getFreeCompanies } from "../Helpers";
import { FreeCompanySearchResult } from "../Types";

type FCStatsContextType = {};

const FCStatsContext = createContext<FCStatsContextType>({});

export const useSearch = () => useContext(FCStatsContext);

type CharacterContextProps = { children: React.ReactNode };

export const FCStatsProvider: React.FC<CharacterContextProps> = ({
  children,
}) => {
  const value: FCStatsContextType = {};

  return (
    <FCStatsContext.Provider value={value}>{children}</FCStatsContext.Provider>
  );
};
