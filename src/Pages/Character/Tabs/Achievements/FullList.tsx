import { useCharacter } from "@/Contexts/CharacterContext";
import { TreatedAchievementData } from "@/Types";
import { useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { Group } from "./Group";
import {
  filterByCategoryCheck,
  filterObtained,
  filterUnobtained,
  getCategories,
  getGroups,
} from "./helpers";


export const FullList = () => {
  const { List } = useCharacter().char.Achievements;

  const groupList = getGroups(List);
  const percentage = Math.floor(
    (List.filter((e) => e.Obtained === true).length / List.length) * 100
  );
  let Points: number = 0;

  List.forEach((e) => {
    if (e.Obtained === true) Points += e.Data.Points;
  });

  return (
    <section className="grid gap-4">
      <div className="flex w-full items-center justify-end gap-2">
        <span className="text-gray-400">Total</span>
        <h1 className="rounded-lg bg-base-100 p-2 px-4">
          <span className="text-primary">{Points}</span> Points
        </h1>
        <h2 className="rounded-lg bg-base-100 p-2 px-4">
          {List.filter((e) => e.Obtained === true).length} / {List.length} (
          {percentage}%)
        </h2>
      </div>

      {groupList.map((e) => (
        <Group
          key={uuid()}
          Name={e}
          List={List.filter((a) => a.Data.Group === e)}
        />
      ))}
    </section>
  );
};
