import { useStats } from "@/Contexts/StatsContext";
import { reverseArray } from "@/Helpers/reverseArray";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { CollectibleStats } from "./CollectibleStats";

export const MinionStats = () => {
  const isRarest = useLocation().pathname.split("/").reverse()[0] === "Rarest";
  const { popularMinion } = useStats();

  const reverse = useMemo(() => reverseArray(popularMinion), [popularMinion]);
  const data = useMemo(
    () => (isRarest ? reverse : popularMinion),
    [popularMinion, isRarest]
  );

  return <CollectibleStats data={data} />;
};
