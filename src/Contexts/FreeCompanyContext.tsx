import { createContext, useContext, useState } from "react";
import { searchFreeCompany } from "../Helpers/xviapi";

type FreeCompanyContextType = {
  searchInput: string;
  setSearchInput: any;
};

const FreeCompanyContext = createContext<FreeCompanyContextType>({
  searchInput: "",
  setSearchInput: () => {},
});

export const useFreeCompanyContext = () => useContext(FreeCompanyContext);

type FreeCompanyProviderProps = {
  children: React.ReactNode;
};

export const FreeCompanyProvider: React.FC<FreeCompanyProviderProps> = ({
  children,
}) => {
  const [searchInput, setSearchInput] = useState<string>("");

  const value: FreeCompanyContextType = {
    searchInput,
    setSearchInput,
  };

  return (
    <FreeCompanyContext.Provider value={value}>
      {children}
    </FreeCompanyContext.Provider>
  );
};
