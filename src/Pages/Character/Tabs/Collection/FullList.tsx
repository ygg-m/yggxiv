import { useCharacter } from "@/Contexts/CharacterContext";
import { useGameData } from "@/Contexts/GameDataContext";
import { CollectibleData } from "@/Types";
import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { SubTabs } from "./SubTabs";

interface CollectibleTreatedData {
  Obtained: boolean;
  Data: CollectibleData;
}

export const FullList = () => {
  const { Mounts, Minions } = useCharacter().char.Collection;

  const isDefaultPath = /FullList/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[0]
  );

  return (
    <section className="grid gap-2 rounded-t-lg">
      <SubTabs isDefaultPath={isDefaultPath} />
      <Outlet />
      {isDefaultPath ? <MountList /> : null}
    </section>
  );
};

interface ItemProps {
  Obtained: boolean;
  Data: CollectibleData;
}

export const Item = ({ Data, Obtained }: ItemProps) => {
  if (!Data) return null;

  const { Icon, Name, Portrait } = Data;
  // const { Patch, Sources } = data.Data.FFXIVCollectData;

  return Obtained ? (
    <div className="grid place-items-center gap-2 rounded-lg bg-base-300 p-2 duration-100  hover:bg-base-100 hover:saturate-150">
      <img src={Portrait} alt={Name} className="" />
      <h4 className="text-center">{Name}</h4>
    </div>
  ) : (
    <div className="grid place-items-center gap-2 rounded-lg bg-base-300 p-2 opacity-30  duration-100 hover:bg-base-100 hover:opacity-70">
      <img src={Portrait} alt={Name} className="grayscale-50" />
      <h4 className="text-center">{Name}</h4>
    </div>
  );
};

export const MountList = () => {
  const { Mounts } = useCharacter().char.Collection;
  const { mounts } = useGameData();

  const [listIndex, setListIndex] = useState(16);
  const list = useMemo<CollectibleTreatedData[]>(
    () =>
      mounts
        .map((e: CollectibleData) => {
          return {
            Obtained: Mounts.some(
              (a) => a.Name.toLowerCase() === e.Name.toLowerCase()
            ),
            Data: e,
          };
        })
        .slice(0, listIndex),
    [listIndex]
  );

  if (!mounts || !Mounts) return null;

  const percentage = Math.floor((Mounts.length / mounts.length) * 100);

  const Count = () => (
    <h2 className="flex w-fit gap-4 rounded-lg bg-base-200 p-2 px-4 text-gray-400">
      <div className="flex gap-1">
        <span className="text-primary">{Mounts.length}</span>
        <span>of</span>
        <span>{mounts.length}</span>
        <span>({percentage}%)</span>
      </div>
      <span className="text-accent">Obtainable Mounts.</span>
    </h2>
  );

  return (
    <article className="grid gap-2">
      <Count />

      <div className="grid grid-cols-4 gap-2 lg:grid-cols-7 xl:grid-cols-8">
        {list.map((Collectible) => {
          const { Obtained, Data } = Collectible;
          return <Item key={uuid()} Data={Data} Obtained={Obtained} />;
        })}
      </div>

      <button
        className="btn-primary btn"
        onClick={() => setListIndex(listIndex + 8)}
      >
        Show More
      </button>
    </article>
  );
};

export const MinionList = () => {
  const { Minions } = useCharacter().char.Collection;
  const { minions } = useGameData();

  const [listIndex, setListIndex] = useState(16);
  const list = useMemo<CollectibleTreatedData[]>(
    () =>
      minions
        .map((e: CollectibleData) => {
          return {
            Obtained: Minions.some(
              (a) => a.Name.toLowerCase() === e.Name.toLowerCase()
            ),
            Data: e,
          };
        })
        .slice(0, listIndex),
    [listIndex]
  );

  if (!minions || !Minions) return null;

  const percentage = Math.floor((Minions.length / minions.length) * 100);

  const Count = () => (
    <h2 className="flex w-fit gap-4 rounded-lg bg-base-200 p-2 px-4 text-gray-400">
      <div className="flex gap-1">
        <span className="text-primary">{Minions.length}</span>
        <span>of</span>
        <span>{minions.length}</span>
        <span>({percentage}%)</span>
      </div>
      <span className="text-accent">Obtainable Minions.</span>
    </h2>
  );

  return (
    <article className="grid gap-2">
      <Count />

      <div className="grid grid-cols-4 gap-2 lg:grid-cols-7 xl:grid-cols-8">
        {list.map((Collectible) => {
          const { Obtained, Data } = Collectible;
          return <Item key={uuid()} Data={Data} Obtained={Obtained} />;
        })}
      </div>

      <button
        className="btn-primary btn"
        onClick={() => setListIndex(listIndex + 8)}
      >
        Show More
      </button>
    </article>
  );
};
