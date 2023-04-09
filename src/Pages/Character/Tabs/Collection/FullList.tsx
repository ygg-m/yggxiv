import { useCharacter } from "@/Contexts/CharacterContext";
import { useGameData } from "@/Contexts/GameDataContext";
import { scrollToTop } from "@/Helpers";
import { CollectibleData, CollectibleTreatedData } from "@/Types";
import { useMemo, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { CollectibleList } from "./CollectibleList";
import {
  emptyItem,
  filterBySourceCheck,
  filterObtained,
  FullListCollectibleProps,
  getSources,
} from "./helpers";

export const FullList = () => {
  const isDefaultPath = /Collection/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[0]
  );

  const isMainPath = /FullList/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[0]
  );

  scrollToTop(336);

  return (
    <section className="grid gap-2 rounded-t-lg">
      <SubTabs isDefaultPath={isDefaultPath} isMainPath={isMainPath} />
      <Outlet />
      {isDefaultPath || isMainPath ? <MountList /> : null}
    </section>
  );
};

const SubTabs = ({
  isDefaultPath,
  isMainPath,
}: {
  isDefaultPath: boolean;
  isMainPath?: boolean;
}) => {
  return (
    <nav className="tabs tabs-boxed grid h-fit w-fit rounded-lg bg-base-100 p-1 md:grid-cols-2">
      <NavLink
        to={isDefaultPath ? "FullList/Mounts" : "Mounts"}
        key={uuid()}
        className={({ isActive }) =>
          isActive || isDefaultPath || isMainPath
            ? "tab-lifted tab tab-active duration-100"
            : "tab-lifted tab duration-100"
        }
      >
        Mounts
      </NavLink>
      <NavLink
        to={isDefaultPath ? "FullList/Minions" : "Minions"}
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

const FullListCollectible = ({ List, FullList }: FullListCollectibleProps) => {
  const FalseList = !List[0]?.Data.Name || !FullList[0]?.Name;

  const [listIndex, setListIndex] = useState(32);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [showOnlyObtained, setShowOnlyObtained] = useState<boolean>(true);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const sourceList = getSources(List);

  const list = useMemo<CollectibleTreatedData[]>(
    () =>
      !FalseList
        ? showOnlyObtained
          ? filterBySourceCheck(filterObtained(List), checkedKeys)
          : filterBySourceCheck(List, checkedKeys)
        : emptyItem,
    [listIndex, checkedKeys, showOnlyObtained, FalseList]
  );

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

    const ownedCount = filterBySourceCheck(
      filterObtained(List),
      checkedKeys
    ).length;

    const totalCount = filterBySourceCheck(List, checkedKeys).length;

    const percentage = Math.floor((ownedCount / totalCount) * 100);

    return (
      <h2 className="flex w-fit gap-4 rounded-lg bg-base-200 p-2 px-4 text-gray-400">
        <div className="flex gap-1">
          <span className="text-primary">{ownedCount}</span>
          <span>of</span>
          <span>{totalCount}</span>
          <span>({percentage}%)</span>
        </div>
        {/* <span className="text-accent">Obtainable Mounts.</span> */}
      </h2>
    );
  };

  const Label = ({ Filter }: { Filter: string }) => (
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

  return (
    <article className="grid gap-2">
      <div className="flex flex-wrap gap-2">
        <Count />

        <div className="form-control">
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
        </div>

        <div className="dropdown dropdown-hover">
          <label
            tabIndex={0}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-base-100 p-2 px-4 capitalize duration-100 hover:bg-primary hover:text-neutral"
            onClick={() => setOpenDropdown(!openDropdown)}
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
            Filter by Sources
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box max-h-[70vh] w-52 flex-nowrap overflow-auto bg-base-300 p-2 shadow outline outline-1 outline-gray-600"
          >
            {sourceList.map((source) => {
              return <Label key={uuid()} Filter={source} />;
            })}
          </ul>
        </div>
      </div>

      <CollectibleList
        FilteredList={list.slice(0, listIndex)}
        ListLength={list.length}
        Index={listIndex}
        setIndex={setListIndex}
      />
    </article>
  );
};

export const MountList = () => {
  const { Mounts } = useCharacter().char.Collection;
  const { mounts } = useGameData();

  return <FullListCollectible List={Mounts} FullList={mounts} />;
};

export const MinionList = () => {
  const { Minions } = useCharacter().char.Collection;
  const { minions } = useGameData();

  return <FullListCollectible List={Minions} FullList={minions} />;
};
