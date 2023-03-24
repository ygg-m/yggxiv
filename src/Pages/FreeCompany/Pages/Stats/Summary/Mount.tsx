import { ChevronRightIcon, MinusIcon, PlusIcon } from "@/Assets/Images/UI";
import { useStats } from "@/Contexts/StatsContext";
import { CollectibleData, CollectibleTypes } from "@/Types";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Collectible } from "../Collectible";

import "chart.js/auto";
import { Chart } from "react-chartjs-2";

interface CollectibleProps {
  data: CollectibleTypes[];
}

const PopularMounts = ({ data }: CollectibleProps) => {
  const filter = data.filter((mount) => mount.MainStory !== true);
  const top3 = filter.slice(0, 3);

  const location = useLocation();
  const currentFC = location.pathname.split("/")[2];
  const FullViewPath = `/FreeCompany/${currentFC}/Stats/Mount/Popular`;

  return (
    <div className="grid gap-2">
      <div className="flex justify-between">
        <h2 className="text-2xl">Most popular Mounts</h2>
        <Link to={FullViewPath} className="btn-primary btn gap-2">
          See full List <ChevronRightIcon className="w-2" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {top3.map((mount) => {
          return <Collectible key={uuidv4()} data={mount} showCount />;
        })}
      </div>
    </div>
  );
};

const RarestMounts = ({ data }: CollectibleProps) => {
  const reverse = [...data].reverse();
  const filter = reverse.filter(
    (mount) => mount.Premium !== true && mount.Owners.length > 1
  );
  const filterSingleOwner = reverse.filter(
    (mount) => mount.Owners.length === 1
  );
  const top3 = filter.slice(0, 3);
  const [showSingle, setShowSingle] = useState<boolean>(false);

  const location = useLocation();
  const currentFC = location.pathname.split("/")[2];
  const FullViewPath = `/FreeCompany/${currentFC}/Stats/Mount/Rarest`;

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
          {filterSingleOwner.map((mount) => {
            return <Collectible key={uuidv4()} data={mount} showOwners />;
          })}
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-3">
        {top3.map((mount) => {
          return (
            <Collectible key={uuidv4()} data={mount} showOwners showCount />
          );
        })}
      </div>
    </div>
  );
};

export const Mount = () => {
  const { popularMount } = useStats();

  return (
    <div className="rounded-lg p-8">
      <h2 className="text-3xl font-bold">Mount</h2>
      <span className="opacity-70">
        Main Story Quest Mounts doesn't count to the Top 3.
      </span>
      <div className="divider"></div>
      <PopularMounts data={popularMount} />
      <div className="divider"></div>
      <RarestMounts data={popularMount} />
    </div>
  );
};
