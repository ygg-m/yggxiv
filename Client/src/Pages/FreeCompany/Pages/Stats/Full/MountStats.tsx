import { useStats } from "@/Contexts/StatsContext";
import { reverseArray } from "@/Helpers/reverseArray";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { CollectibleStats } from "./CollectibleStats";

export const MountStats = () => {
  const isRarest = useLocation().pathname.split("/").reverse()[0] === "Rarest";
  const { popularMount } = useStats();

  const reverse = useMemo(() => reverseArray(popularMount), [popularMount]);
  const data = useMemo(
    () => (isRarest ? reverse : popularMount),
    [popularMount, isRarest]
  );

  return <CollectibleStats data={data} />;
};
