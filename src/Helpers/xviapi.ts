import axios from "axios";
import pLimit from "p-limit";
import {
  CharacterData,
  FreeCompanyData,
  FreeCompanyFull,
  FreeCompanySearchResult,
  FreeCompanySmall,
  MembersListTypes,
  Pagination,
} from "../Types/index";

const limit = pLimit(15);

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
  const members: MembersListTypes[] = data.FreeCompanyMembers.map(
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

export async function getCharacter(ID: number): Promise<CharacterData> {
  const url = `https://xivapi.com/character/${ID}?data=AC,FR,FC,FCM,MIMO,PVP`;
  const response = await axios.get(url);
  const data = response.data;

  return {
    Achievements: data.Achievements,
    AchievementsPublic: data.AchievementsPublic,
    Character: data.Character,
    FreeCompany: data.FreeCompany,
    FreeCompanyMembers: data.FreeCompanyMembers,
    Friends: data.Friends,
    FriendsPublic: data.FriendsPublic,
    Minions: data.Minions,
    Mounts: data.Mounts,
    PvPTeam: data.PvPTeam,
  };
}

export async function getCharacterList(
  list: MembersListTypes[]
): Promise<CharacterData[]> {
  const newList = await Promise.all(
    list.map((char) => limit(() => getCharacter(char.ID)))
  );

  return newList;
}
