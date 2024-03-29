import { xivAchieveData } from "@/Data/xivAchieveData";
import axios from "axios";
import pLimit from "p-limit";
import {
  AchievementData,
  CharacterData,
  CollectibleData,
  FreeCompanyData,
  FreeCompanyFull,
  FreeCompanySearchResult,
  FreeCompanySmall,
  MembersListTypes,
  Pagination,
} from "../Types/index";
import { capitalizeText } from "./capitalizeText";
import {
  AchieveData,
  CollectData,
  getFFCollectAchievements,
  getFFCollectMinion,
  getFFCollectMounts,
} from "./ffxivcollectapi";

const limit = pLimit(2);

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

export async function getCharacter(
  ID: number,
  AC?: boolean, // Achievements
  FR?: boolean, // Friend List
  FC?: boolean, // Free Company
  FCM?: boolean, // Free Company Members
  MIMO?: boolean, // Minions / Mounts
  PVP?: boolean // PVP Team
): Promise<CharacterData> {
  const params = [];
  if (AC) params.push("AC");
  if (FR) params.push("FR");
  if (FC) params.push("FC");
  if (FCM) params.push("FCM");
  if (MIMO) params.push("MIMO");
  if (PVP) params.push("PVP");

  const url = `https://xivapi.com/character/${ID}?data=${params.join(",")}`;
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
  list: MembersListTypes[],
  progressCallback: (progress: number) => void
): Promise<CharacterData[]> {
  const total = list.length;
  let completed = 0;

  const newList = await Promise.all(
    list.map((char) =>
      limit(() => getCharacter(char.ID, true, false, false, false, true, false))
        .then((character) => {
          completed++;
          progressCallback((completed / total) * 100);
          return character; // Return the CharacterData value
        })
        .catch((error) => {
          console.error(error);
          return undefined; // Return undefined if getCharacter throws an error
        })
    )
  );

  return newList.filter((character) => !!character) as CharacterData[]; // Filter out undefined values
}

export async function getMounts(): Promise<CollectibleData[]> {
  const url = "https://xivapi.com/Mount?columns=ID,IconHD,Name,Icon&limit=3000";
  const FFCollectMountData = await getFFCollectMounts();

  const response = await axios.get(url);
  const data = response.data;

  interface MountData {
    ID: number;
    Name: string;
    IconHD: string;
    Icon: string;
  }

  interface ResultType {
    ID: number;
    Name: string;
    Icon: string;
    Portrait: string;
    FFXIVCollectData: CollectData;
  }

  const result = data.Results.map((mount: MountData) => {
    const FFXIVCollectData = FFCollectMountData.find(
      (data) => data.Id === mount.ID
    );

    return {
      ID: mount.ID,
      Name: capitalizeText(mount.Name),
      Icon: `http://xivapi.com/${mount.IconHD}`,
      Portrait: `http://xivapi.com${mount.Icon}`,
      FFXIVCollectData: FFXIVCollectData,
    };
  }).filter((m: ResultType) => typeof m.FFXIVCollectData !== "undefined");

  result.forEach((el: ResultType) => {
    if (typeof el.FFXIVCollectData.Sources === "undefined") console.log(el);
  });

  return result;
}

export async function getMinions(): Promise<CollectibleData[]> {
  const url =
    "https://xivapi.com/Companion?columns=ID,IconHD,Name,Icon&limit=3000";
  const FFCollectMinionData = await getFFCollectMinion();

  const response = await axios.get(url);
  const data = response.data;

  interface MinionData {
    ID: number;
    Name: string;
    IconHD: string;
    Icon: string;
  }

  interface ResultType {
    ID: number;
    Name: string;
    Icon: string;
    Portrait: string;
    FFXIVCollectData: CollectData;
  }

  const result = data.Results.map((minion: MinionData) => {
    const FFXIVCollectData = FFCollectMinionData.find(
      (data) => data.Id === minion.ID
    );

    return {
      ID: minion.ID,
      Name: capitalizeText(minion.Name),
      Icon: `http://xivapi.com/${minion.IconHD}`,
      Portrait: `http://xivapi.com${minion.Icon}`,
      FFXIVCollectData: FFXIVCollectData,
    };
  }).filter((m: ResultType) => typeof m.FFXIVCollectData !== "undefined");

  result.forEach((el: ResultType) => {
    if (typeof el.FFXIVCollectData.Sources === "undefined") console.log(el);
  });

  return result;
}

