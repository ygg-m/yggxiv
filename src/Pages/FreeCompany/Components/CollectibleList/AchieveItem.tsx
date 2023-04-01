import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import { AchievementsTypes } from "@/Types";
import { CharCardData } from "@/Types/index";
import { useState } from "react";
import { OwnerList } from "./OwnerList";

interface AchieveItemProps {
  data: AchievementsTypes;
  index: number;
  query: string;
  publicCount: number;
}

const Placement = ({ Index }: { Index: number }) => (
  <div className="col-span-1 grid place-items-center">{Index + 1}</div>
);

const IconContainer = ({ Name, Icon }: { Name: string; Icon: string }) => (
  <div className="col-span-1 grid place-items-center">
    <img
      src={`http://xivapi.com${Icon}`}
      alt={Name}
      className="mask mask-squircle w-12"
    />
  </div>
);

const Counter = ({
  Count,
  publicCount,
}: {
  Count: number;
  publicCount: number;
}) => {
  const percentage = (Count / publicCount) * 100;

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

const NameContainer = ({ name }: { name: string }) => (
  <div className="col-span-1 grid items-center capitalize">{name}</div>
);

const DescriptionContainer = ({ desc }: { desc: string }) => (
  <div className="flex items-center">{desc}</div>
);

const OwnersButton = ({
  state,
  setState,
  Owners,
}: {
  state: boolean;
  setState: Function;
  Owners: CharCardData[];
}) => (
  <div>
    <button className="btn w-fit" onClick={() => setState(!state)}>
      {state
        ? Owners.length > 1
          ? "Hide Owners"
          : "Hide Owner"
        : Owners.length > 1
        ? "Show Owners"
        : "Show Owner"}
    </button>
  </div>
);

export const AchieveItem = ({
  data,
  index,
  query,
  publicCount,
}: AchieveItemProps) => {
  const { Count, Owners } = data;
  const { Name, Icon, Description } = data.Data;
  const [showOwner, setShowOwner] = useState<boolean>(false);

  return (
    <div className="grid gap-2 border-b border-neutral-700 bg-neutral py-1 duration-300 hover:bg-base-100">
      <div className="grid grid-cols-[2rem_3rem_4rem_.4fr_1fr_140px] grid-rows-1 gap-2">
        <Placement Index={index} />
        <IconContainer Name={Name} Icon={Icon} />
        <Counter Count={Count} publicCount={publicCount} />
        <NameContainer name={Name} />
        <DescriptionContainer desc={Description} />
        <OwnersButton
          state={showOwner}
          setState={setShowOwner}
          Owners={Owners}
        />
      </div>
      <OwnerList List={Owners} query={query} showOwner={showOwner} />
    </div>
  );
};
