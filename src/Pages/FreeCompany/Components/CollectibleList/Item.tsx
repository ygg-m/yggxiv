import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import { CollectibleTypes } from "@/Types";
import { CharCardData } from "@/Types/index";
import { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
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
    <img
      src={`http://xivapi.com${Icon}`}
      alt={Name}
      className="mask mask-squircle w-12"
    />
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
      className="tooltip col-span-1 grid cursor-default place-items-center rounded-lg text-primary duration-300 hover:bg-base-300"
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

  return (
    <div className="grid grid-cols-[2rem_3rem_4rem_.25fr_1fr] grid-rows-1 gap-2 border-b border-neutral-700 bg-neutral py-1 duration-300 hover:bg-base-100">
      <Placement Index={index} />
      <Icon Name={name} Icon={cIcon} />
      <Counter Count={Count} />
      <Name name={name} />
      <OwnerList List={Owners} query={query} index={index} />
    </div>
  );
};