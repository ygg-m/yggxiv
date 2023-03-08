import { createContext, useContext, useEffect, useState } from "react";
import { getRanks } from "../Helpers";
import {
  getCharacterList,
  getFreeCompanies,
  getFreeCompany,
} from "../Helpers/xviapi";
import {
  CharacterData,
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
  baseFetchLoad: boolean;
  filteredMembers: MembersListTypes[];
  setFilteredMembers: any;
  changeCheckFilter: any;
  changeSearchFilter: any;
  checkedKeys: string[];
  searchQuery: string;
  filterMemberOpen: boolean;
  setFilterMemberOpen: any;
  RankList: RankListTypes[];
  fetchMembersData: any;
  MembersFullData: CharacterData[];
  membersFetchLoad: boolean;
  setMembersFetchLoad: any;
  fetchProgress: number;
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
  baseFetchLoad: false,
  filteredMembers: [],
  setFilteredMembers: () => {},
  changeCheckFilter: () => {},
  changeSearchFilter: () => {},
  checkedKeys: [],
  searchQuery: "",
  filterMemberOpen: false,
  setFilterMemberOpen: () => {},
  RankList: [],
  fetchMembersData: () => {},
  MembersFullData: [],
  membersFetchLoad: false,
  setMembersFetchLoad: () => {},
  fetchProgress: 0,
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
  const [MembersFullData, setMembersFullData] = useState<CharacterData[]>([
    {
      Achievements: { List: [], Points: 0 },
      AchievementsPublic: false,
      Character: {
        ActiveClassJob: {
          ClassID: 0,
          ExpLevel: 0,
          ExpLevelMax: 0,
          ExpLevelTogo: 0,
          IsSpecialised: false,
          JobID: 0,
          Level: 0,
          Name: "",
          UnlockedState: {
            ID: 0,
            Name: "",
          },
        },
        Avatar: "",
        Bio: "",
        ClassJobs: [],
        ClassJobsBozjan: { Level: 0, Mettle: 0, Name: "" },
        ClassJobsElemental: {
          ExpLevel: 0,
          ExpLevelMax: 0,
          ExpLevelTogo: 0,
          Level: 0,
          Name: "",
        },
        DC: "",
        FreeCompanyId: "",
        FreeCompanyName: "",
        GearSet: {
          Attributes: {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "19": 0,
            "20": 0,
            "21": 0,
            "22": 0,
            "24": 0,
            "27": 0,
            "33": 0,
            "34": 0,
            "44": 0,
            "45": 0,
            "46": 0,
          },
          ClassID: 0,
          Gear: {
            Body: {
              Creator: 0,
              Dye: 0,
              ID: 0,
              Materia: [],
              Mirage: 0,
            },
            Bracelets: {
              Creator: 0,
              Dye: 0,
              ID: 0,
              Materia: [],
              Mirage: 0,
            },
            Earrings: {
              Creator: 0,
              Dye: 0,
              ID: 0,
              Materia: [],
              Mirage: 0,
            },
            Feet: {
              Creator: 0,
              Dye: 0,
              ID: 0,
              Materia: [],
              Mirage: 0,
            },
            Hands: {
              Creator: 0,
              Dye: 0,
              ID: 0,
              Materia: [],
              Mirage: 0,
            },
            Head: {
              Creator: 0,
              Dye: 0,
              ID: 0,
              Materia: [],
              Mirage: 0,
            },
            Legs: {
              Creator: 0,
              Dye: 0,
              ID: 0,
              Materia: [],
              Mirage: 0,
            },
            MainHand: {
              Creator: 0,
              Dye: 0,
              ID: 0,
              Materia: [],
              Mirage: 0,
            },
            Necklace: {
              Creator: 0,
              Dye: 0,
              ID: 0,
              Materia: [],
              Mirage: 0,
            },
            Ring1: {
              Creator: 0,
              Dye: 0,
              ID: 0,
              Materia: [],
              Mirage: 0,
            },
            Ring2: {
              Creator: 0,
              Dye: 0,
              ID: 0,
              Materia: [],
              Mirage: 0,
            },
            SoulCrystal: {
              Creator: 0,
              Dye: 0,
              ID: 0,
              Materia: [],
              Mirage: 0,
            },
          },
          GearKey: "",
          JobID: 0,
          Level: 0,
        },
        Gender: 0,
        GrandCompany: { NameID: 0, RankID: 0 },
        GuardianDeity: 0,
        ID: 0,
        Lang: null,
        Name: "",
        Nameday: "",
        ParseData: 0,
        Portrait: "",
        PvPTeamId: "",
        Race: 0,
        Server: "",
        Title: 0,
        TitleTop: false,
        Town: 0,
        Tribe: 0,
      },
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
      Friends: [],
      FriendsPublic: false,
      Minions: [],
      Mounts: [],
      PvPTeam: {
        ID: "",
        Pagination: {
          Page: 0,
          PageNext: 0,
          PagePrev: 0,
          PageTotal: 0,
          Results: 0,
          ResultsPerPage: 0,
          ResultsTotal: 0,
        },
        Profile: {
          Crest: [],
          Name: "",
          Server: "",
        },
        Results: [],
      },
    },
  ]);

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
  const [baseFetchLoad, setBaseFetchLoad] = useState<boolean>(false);
  const [membersFetchLoad, setMembersFetchLoad] = useState<boolean>(false);
  const [fetchProgress, setFetchProgress] = useState<number>(0);

  async function searchFreeCompany() {
    setBaseFetchLoad(true);
    const search = (await getFreeCompanies(
      searchInput
    )) as FreeCompanySearchResult;
    setSearchResult(search);
    setBaseFetchLoad(false);
  }

  async function fetchFreeCompany(FreeCompanyID: string) {
    setBaseFetchLoad(true);
    const result = (await getFreeCompany(FreeCompanyID)) as FreeCompanyFull;
    setFreeCompany(result);
    setBaseFetchLoad(false);
  }

  async function fetchMembersData() {
    setMembersFetchLoad(true);
    const result = (await getCharacterList(FreeCompanyMembers, (progress) => {
      setFetchProgress(Math.trunc(progress));
      // Update progress bar or display message to user
    })) as CharacterData[];
    setMembersFullData(result);
    setMembersFetchLoad(false);
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
    fetchMembersData();
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
    baseFetchLoad,
    fetchMembersData,
    filteredMembers,
    setFilteredMembers,
    changeCheckFilter,
    changeSearchFilter,
    checkedKeys,
    searchQuery,
    filterMemberOpen,
    setFilterMemberOpen,
    RankList,
    MembersFullData,
    membersFetchLoad,
    setMembersFetchLoad,
    fetchProgress,
  };

  return (
    <FreeCompanyContext.Provider value={value}>
      {children}
    </FreeCompanyContext.Provider>
  );
};
