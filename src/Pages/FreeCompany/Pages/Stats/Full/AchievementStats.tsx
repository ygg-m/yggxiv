import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import { useStats } from "@/Contexts/StatsContext";
import { reverseArray } from "@/Helpers/reverseArray";
import { AchievementList } from "@/Pages/FreeCompany/Components/AchievementList";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const AchievementStats = () => {
  const isRarest = useLocation().pathname.split("/").reverse()[0] === "Rarest";
  const { rareAchievement } = useStats();
  const { MembersFullData } = useFreeCompany();

  const reverse = useMemo(
    () => reverseArray(rareAchievement),
    [rareAchievement]
  );
  const data = useMemo(
    () => (isRarest ? reverse : rareAchievement),
    [rareAchievement, isRarest]
  );

  let publicCount: number = 0;
  MembersFullData.forEach(
    (member) => member.Achievements.List.length > 0 && publicCount++
  );

  return <AchievementList data={data} publicCount={publicCount} />;
};
