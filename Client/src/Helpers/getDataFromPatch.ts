import { TreatedAchievementData } from "@/Types";

export function getDataFromPatch(
  Patch: number,
  List: TreatedAchievementData[]
) {
  return List.filter(
    (e) =>
      parseFloat(e.Data.FFXIVCollectData.Patch) >= Patch &&
      parseFloat(e.Data.FFXIVCollectData.Patch) < Patch + 1
  );
}
