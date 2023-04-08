import { TreatedAchievementData } from "@/Types";

export function getGroups(list: TreatedAchievementData[]) {
  const result = new Set<string>();

  for (const achievement of list) {
    result.add(achievement.Data.Group);
  }

  return Array.from(result);
}

export function getCategories(list: TreatedAchievementData[]) {
  const result = new Set<string>();

  for (const achievement of list) {
    result.add(achievement.Data.Category);
  }

  return Array.from(result);
}
