import { CollectibleData } from "./CharacterData";

export interface AchievementData {
  ID: number;
  Icon: string;
  Name: string;
  Url: string;
  UrlType: string;
  _: string;
  _Score: number;
}

export interface AchievementList {
  ID: number;
  Group: string;
  Category: string;
  List: CollectibleData[];
}
