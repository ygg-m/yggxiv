import { CollectibleData } from "./CharacterData";

export interface AchievementData {
  ID: number;
  Name: string;
  Group: string;
  Category: string;
  Icon: string;
  Description: string;
}

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

export interface CityData {
  ID: number;
  Icon: string;
  Name: string;
}