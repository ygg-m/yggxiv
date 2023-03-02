import axios from "axios";

// Free Company Search
interface Pagination {
  Page: number;
  PageNext: number | null;
  PagePrev: number | null;
  PageTotal: number;
  Results: number;
  ResultsPerPage: number;
  ResultsTotal: number;
}

interface FreeCompanySmall {
  Crest: string[];
  ID: string;
  Name: string;
  Server: string;
}

export interface FreeCompanySearchResult {
  Pagination: Pagination;
  Results: FreeCompanySmall[];
}

export async function getFreeCompanies(
  name: string
): Promise<FreeCompanySearchResult> {
  const url = `https://xivapi.com/freecompany/search?name=${name}`;
  const response = await axios.get(url);
  const data = response.data;

  const freeCompanies: FreeCompanySmall[] = data.Results.map((result: any) => {
    return {
      Crest: result.Crest,
      ID: result.ID,
      Name: result.Name,
      Server: result.Server,
    };
  });

  const pagination: Pagination = {
    Page: data.Pagination.Page,
    PageNext: data.Pagination.PageNext,
    PagePrev: data.Pagination.PagePrev,
    PageTotal: data.Pagination.PageTotal,
    Results: data.Pagination.Results,
    ResultsPerPage: data.Pagination.ResultsPerPage,
    ResultsTotal: data.Pagination.ResultsTotal,
  };

  return {
    Pagination: pagination,
    Results: freeCompanies,
  };
}

// Free Company Full
interface FreeCompanyFocus {
  Icon: string;
  Name: string;
  Status: boolean;
}

interface FreeCompanyRanking {
  Monthly: number;
  Weekly: number;
}

interface FreeCompanyReputation {
  Name: string;
  Progress: number;
  Rank: string;
}

interface FreeCompanySeeking {
  Icon: string;
  Name: string;
  Status: boolean;
}

interface FreeCompanyData {
  Active: string;
  ActiveMemberCount: number;
  Crest: string[];
  DC: string;
  Estate: { Greeting: string; Name: string; Plot: string };
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

interface FreeCompanyMembersSmall {
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

export async function getFreeCompany(
  FreeCompanyID: string
): Promise<FreeCompanyFull> {
  const url = `https://xivapi.com/freecompany/${FreeCompanyID}?data=FCM`;
  const response = await axios.get(url);
  const data = response.data;

  const freeCompany: FreeCompanyData = {
    Active: data.FreeCompany.Active,
    ActiveMemberCount: data.FreeCompany.ActiveMemberCount,
    Crest: data.FreeCompany.Crest,
    DC: data.FreeCompany.DC,
    Estate: data.FreeCompany.Estate,
    Focus: data.FreeCompany.Focus,
    Formed: data.FreeCompany.Formed,
    GrandCompany: data.FreeCompany.GrandCompany,
    ID: data.FreeCompany.ID,
    Name: data.FreeCompany.Name,
    ParseDate: data.FreeCompany.ParseDate,
    Rank: data.FreeCompany.Rank,
    Ranking: data.FreeCompany.Ranking,
    Recruitment: data.FreeCompany.Recruitment,
    Reputation: data.FreeCompany.Reputation,
    Seeking: data.FreeCompany.Seeking,
    Server: data.FreeCompany.Server,
    Slogan: data.FreeCompany.Slogan,
    Tag: data.FreeCompany.Tag,
  };

  const members: FreeCompanyMembersSmall[] = data.FreeCompanyMembers.map(
    (result: any) => {
      return {
        Avatar: result.Avatar,
        FeastMatches: result.FeastMatches,
        ID: result.ID,
        Lang: result.Lang,
        Name: result.Name,
        Rank: result.Rank,
        RankIcon: result.RankIcon,
        Server: result.Server,
      };
    }
  );

  return {
    FreeCompany: freeCompany,
    FreeCompanyMembers: members,
  };
}
