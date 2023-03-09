import { createContext, useContext, useState } from "react";
import { getFreeCompanies } from "../Helpers";
import { FreeCompanySearchResult } from "../Types";

type SearchContextType = {
  searchFreeCompany: any;
  searchInput: string;
  setSearchInput: any;
  searchLoad: boolean;
  searchResult: FreeCompanySearchResult;
};

const SearchContext = createContext<SearchContextType>({
  searchFreeCompany: () => {},
  searchInput: "",
  setSearchInput: () => {},
  searchLoad: false,
  searchResult: {
    Pagination: {
      Page: 0,
      PageNext: 0,
      PagePrev: 0,
      PageTotal: 0,
      Results: 0,
      ResultsPerPage: 0,
      ResultsTotal: 0,
    },
    Results: [{ Crest: [], ID: "", Name: "", Server: "" }],
  },
});

export const useSearch = () => useContext(SearchContext);

type CharacterContextProps = { children: React.ReactNode };

export const SearchProvider: React.FC<CharacterContextProps> = ({
  children,
}) => {
  // Search
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<FreeCompanySearchResult>({
    Pagination: {
      Page: 0,
      PageNext: 0,
      PagePrev: 0,
      PageTotal: 0,
      Results: 0,
      ResultsPerPage: 0,
      ResultsTotal: 0,
    },
    Results: [],
  });
  const [searchLoad, setSearchLoad] = useState<boolean>(false);

  async function searchFreeCompany() {
    setSearchLoad(true);
    const search = (await getFreeCompanies(
      searchInput
    )) as FreeCompanySearchResult;
    setSearchResult(search);
    setSearchLoad(false);
  }

  const value: SearchContextType = {
    searchFreeCompany,
    searchInput,
    setSearchInput,
    searchLoad,
    searchResult,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
