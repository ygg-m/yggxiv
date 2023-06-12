export const FreeCompanyStructure = {
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

export interface FreeCompanySmall {
  Crest: string[];
  ID: string;
  Name: string;
  Server: string;
}

export interface FreeCompanyFocus {
  Icon: string;
  Name: string;
  Status: boolean;
}

export interface FreeCompanyRanking {
  Monthly: number;
  Weekly: number;
}

export interface FreeCompanyReputation {
  Name: string;
  Progress: number;
  Rank: string;
}

export interface FreeCompanySeeking {
  Icon: string;
  Name: string;
  Status: boolean;
}

export interface FreeCompanyEstate {
  Greeting: string;
  Name: string;
  Plot: string;
}

export interface FreeCompanyData {
  Active: string;
  ActiveMemberCount: number;
  Crest: string[];
  DC: string;
  Estate: FreeCompanyEstate;
  Focus: FreeCompanyFocus[];
  Formed: number;
  GrandCompany: string;
  ID: string;
  Name: string;
  ParseDate: number;
  Rank: number;
  Ranking: FreeCompanyRanking;
  Recruitment: string;
  Reputation: FreeCompanyReputation[];
  Seeking: FreeCompanySeeking[];
  Server: string;
  Slogan: string;
  Tag: string;
}

export interface MembersListTypes {
  Avatar: string;
  FeastMatches: number;
  ID: number;
  Lang: any;
  Name: string;
  Rank: string;
  RankIcon: string;
  Server: string;
}

export interface FreeCompanyFull {
  FreeCompany: FreeCompanyData;
  FreeCompanyMembers: MembersListTypes[];
}

export interface RankListTypes {
  Rank: string;
  RankIcon: string;
  isChecked?: boolean;
}

export interface LeaderBoardType {
  FirstPlace: CharacterData;
  SecondPlace: CharacterData;
  ThirdPlace: CharacterData;
  EveryoneElse: CharacterData[];
}
