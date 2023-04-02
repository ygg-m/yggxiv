import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  RankList: RankListTypes[];
  fetchMembersData: any;
  MembersFullData: CharacterData[];
  membersFetchLoad: boolean;
  setMembersFetchLoad: any;
  fetchProgress: number;
  MemberList: MembersListTypes[];
  loadStats: boolean;
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
  RankList: [],
  fetchMembersData: () => {},
  MembersFullData: [],
  membersFetchLoad: false,
  setMembersFetchLoad: () => {},
  fetchProgress: 0,
  MemberList: [],
  loadStats: false,
});

export const useFreeCompany = () => useContext(FreeCompanyContext);

type FreeCompanyProviderProps = {
  children: React.ReactNode;
};

// Provider
export const FreeCompanyProvider: React.FC<FreeCompanyProviderProps> = ({
  children,
}) => {
  // Router Params
  const { fcId } = useParams();

  // Data
  const [freeCompany, setFreeCompany] = useState<FreeCompanyFull>(
    loadFreeCompany()
  );
  const { FreeCompanyMembers: MemberList } = freeCompany;
  const [MembersFullData, setMembersFullData] = useState<CharacterData[]>(
    loadMembers()
  );

  // Local Storage
  function saveFreeCompany() {
    const json = JSON.stringify(freeCompany);
    localStorage.setItem("FreeCompanyData", json);
  }

  function loadFreeCompany(): FreeCompanyFull {
    const base = {
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
    };
    const value = localStorage.getItem("FreeCompanyData");
    if (value) return JSON.parse(value);
    else return base;
  }

  function saveMembers() {
    const json = JSON.stringify(MembersFullData);
    localStorage.setItem("MembersData", json);
  }

  function loadMembers(): CharacterData[] {
    const base = [
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
          ParseDate: 0,
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
    ];
    const value = localStorage.getItem("MembersData");
    if (value) return JSON.parse(value);
    else return base;
  }

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
  const [isMemberDataDiff, setMemberDataDiff] = useState<boolean>(false);
  const [loadStats, setLoadStats] = useState<boolean>(false);
  const [fetchProgress, setFetchProgress] = useState(0);

  useEffect(() => {
    setLoadStats(membersFetchLoad || isMemberDataDiff ? false : true);
  }, [membersFetchLoad, isMemberDataDiff]);

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
    const result = (await getCharacterList(MemberList, (progress) => {
      // setFetchProgress(Math.trunc(progress));

      if (progress === 100) setMembersFetchLoad(false);
      // Update progress bar
    })) as CharacterData[];
    setMembersFullData(result);
  }

  // Rank List
  const [RankList, setRankList] = useState(getRanks(MemberList));

  useEffect(() => {
    const isMemberDataEmpty =
      MembersFullData[0]?.Character?.ID === 0 || MembersFullData.length === 0;
    const isMemberDataDifferent =
      MembersFullData[0]?.Character?.FreeCompanyId !== fcId;
    const gotFreeCompany = freeCompany.FreeCompany.ID !== "";

    if (
      (isMemberDataEmpty && gotFreeCompany) ||
      (isMemberDataDifferent && gotFreeCompany)
    )
      fetchMembersData();

    setRankList(getRanks(MemberList));
    saveFreeCompany();
    saveMembers();
  }, [freeCompany, MembersFullData]);

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
    RankList,
    MembersFullData,
    membersFetchLoad,
    setMembersFetchLoad,
    fetchProgress,
    MemberList,
    loadStats,
  };

  return (
    <FreeCompanyContext.Provider value={value}>
      {children}
    </FreeCompanyContext.Provider>
  );
};
