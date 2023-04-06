import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import { CollectibleTypes } from "@/Types";
import { useState } from "react";
import { OwnerList } from "./OwnerList";

interface CollectibleItemListProps {
  data: CollectibleTypes;
  index: number;
  query: string;
}

const Placement = ({ Index }: { Index: number }) => (
  <div className="col-span-1 grid place-items-center">{Index + 1}</div>
);

const Icon = ({ Name, Icon }: { Name: string; Icon: string }) => (
  <div className="col-span-1">
    <img src={Icon} alt={Name} className="mask mask-squircle w-12" />
  </div>
);

const Counter = ({ Count }: { Count: number }) => {
  const {
    freeCompany: {
      FreeCompany: { ActiveMemberCount },
    },
  } = useFreeCompany();
  const percentage = (Count / ActiveMemberCount) * 100;

  return (
    <div
      className="tooltip col-span-1 grid cursor-default place-items-center rounded-lg text-primary duration-100 hover:bg-base-300"
      data-tip={`${
        percentage > 1 ? Math.floor(percentage) : percentage.toFixed(1)
      }%`}
    >
      <div>{Count}</div>
    </div>
  );
};

const Name = ({ name }: { name: string }) => (
  <div className="col-span-1 grid items-center capitalize">{name}</div>
);

export const Item = ({ data, index, query }: CollectibleItemListProps) => {
  const { Count, Owners } = data;
  const { Name: name, Icon: cIcon } = data.Data;
  const [showOwner, setShowOwner] = useState<boolean>(false);

  return (
    <div className="grid gap-2 border-b border-neutral-700 bg-neutral py-1 duration-100 hover:bg-base-100">
      <div className="grid grid-cols-[2rem_3rem_4rem_1fr_140px] grid-rows-1 gap-2">
        <Placement Index={index} />
        <Icon Name={name} Icon={cIcon} />
        <Counter Count={Count} />
        <Name name={name} />
        <button className="btn w-fit" onClick={() => setShowOwner(!showOwner)}>
          {showOwner
            ? Owners.length > 1
              ? "Hide Owners"
              : "Hide Owner"
            : Owners.length > 1
            ? "Show Owners"
            : "Show Owner"}
        </button>
      </div>
      <OwnerList List={Owners} query={query} showOwner={showOwner} />
    </div>
  );
};
