import { createContext, useContext, useState } from "react";
import {
  FreeCompanyFull,
  FreeCompanySearchResult,
  getFreeCompanies,
  getFreeCompany,
} from "../Helpers/xviapi";

type FreeCompanyContextType = {
  searchInput: string;
  setSearchInput: any;
  searchResult: FreeCompanySearchResult;
  setSearchResult: any;
  searchFreeCompany: any;
  fetchFreeCompany: any;
  fetchLoad: boolean;
};

const FreeCompanyContext = createContext<FreeCompanyContextType>({
  searchInput: "",
  setSearchInput: () => {},
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
  setSearchResult: () => {},
  searchFreeCompany: () => {},
  fetchFreeCompany: () => {},
  fetchLoad: false,
});

export const useFreeCompanyContext = () => useContext(FreeCompanyContext);

type FreeCompanyProviderProps = {
  children: React.ReactNode;
};

export const FreeCompanyProvider: React.FC<FreeCompanyProviderProps> = ({
  children,
}) => {
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
  const [freeCompany, setFreeCompany] = useState<FreeCompanyFull>({
    FreeCompany: {
      Active: "",
      ActiveMemberCount: 0,
      Crest: [],
      DC: "",
      Estate: {},
      Focus: [],
      Formed: 0,
      GrandCompany: "",
      ID: "",
      Name: "",
      ParseDate: 0,
      Rank: 0,
      Ranking: [],
      Recruitment: "",
      Reputation: [],
      Seeking: [],
      Server: "",
      Slogan: "",
      Tag: "",
    },
    FreeCompanyMembers: [],
  });
  const [fetchLoad, setFetchLoad] = useState<boolean>(false);

  async function searchFreeCompany() {
    setFetchLoad(true);
    const search = (await getFreeCompanies(
      searchInput
    )) as FreeCompanySearchResult;
    setSearchResult(search);
    setFetchLoad(false);
  }

  async function fetchFreeCompany(FreeCompanyID: string) {
    setFetchLoad(true);
    const result = (await getFreeCompany(FreeCompanyID)) as FreeCompanyFull;
    setFreeCompany(result);
    setFetchLoad(false);
  }

  const value: FreeCompanyContextType = {
    searchInput,
    setSearchInput,
    searchResult,
    setSearchResult,
    searchFreeCompany,
    fetchFreeCompany,
    fetchLoad,
  };

  return (
    <FreeCompanyContext.Provider value={value}>
      {children}
    </FreeCompanyContext.Provider>
  );
};
