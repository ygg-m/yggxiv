import { CollectibleData, ItemData } from "./CharacterData";

export interface AchievementCount {
  Count: number;
  Categories: {
    Count: number;
    ID: number;
    Group: string;
    Category: string;
    List: {
      Count: number;
      AchieveData: CollectibleData;
      Owners: CharacterData[];
    }[];
  }[];
}

export interface AchievementData {
  ID: number;
  Name: string;
  Group: string | null;
  Category: string | null;
  Icon: string;
  Description: string;
  Points: number;
  FFXIVCollectData: {
    Id: number;
    Patch: string;
    Owned: number | string;
    Reward?: {
      type: string;
      name?: string;
      title?: {
        id: number;
        name: string;
        female_name: string;
        order: number;
        patch: string;
        owned: string;
        icon: string;
      };
    };
  };
  ItemReward: ItemData | undefined;
}

export interface AchievementListRaw {
  ID: number;
  Date: number;
}

export interface CityData {
  ID: number;
  Icon: string;
  Name: string;
}
