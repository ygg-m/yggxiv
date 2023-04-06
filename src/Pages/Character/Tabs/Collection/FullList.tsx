import { useCharacter } from "@/Contexts/CharacterContext";
import { useGameData } from "@/Contexts/GameDataContext";
import { CollectibleData } from "@/Types";
import { Outlet, useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { SubTabs } from "./SubTabs";

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

export const Item = ({ data }: { data: CollectibleData }) => {
  if (!data) return null;

  const { Icon, Name, Portrait } = data;
  const { Patch, Sources } = data.FFXIVCollectData;

  return (
    <div className="grid place-items-center gap-2 rounded-lg bg-base-300 p-2 duration-300  hover:bg-base-100">
      <img src={Portrait} alt={Name} className="" />
      <h4 className="text-center">{Name}</h4>
    </div>
  );
};

export const UnobtainedItem = ({ data }: { data: CollectibleData }) => {
  if (!data) return null;

  const { Icon, Name, Portrait } = data;
  const { Patch, Sources } = data.FFXIVCollectData;

  return (
    <div className="grid place-items-center gap-2 rounded-lg bg-neutral p-2 duration-300  hover:bg-base-100">
      <img src={Portrait} alt={Name} className="opacity-50" />
      <h4 className="text-center">{Name}</h4>
    </div>
  );
};

export const MountList = () => {
  const { Mounts } = useCharacter().char.Collection;
  const { mounts } = useGameData();

  if (!mounts || !Mounts) return null;

  const percentage = Math.floor((Mounts.length / mounts.length) * 100);

  

  const Unobtained: CollectibleData[] = mounts.filter(
    (e: CollectibleData) => !Mounts.find((el) => el.ID === e.ID)
  );

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
        {Mounts.map((Collectible) => (
          <Item key={uuid()} data={Collectible} />
        ))}
        {Unobtained.map((Collectible) => (
          <UnobtainedItem key={uuid()} data={Collectible} />
        ))}
      </div>
    </article>
  );
};

export const MinionList = () => {
  const { Minions } = useCharacter().char.Collection;
  const { minions } = useGameData();

  if (!minions || !Minions) return null;

  const percentage = Math.floor((Minions.length / minions.length) * 100);

  const Unobtained: CollectibleData[] = minions.filter(
    (e: CollectibleData) => !Minions.find((el) => el.ID === e.ID)
  );

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
      <div className="rounded-lg outline outline-1 outline-neutral-700">
        <div className="grid rounded-b-lg">
          {Minions.map((Collectible) => (
            <Item key={uuid()} data={Collectible} />
          ))}

          {Unobtained.map((Collectible) => (
            <UnobtainedItem key={uuid()} data={Collectible} />
          ))}
        </div>
      </div>
    </article>
  );
};
