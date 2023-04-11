import { useCharacter } from "@/Contexts/CharacterContext";
import { useGameData } from "@/Contexts/GameDataContext";
import { scrollToTop } from "@/Helpers";
import { CollectibleTreatedData } from "@/Types";
import { useMemo, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { ExpansionCard } from "../../Components/ExpansionCard";
import { CollectibleList } from "./CollectibleList";
import {
  emptyItem,
  filterByPatch,
  filterBySourceCheck,
  filterObtained,
  getSources,
} from "./helpers";

import BackgroundARR from "@/Assets/Images/Expansions/A Realm Reborn.jpg";
import BackgroundEW from "@/Assets/Images/Expansions/Endwalker.jpg";
import BackgroundHW from "@/Assets/Images/Expansions/Heavensward.jpg";
import BackgroundSHB from "@/Assets/Images/Expansions/Shadowbringers.jpg";
import BackgroundSB from "@/Assets/Images/Expansions/Stormblood.jpg";

export const Expansion = () => {
  const isDefaultPath = /Expansion/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[0]
  );

  const isStrictDefaultPath = /Expansion|Mounts|Minions/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[0]
  );

  const LastPath = useLocation()
    .pathname.split("/")
    .filter((e) => e !== "")
    .reverse()[1];

  scrollToTop(336);

  return (
    <section className="grid gap-4">
      <div className="flex gap-2">
        <SubTabs isDefaultPath={isDefaultPath} />
        {isStrictDefaultPath ? null : (
          <Link
            to={`../Expansion/${LastPath}`}
            className="grid w-fit place-items-center rounded-lg bg-base-100 p-2 px-4 text-sm duration-100 hover:bg-primary hover:text-neutral"
          >
            Select Expansion
          </Link>
        )}
      </div>

      <Outlet />
      {isDefaultPath ? <MountList /> : null}
    </section>
  );
};

const SubTabs = ({ isDefaultPath }: { isDefaultPath: boolean }) => {
  return (
    <nav className="tabs tabs-boxed grid h-fit w-fit rounded-lg bg-base-100 p-1 md:grid-cols-2">
      <NavLink
        to="Mounts"
        key={uuid()}
        className={({ isActive }) =>
          isActive || isDefaultPath
            ? "tab-lifted tab tab-active duration-100"
            : "tab-lifted tab duration-100"
        }
      >
        Mounts
      </NavLink>
      <NavLink
        to="Minions"
        key={uuid()}
        className={({ isActive }) =>
          isActive
            ? "tab-lifted tab tab-active duration-100"
            : "tab-lifted tab duration-100"
        }
      >
        Minions
      </NavLink>
    </nav>
  );
};

const ExpansionList = ({ List }: { List: CollectibleTreatedData[] }) => {
  const isDefaultPath = /Expansion/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[0]
  );

  return (
    <section className="flex flex-col gap-4 lg:flex-row">
      <ExpansionCard
        Patch={2.0}
        Name="A Realm Reborn"
        Background={BackgroundARR}
        LinkURL={isDefaultPath ? "Mounts/ARealmReborn" : "ARealmReborn"}
        List={List}
      />
      <ExpansionCard
        Patch={3.0}
        Name="Heavensward"
        Background={BackgroundHW}
        LinkURL={isDefaultPath ? "Mounts/Heavensward" : "Heavensward"}
        List={List}
      />
      <ExpansionCard
        Patch={4.0}
        Name="Stormblood"
        Background={BackgroundSB}
        LinkURL={isDefaultPath ? "Mounts/Stormblood" : "Stormblood"}
        List={List}
      />
      <ExpansionCard
        Patch={5.0}
        Name="Shadowbringers"
        Background={BackgroundSHB}
        LinkURL={isDefaultPath ? "Mounts/Shadowbringers" : "Shadowbringers"}
        List={List}
      />
      <ExpansionCard
        Patch={6.0}
        Name="Endwalker"
        Background={BackgroundEW}
        LinkURL={isDefaultPath ? "Mounts/Endwalker" : "Endwalker"}
        List={List}
      />
    </section>
  );
};

export const MountList = () => {
  const { Mounts } = useCharacter().char.Collection;

  const isDefaultPath = /Mounts|Expansion/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[0]
  );

  return isDefaultPath ? <ExpansionList List={Mounts} /> : <Outlet />;
};

