import { MinusIcon, PlusIcon } from "@/Assets/Images/UI";
import { SimpleLoading } from "@/Components/LoadingComponents/SimpleLoading";
import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import { useStats } from "@/Contexts/StatsContext";
import { AchievementsTypes, CollectibleTypes } from "@/Types";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Collectible } from "../Collectible";
import { ShowData } from "../ShowData";
import { Achievements } from "./Achievements";
import { Character } from "./Character";
import { Job } from "./Job";
import { Minion } from "./Minion";
import { Mount } from "./Mount";

export const Summary = () => {
  const { rareAchievement } = useStats();
  const { MembersFullData } = useFreeCompany();

  let publicAchievement: number = 0;
  MembersFullData.forEach(
    (member) => member.Achievements.List.length > 0 && publicAchievement++
  );

  return (
    <section className="mt-4 grid gap-4">
      <Character />
      <Job />
      <Mount />
      <Minion />
      <Achievements />
    </section>
  );
};
