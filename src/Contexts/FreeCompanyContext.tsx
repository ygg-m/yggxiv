import { createContext, useContext, useEffect, useState } from "react";
import { getRanks } from "../Helpers";
import { getFreeCompanies, getFreeCompany } from "../Helpers/xviapi";
import {
  FreeCompanyFull,
  FreeCompanySearchResult,
  MembersListTypes,
  RankListTypes,
} from "../Types/index";

type FreeCompanyContextType = {
  searchInput: string;
  setSearchInput: any;
  searchResult: FreeCompanySearchResult;
  setSearchResult: any;
  searchFreeCompany: any;
  fetchFreeCompany: any;
  freeCompany: FreeCompanyFull;
  fetchLoad: boolean;
  filteredMembers: MembersListTypes[];
  setFilteredMembers: any;
  changeCheckFilter: any;
  changeSearchFilter: any;
  checkedKeys: string[];
  searchQuery: string;
  filterMemberOpen: boolean;
  setFilterMemberOpen: any;
  RankList: RankListTypes[];
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
  filteredMembers: [],
  setFilteredMembers: () => {},
  changeCheckFilter: () => {},
  changeSearchFilter: () => {},
  checkedKeys: [],
  searchQuery: "",
  filterMemberOpen: false,
  setFilterMemberOpen: () => {},
  RankList: [],
});

export const useFreeCompanyContext = () => useContext(FreeCompanyContext);

type FreeCompanyProviderProps = {
  children: React.ReactNode;
};

// Provider
export const FreeCompanyProvider: React.FC<FreeCompanyProviderProps> = ({
  children,
}) => {
  // Data
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
  const { FreeCompanyMembers } = freeCompany;

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

  // Fetch
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

  // Rank List
  const [RankList, setRankList] = useState(getRanks(FreeCompanyMembers));

  // Filter Members
  const [filteredMembers, setFilteredMembers] = useState(FreeCompanyMembers);
  const [filterMemberOpen, setFilterMemberOpen] = useState<boolean>(false);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const changeCheckFilter = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    if (checked) setCheckedKeys([...checkedKeys, value]);
    else setCheckedKeys(checkedKeys.filter((key) => key !== value));
  };

  const changeSearchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const filterByCheck = (members: MembersListTypes[]) => {
    return members.filter((member) => checkedKeys.includes(member.Rank));
  };

  const filterBySearch = (members: MembersListTypes[]) => {
    return members.filter((member) =>
      member.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filterByCheckAndSearch = () => {
    const filterCheck = filterByCheck(freeCompany.FreeCompanyMembers);
    const filterSearch = filterBySearch(filterCheck);

    return filterSearch;
  };

  useEffect(() => {
    setRankList(getRanks(FreeCompanyMembers));
  }, [freeCompany]);

  useEffect(() => {
    const isCheckEmpty = checkedKeys.length === 0;
    const isSearchEmpty = searchQuery.length === 0;

    if (isCheckEmpty && isSearchEmpty) setFilteredMembers(FreeCompanyMembers);
    if (!isCheckEmpty && isSearchEmpty)
      setFilteredMembers(filterByCheck(FreeCompanyMembers));
    if (isCheckEmpty && !isSearchEmpty)
      setFilteredMembers(filterBySearch(FreeCompanyMembers));
    if (!isCheckEmpty && !isSearchEmpty)
      setFilteredMembers(filterByCheckAndSearch());
  }, [checkedKeys, searchQuery, freeCompany]);

  // return value
  const value: FreeCompanyContextType = {
    searchInput,
    setSearchInput,
    searchResult,
    setSearchResult,
    searchFreeCompany,
    fetchFreeCompany,
    freeCompany,
    fetchLoad,
    filteredMembers,
    setFilteredMembers,
    changeCheckFilter,
    changeSearchFilter,
    checkedKeys,
    searchQuery,
    filterMemberOpen,
    setFilterMemberOpen,
    RankList,
  };

  return (
    <FreeCompanyContext.Provider value={value}>
      {children}
    </FreeCompanyContext.Provider>
  );
};
