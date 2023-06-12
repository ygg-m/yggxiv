import { CollectibleData, CollectibleTreatedData } from "@/Types";

export function filterByPatch(list: CollectibleTreatedData[], patch: number) {
  return list.filter(
    (e) =>
      parseFloat(e.Data.FFXIVCollectData.Patch) > patch &&
      parseFloat(e.Data.FFXIVCollectData.Patch) < patch + 1
  );
}

export function filterBySourceCheck(
  list: CollectibleTreatedData[],
  state: string[]
) {
  return state.length > 0
    ? list.filter((mount: CollectibleTreatedData) =>
        mount.Data.FFXIVCollectData.Sources.some((e) => state.includes(e.type))
      )
    : list;
}

export function filterObtained(list: CollectibleTreatedData[]) {
  return list.filter(
    (mount: CollectibleTreatedData) => mount.Obtained === true
  );
}

export interface FullListCollectibleProps {
  List: CollectibleTreatedData[];
  FullList: CollectibleData[];
}

export const emptyItem: CollectibleTreatedData[] = [
  {
    Obtained: false,
    Data: {
      ID: 0,
      Icon: "",
      Portrait: "",
      Name: "",
      FFXIVCollectData: {
        Id: 0,
        Patch: "",
        Seats: "",
        Tradeable: false,
        Owned: 0,
        Sources: [],
      },
    },
  },
];

export function getSources(list: CollectibleTreatedData[]) {
  const uniqueSources = new Set<string>();

  for (const collectible of list) {
    for (const source of collectible.Data.FFXIVCollectData.Sources) {
      uniqueSources.add(source.type);
    }
  }

  return Array.from(uniqueSources);
}