export async function getAchievements(): Promise<AchievementData[]> {
  // old fetch
  // const urls = [
  //   "https://xivapi.com/Achievement?columns=ID,IconHD,Name,Description,AchievementCategory.Name,AchievementCategory.AchievementKind.Name,Points&limit=3000",
  //   "https://xivapi.com/Achievement?columns=ID,IconHD,Name,Description,AchievementCategory.Name,AchievementCategory.AchievementKind.Name,Points&limit=3000&Page=2",
  // ];
  const FFCollectAchieveData = await getFFCollectAchievements();

  // const fetch = await Promise.all(
  //   urls.map((url) =>
  //     limit(async () => {
  //       const response = await axios.get(url);
  //       const data = response.data.Results;
  //       return data;
  //     })
  //   )
  // );

  // const List = [...fetch[0], ...fetch[1]];

  const List = xivAchieveData.filter((e) => e.Name !== "");

  const result = await Promise.all(
    List.map(async (achievData) => {
      const FFXIVCollectData = FFCollectAchieveData.find(
        (data) => data.Id === achievData.ID
      ) as AchieveData;

      let ItemReward;

      if (FFXIVCollectData?.Reward?.type === "Item")
        ItemReward = limit(
          async () => await searchItem(FFXIVCollectData.Reward?.name ?? "Gil")
        );

      const Group = achievData.AchievementCategory.AchievementKind.Name;
      const Category = achievData.AchievementCategory.Name;

      return {
        ID: achievData.ID,
        Name: achievData.Name,
        Group: Group,
        Category: Category,
        Icon: `http://xivapi.com/${achievData.IconHD}`,
        Description: achievData.Description,
        Points: achievData.Points,
        FFXIVCollectData: FFXIVCollectData,
        ItemReward: await ItemReward,
      };
    })
  );

  return result;
}

export async function getTitle(id: number) {
  const url = `https://xivapi.com/title/${id}`;
  const response = await axios.get(url);

  const data = response.data;

  return data;
}

export async function getCity(id: number) {
  const url = `https://xivapi.com/Town/${id}?columns=ID,Name,IconHD`;
  const response = await axios.get(url);

  const data = response.data;

  return {
    ID: data.ID,
    Icon: `https://xivapi.com/${data.IconHD}`,
    Name: data.Name,
  };
}

export async function getItem(id: number) {
  const url = `https://xivapi.com/Item/${id}?columns=IconHD,Name,MateriaSlotCount,LevelEquip,LevelItem,ID`;
  const response = await axios.get(url);

  const data = response.data;

  return {
    ID: data.ID,
    Name: data.Name,
    Icon: `https://xivapi.com/${data.IconHD}`,
    EquipLevel: data.LevelEquip,
    ItemLevel: data.LevelItem,
    MateriaSlots: data.MateriaSlotCount,
  };
}

export async function searchItem(str: string) {
  const url = `https://xivapi.com/search?indexes=Item&columns=IconHD,Name,MateriaSlotCount,LevelEquip,LevelItem,ID,Description&string=${str}`;
  const response = await axios.get(url);

  const data = response.data.Results[0];

  return {
    ID: data.ID,
    Name: data.Name,
    Icon: `https://xivapi.com/${data.IconHD}`,
    Description: data.Description,
    EquipLevel: data.LevelEquip,
    ItemLevel: data.LevelItem,
    MateriaSlots: data.MateriaSlotCount,
    MateriaEquipped: null,
    Glamour: null,
  };
}
