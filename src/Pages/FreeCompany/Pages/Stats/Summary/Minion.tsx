import { ChevronRightIcon, MinusIcon, PlusIcon } from "@/Assets/Images/UI";
import { useStats } from "@/Contexts/StatsContext";
import { CollectibleTypes } from "@/Types";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Collectible } from "../../../Components/Collectible";

interface CollectibleProps {
  data: CollectibleTypes[];
}

const PopularMinions = ({ data }: CollectibleProps) => {
  const filter = data.filter((minion) => minion.MainStory !== true);
  const top3 = filter.slice(0, 3);

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

      <div className="grid gap-6 md:grid-cols-3">
        {top3.map((minion) => {
          return <Collectible key={uuidv4()} data={minion} showCount />;
        })}
      </div>
    </div>
  );
};

const RarestMinions = ({ data }: CollectibleProps) => {
  const reverse = [...data].reverse();
  const filter = reverse.filter(
    (minion) => minion.Premium !== true && minion.Owners.length > 1
  );
  const filterSingleOwner = reverse.filter(
    (minion) => minion.Owners.length === 1
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
        className="btn-secondary btn w-fit gap-2"
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
        <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filterSingleOwner.map((minion) => {
            return <Collectible key={uuidv4()} data={minion} showOwners />;
          })}
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-3">
        {top3.map((minion) => {
          return (
            <Collectible key={uuidv4()} data={minion} showOwners showCount />
          );
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
      <span className="opacity-70">
        Main Story Quest Minions doesn't count to the Top 3.
      </span>
      <div className="divider"></div>
      <PopularMinions data={popularMinion} />
      <div className="divider"></div>
      <RarestMinions data={popularMinion} />
    </div>
  );
};