export const MinionList = () => {
  const { Minions } = useCharacter().char.Collection;

  const isDefaultPath = /Minions|Expansion/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[0]
  );

  return isDefaultPath ? <ExpansionList List={Minions} /> : <Outlet />;
};

interface ExpansionProps {
  Patch: number;
  Name: string;
  Background: string;
  FalseList: boolean;
  List: CollectibleTreatedData[];
}

const ShowExpansion = ({
  Patch,
  Name,
  Background,
  FalseList,
  List,
}: ExpansionProps) => {
  const [listIndex, setListIndex] = useState(32);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [showOnlyObtained, setShowOnlyObtained] = useState<boolean>(true);

  const list = useMemo<CollectibleTreatedData[]>(
    () =>
      !FalseList
        ? showOnlyObtained
          ? filterByPatch(
              filterBySourceCheck(filterObtained(List), checkedKeys),
              Patch
            )
          : filterByPatch(filterBySourceCheck(List, checkedKeys), Patch)
        : emptyItem,
    [listIndex, checkedKeys, showOnlyObtained, FalseList]
  );

  const Categories = getSources(
    List.filter(
      (e) =>
        parseFloat(e.Data.FFXIVCollectData.Patch) >= Patch &&
        parseFloat(e.Data.FFXIVCollectData.Patch) < Patch + 1
    )
  );

  const sourceList = getSources(filterByPatch(List, Patch));

  if (FalseList) return null;
  const changeCheckFilter = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    if (checked) setCheckedKeys([...checkedKeys, value]);
    else setCheckedKeys(checkedKeys.filter((key) => key !== value));
  };

  const Count = () => {
    if (FalseList) return null;

    const ownedCount = filterByPatch(
      filterBySourceCheck(filterObtained(List), checkedKeys),
      Patch
    ).length;

    const totalCount = filterByPatch(
      filterBySourceCheck(List, checkedKeys),
      Patch
    ).length;

    const percentage = Math.floor((ownedCount / totalCount) * 100);

    return (
      <h2 className="flex w-fit items-center gap-4 rounded-lg bg-base-200 p-2 px-4 text-gray-400 md:text-2xl">
        <div className="flex gap-1">
          <span className="text-primary">{ownedCount}</span>
          <span>of</span>
          <span>{totalCount}</span>
          <span>({percentage}%)</span>
        </div>
      </h2>
    );
  };

  interface LabelProps {
    Filter: string;
    checkedKeys: string[];
    setCheckedKeys: Function;
  }

  const Label = ({ Filter, checkedKeys, setCheckedKeys }: LabelProps) => {
    const changeCheckFilter = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const { value, checked } = event.target;

      if (checked) setCheckedKeys([...checkedKeys, value]);
      else setCheckedKeys(checkedKeys.filter((key) => key !== value));
    };

    return (
      <div className="form-control">
        <label className="label cursor-pointer gap-2 rounded-lg px-3">
          <span className="label-text">{Filter}</span>
          <input
            type="checkbox"
            className="checkbox"
            value={Filter}
            checked={checkedKeys.includes(Filter)}
            onChange={changeCheckFilter}
          />
        </label>
      </div>
    );
  };

  return (
    <article className="grid gap-4">
      <div className="relative z-0 grid rounded-lg outline outline-1 outline-gray-600 before:absolute before:-z-10 before:h-full before:w-full before:rounded-lg before:bg-neutral before:bg-opacity-50">
        <div className="flex w-full flex-col justify-between gap-4 p-4 text-white md:flex-row">
          <h1 className="h-fit text-xl uppercase italic sm:text-4xl md:text-3xl lg:text-4xl">
            {Name}
          </h1>
          <Count />
        </div>

        <div className="flex flex-wrap gap-2 px-4 pb-4">
          <label className="label cursor-pointer gap-2 rounded-lg bg-base-300 px-3">
            <span className="label-text text-primary">Obtained Only</span>
            <input
              type="checkbox"
              className="checkbox-primary checkbox"
              value={"Obtained"}
              checked={showOnlyObtained ? true : false}
              onChange={() => setShowOnlyObtained(!showOnlyObtained)}
            />
          </label>
          <div className="dropdown-hover dropdown">
            <label
              tabIndex={0}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-base-100 p-2 px-4 duration-100 hover:bg-primary hover:text-neutral"
            >
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 512 512"
              >
                <path d="M0 416c0-17.7 14.3-32 32-32l54.7 0c12.3-28.3 40.5-48 73.3-48s61 19.7 73.3 48L480 384c17.7 0 32 14.3 32 32s-14.3 32-32 32l-246.7 0c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48L32 448c-17.7 0-32-14.3-32-32zm192 0a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM384 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm-32-80c32.8 0 61 19.7 73.3 48l54.7 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-54.7 0c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l246.7 0c12.3-28.3 40.5-48 73.3-48zM192 64a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm73.3 0L480 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l-214.7 0c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48L32 128C14.3 128 0 113.7 0 96S14.3 64 32 64l86.7 0C131 35.7 159.2 16 192 16s61 19.7 73.3 48z" />
              </svg>
              Filter by Category
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box max-h-[70vh] w-52 flex-nowrap overflow-auto bg-base-300 p-2 shadow outline outline-1 outline-gray-600"
            >
              {Categories.map((source) => {
                return (
                  <Label
                    key={uuid()}
                    Filter={source}
                    checkedKeys={checkedKeys}
                    setCheckedKeys={setCheckedKeys}
                  />
                );
              })}
            </ul>
          </div>
        </div>

        <img
          src={Background}
          alt={`${Name} Background`}
          className="absolute -z-20 h-full w-full rounded-lg object-cover"
        />
      </div>

      <div className="p-4">
        <CollectibleList
          FilteredList={list.slice(0, listIndex)}
          ListLength={list.length}
          Index={listIndex}
          setIndex={setListIndex}
        />
      </div>
    </article>
  );
};

