import { createContext, useContext, useState } from "react";
import { getFreeCompanies, getFreeCompany } from "../Helpers/xviapi";
import { FreeCompanyFull, FreeCompanySearchResult } from "../Types/index";

type FreeCompanyContextType = {
  searchInput: string;
  setSearchInput: any;
  searchResult: FreeCompanySearchResult;
  setSearchResult: any;
  searchFreeCompany: any;
  fetchFreeCompany: any;
  freeCompany: FreeCompanyFull;
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
  freeCompany: {
    FreeCompany: {
      Active: "",
      ActiveMemberCount: 0,
      Crest: [],
      DC: "",
      Estate: { Greeting: "", Name: "", Plot: "" },
      Focus: [{ Icon: "", Name: "", Status: false }],
      Formed: 0,
      GrandCompany: "",
      ID: "",
      Name: "",
      ParseDate: 0,
      Rank: 0,
      Ranking: { Monthly: 0, Weekly: 0 },
      Recruitment: "",
      Reputation: [{ Name: "", Progress: 0, Rank: "" }],
      Seeking: [{ Icon: "", Name: "", Status: false }],
      Server: "",
      Slogan: "",
      Tag: "",
    },
    FreeCompanyMembers: [],
  },
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
      Estate: { Greeting: "", Name: "", Plot: "" },
      Focus: [],
      Formed: 0,
      GrandCompany: "",
      ID: "",
      Name: "",
      ParseDate: 0,
      Rank: 0,
      Ranking: { Monthly: 0, Weekly: 0 },
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
    freeCompany,
    fetchLoad,
  };

  return (
    <FreeCompanyContext.Provider value={value}>
      {children}
    </FreeCompanyContext.Provider>
  );
};
