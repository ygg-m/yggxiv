import { MinusIcon, PlusIcon } from "@/Assets/Images/UI";
import { useStats } from "@/Contexts/StatsContext";
import { CollectibleData, CollectibleTypes } from "@/Types";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Collectible } from "../Collectible";

interface CollectibleProps {
  data: CollectibleTypes[];
}

const PopularMounts = ({ data }: CollectibleProps) => {
  const filter = data.filter((mount) => mount.MainStory !== true);
  const MSQFilter = data.filter((mount) => mount.MainStory === true);
  const top3 = filter.slice(0, 3);

  const [showMSQ, setShowMSQ] = useState<boolean>(false);

  return (
    <div className="grid gap-2">
      <div className="flex justify-between">
        <h2 className="text-2xl">Most popular Mounts</h2>
        <button className="btn-primary btn">See full List →</button>
      </div>

      <button className="btn w-fit gap-2" onClick={() => setShowMSQ(!showMSQ)}>
        {showMSQ ? (
          <>
            <MinusIcon className="w-4" /> Hide Main Story Quest Mounts
          </>
        ) : (
          <>
            <PlusIcon className="w-4" />
            Show Main Story Quest Mounts
          </>
        )}
      </button>

      {showMSQ && (
        <div className="grid gap-2 rounded-lg bg-base-300 p-4 md:grid-cols-3">
          {MSQFilter.map((mount) => {
            return <Collectible key={uuidv4()} data={mount} />;
          })}
        </div>
      )}

      <div className="grid gap-2 md:grid-cols-3">
        {top3.map((mount) => {
          return <Collectible key={uuidv4()} data={mount} />;
        })}
      </div>
    </div>
  );
};

const RarestMounts = ({ data }: CollectibleProps) => {
  const reverse = [...data].reverse();
  const filter = reverse.filter(
    (mount) => mount.Premium !== true && mount.owners.length > 1
  );
  const filterSingleOwner = reverse.filter(
    (mount) => mount.owners.length === 1
  );
  const top3 = filter.slice(0, 3);

  const [showSingle, setShowSingle] = useState<boolean>(false);

  return (
    <div className="grid gap-2">
      <div className="flex justify-between">
        <h2 className="text-2xl">Rarest Mounts</h2>
        <button className="btn-primary btn">See full List →</button>
      </div>

      <button
        className="btn w-fit gap-2"
        onClick={() => setShowSingle(!showSingle)}
      >
        {showSingle ? (
          <>
            <MinusIcon className="w-4" /> Hide Single Owners
          </>
        ) : (
          <>
            <PlusIcon className="w-4" />
            Show Single Owners
          </>
        )}
      </button>

      {showSingle && (
        <div className="grid gap-2 rounded-lg bg-base-300 p-4 md:grid-cols-3">
          {filterSingleOwner.map((mount) => {
            return <Collectible key={uuidv4()} data={mount} showOwners />;
          })}
        </div>
      )}
      <div className="grid gap-2 md:grid-cols-3">
        {top3.map((mount) => {
          return <Collectible key={uuidv4()} data={mount} showOwners />;
        })}
      </div>
    </div>
  );
};

export const Mount = () => {
  const { popularMount } = useStats();

  return (
    <div className="rounded-lg bg-base-100 p-8">
      <h2 className="text-3xl font-bold">Mount</h2>
      <div className="divider"></div>
      <PopularMounts data={popularMount} />
      <div className="divider"></div>
      <RarestMounts data={popularMount} />
    </div>
  );
};