export const ARR = () => {
  const { Mounts, Minions } = useCharacter().char.Collection;
  const { mounts, minions } = useGameData();

  const isMounts = /Mounts/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[1]
  );

  const List = isMounts ? Mounts : Minions;
  const FullList = isMounts ? mounts : minions;

  const FalseList = !List[0]?.Data.Name || !FullList[0]?.Name;

  return (
    <ShowExpansion
      Patch={2.0}
      Name="A Realm Reborn"
      Background={BackgroundARR}
      FalseList={FalseList}
      List={List}
    />
  );
};

export const HW = () => {
  const { Mounts, Minions } = useCharacter().char.Collection;
  const { mounts, minions } = useGameData();

  const isMounts = /Mounts/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[1]
  );

  const List = isMounts ? Mounts : Minions;
  const FullList = isMounts ? mounts : minions;

  const FalseList = !List[0]?.Data.Name || !FullList[0]?.Name;

  return (
    <ShowExpansion
      Patch={3.0}
      Name="Heavensward"
      Background={BackgroundHW}
      FalseList={FalseList}
      List={List}
    />
  );
};

export const SB = () => {
  const { Mounts, Minions } = useCharacter().char.Collection;
  const { mounts, minions } = useGameData();

  const isMounts = /Mounts/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[1]
  );

  const List = isMounts ? Mounts : Minions;
  const FullList = isMounts ? mounts : minions;

  const FalseList = !List[0]?.Data.Name || !FullList[0]?.Name;

  return (
    <ShowExpansion
      Patch={4.0}
      Name="Stormblood"
      Background={BackgroundSB}
      FalseList={FalseList}
      List={List}
    />
  );
};

export const SHB = () => {
  const { Mounts, Minions } = useCharacter().char.Collection;
  const { mounts, minions } = useGameData();

  const isMounts = /Mounts/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[1]
  );

  const List = isMounts ? Mounts : Minions;
  const FullList = isMounts ? mounts : minions;

  const FalseList = !List[0]?.Data.Name || !FullList[0]?.Name;

  return (
    <ShowExpansion
      Patch={5.0}
      Name="Shadowbringers"
      Background={BackgroundSHB}
      FalseList={FalseList}
      List={List}
    />
  );
};

export const EW = () => {
  const { Mounts, Minions } = useCharacter().char.Collection;
  const { mounts, minions } = useGameData();

  const isMounts = /Mounts/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[1]
  );

  const List = isMounts ? Mounts : Minions;
  const FullList = isMounts ? mounts : minions;

  const FalseList = !List[0]?.Data.Name || !FullList[0]?.Name;

  return (
    <ShowExpansion
      Patch={6.0}
      Name="Endwalker"
      Background={BackgroundEW}
      FalseList={FalseList}
      List={List}
    />
  );
};
