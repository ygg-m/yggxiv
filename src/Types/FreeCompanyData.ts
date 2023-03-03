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

export interface FreeCompanyMembersSmall {
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
  FreeCompanyMembers: FreeCompanyMembersSmall[];
}

export interface RankListTypes {
  Rank: string;
  RankIcon: string;
  isChecked?: boolean;
}