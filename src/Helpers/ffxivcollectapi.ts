import axios from "axios";

interface SourceData {
  type: string;
  text: string;
  related_type: null;
  related_id: null;
}

interface MountData {
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

export interface CollectData {
  Id: number;
  Patch: string;
  Seats: string;
  Tradeable: boolean;
  Owned: string;
  Sources: SourceData[];
}

export async function getFFCollectMounts(): Promise<CollectData[]> {
  const url = "https://ffxivcollect.com/api/mounts/";
  const response = await axios.get(url);
  const data = response.data;

  const result = data.results.map((mount: MountData) => {
    return {
      Id: mount.id,
      Patch: mount.patch,
      Seats: mount.seats,
      Tradeable: mount.tradeable,
      Owned: mount.owned,
      Sources: mount.sources,
    };
  });

  return result;
}

export async function getFFCollectMinion(): Promise<CollectData[]> {
  const url = "https://ffxivcollect.com/api/minions/";
  const response = await axios.get(url);
  const data = response.data;

  const result = data.results.map((mount: MountData) => {
    return {
      Id: mount.id,
      Patch: mount.patch,
      Seats: mount.seats,
      Tradeable: mount.tradeable,
      Owned: mount.owned,
      Sources: mount.sources,
    };
  });

  return result;
}
