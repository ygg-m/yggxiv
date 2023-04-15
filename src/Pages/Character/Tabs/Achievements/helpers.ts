import { TreatedAchievementData } from "@/Types";

export function getGroups(list: TreatedAchievementData[]) {
  const newSet = new Set<string>();

  for (const achievement of list) {
    newSet.add(achievement.Data.Group ?? "No Group");
  }

  const result = Array.from(newSet);

  return result;
}

export function getCategories(list: TreatedAchievementData[]) {
  const result = new Set<string>();

  for (const achievement of list) {
    result.add(achievement.Data.Category ?? "No Category");
  }

  return Array.from(result);
}

export function filterByCategoryCheck(
  list: TreatedAchievementData[],
  state: string[]
) {
  return state.length > 0
    ? list.filter((achiev: TreatedAchievementData) =>
        state.includes(achiev.Data.Category ?? "No Category")
      )
    : list;
}

export function filterObtained(list: TreatedAchievementData[]) {
  return list.filter(
    (achiev: TreatedAchievementData) => achiev.Obtained === true
  );
}

export function filterUnobtained(list: TreatedAchievementData[]) {
  return list.filter(
    (achiev: TreatedAchievementData) => achiev.Obtained === false
  );
}

export function filterRewards(List: TreatedAchievementData[], Set: boolean) {
  return Set
    ? List.filter((achiev) => achiev.Data.ItemReward !== undefined)
    : List;
}
