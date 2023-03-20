import { ChevronRightIcon, MinusIcon, PlusIcon } from "@/Assets/Images/UI";
import { useStats } from "@/Contexts/StatsContext";
import { CollectibleTypes } from "@/Types";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Collectible } from "../Collectible";

interface CollectibleProps {
  data: CollectibleTypes[];
}

const PopularMinions = ({ data }: CollectibleProps) => {
  const filter = data.filter((minion) => minion.MainStory !== true);
  const MSQFilter = data.filter((minion) => minion.MainStory === true);
  const top3 = filter.slice(0, 3);
  const [showMSQ, setShowMSQ] = useState<boolean>(false);

  const location = useLocation();
  const currentFC = location.pathname.split("/")[2];
  const FullViewPath = `/FreeCompany/${currentFC}/Stats/Minion/Popular`;

  return (
    <div className="grid gap-2">
      <div className="flex justify-between">
        <h2 className="text-2xl">Most popular Minions</h2>
        <Link to={FullViewPath} className="btn-primary btn gap-2">
          See full List <ChevronRightIcon className="w-2" />
        </Link>
      </div>

      <button className="btn w-fit gap-2" onClick={() => setShowMSQ(!showMSQ)}>
        {showMSQ ? (
          <>
            <MinusIcon className="w-4" /> Hide Main Story Quest Minions
          </>
        ) : (
          <>
            <PlusIcon className="w-4" />
            Show Main Story Quest Minions
          </>
        )}
      </button>

      {showMSQ && (
        <div className="grid gap-2 rounded-lg bg-base-300 p-4 md:grid-cols-3">
          {MSQFilter.map((minion) => {
            return <Collectible key={uuidv4()} data={minion} />;
          })}
        </div>
      )}

      <div className="grid gap-2 md:grid-cols-3">
        {top3.map((minion) => {
          return <Collectible key={uuidv4()} data={minion} />;
        })}
      </div>
    </div>
  );
};

const RarestMinions = ({ data }: CollectibleProps) => {
  const reverse = [...data].reverse();
  const filter = reverse.filter(
    (minion) => minion.Premium !== true && minion.owners.length > 1
  );
  const filterSingleOwner = reverse.filter(
    (minion) => minion.owners.length === 1
  );
  const top3 = filter.slice(0, 3);
  const [showSingle, setShowSingle] = useState<boolean>(false);

  const location = useLocation();
  const currentFC = location.pathname.split("/")[2];
  const FullViewPath = `/FreeCompany/${currentFC}/Stats/Minion/Rarest`;

  return (
    <div className="grid gap-2">
      <div className="flex justify-between">
        <h2 className="text-2xl">Rarest Mounts</h2>
        <Link to={FullViewPath} className="btn-primary btn gap-2">
          See full List <ChevronRightIcon className="w-2" />
        </Link>
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
          {filterSingleOwner.map((minion) => {
            return <Collectible key={uuidv4()} data={minion} showOwners />;
          })}
        </div>
      )}
      <div className="grid gap-2 md:grid-cols-3">
        {top3.map((minion) => {
          return <Collectible key={uuidv4()} data={minion} showOwners />;
        })}
      </div>
    </div>
  );
};

export const Minion = () => {
  const { popularMinion } = useStats();

  return (
    <div className="rounded-lg bg-base-100 p-8">
      <h2 className="text-3xl font-bold">Minion</h2>
      <div className="divider"></div>
      <PopularMinions data={popularMinion} />
      <div className="divider"></div>
      <RarestMinions data={popularMinion} />
    </div>
  );
};
