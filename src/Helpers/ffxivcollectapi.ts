import { ffxivCollectAchieveData } from "@/Data/ffxivCollectAchieveData";
import axios from "axios";

interface SourceData {
  type: string;
  text: string;
  related_type: null;
  related_id: null;
}

interface FFCollectibleData {
  id: number;
  name: string;
  description: string;
  enhanced_description: string;
  tooltip: string;
  movement: string;
  seats: number;
  order: number;
  order_group: number;
  patch: string;
  item_id: null;
  tradeable: false;
  owned: string;
  image: string;
  icon: string;
  bgm: null;
  sources: SourceData[];
}

interface FFAchievementData {
  id: number;
  name: string;
  description: string;
  points: number;
  order: number;
  patch: string;
  owned: string | number;
  icon: string;
  category: { id: number; name: string };
  type: { id: number; name: string };
  reward?: {
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
}

export interface CollectData {
  Id: number;
  Patch: string;
  Seats: string;
  Tradeable: boolean;
  Owned: number;
  Sources: SourceData[];
}

export interface AchieveData {
  Id: number;
  Patch: string;
  Owned: string | number;
  Reward:
    | {
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
      }
    | undefined;
}

export async function getFFCollectMounts(): Promise<CollectData[]> {
  const url = "https://ffxivcollect.com/api/mounts/";
  const response = await axios.get(url);
  const data = response.data;

  const result = data.results.map((mount: FFCollectibleData) => {
    return {
      Id: mount.id,
      Patch: mount.patch,
      Seats: mount.seats,
      Tradeable: mount.tradeable,
      Owned: parseInt(mount.owned),
      Sources: mount.sources,
    };
  });

  return result;
}

export async function getFFCollectMinion(): Promise<CollectData[]> {
  const url = "https://ffxivcollect.com/api/minions/";
  const response = await axios.get(url);
  const data = response.data;

  const result = data.results.map((mount: FFCollectibleData) => {
    return {
      Id: mount.id,
      Patch: mount.patch,
      Seats: mount.seats,
      Tradeable: mount.tradeable,
      Owned: parseInt(mount.owned),
      Sources: mount.sources,
    };
  });

  return result;
}

export async function getFFCollectAchievements(): Promise<AchieveData[]> {
  // old fetch
  // const url = "https://ffxivcollect.com/api/achievements/";
  // const response = await axios.get(url);
  // const data = response.data;

  const data = ffxivCollectAchieveData.filter((e) => e.name !== "");

  const result = data.map((achieve: FFAchievementData) => {
    return {
      Id: achieve.id,
      Patch: achieve.patch,
      Owned: achieve.owned,
      Reward: achieve.reward,
    };
  });

  return result;
}
