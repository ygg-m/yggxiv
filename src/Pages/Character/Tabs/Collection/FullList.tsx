import { useCharacter } from "@/Contexts/CharacterContext";
import { useGameData } from "@/Contexts/GameDataContext";
import { scrollToTop } from "@/Helpers";
import { CollectibleData } from "@/Types";
import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { CollectibleList } from "./CollectibleList";
import { SubTabs } from "./SubTabs";

interface CollectibleTreatedData {
  Obtained: boolean;
  Data: CollectibleData;
}

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

function filterBySourceCheck(list: CollectibleTreatedData[], state: string[]) {
  return state.length > 0
    ? list.filter((mount: CollectibleTreatedData) =>
        mount.Data.FFXIVCollectData.Sources.some((e) => state.includes(e.type))
      )
    : list;
}

function filterObtained(list: CollectibleTreatedData[]) {
  return list.filter(
    (mount: CollectibleTreatedData) => mount.Obtained === true
  );
}

const emptyItem: CollectibleTreatedData[] = [
  {
    Obtained: false,
    Data: {
      ID: 0,
      Icon: "",
      Portrait: "",
      Name: "",
      FFXIVCollectData: {
        Id: 0,
        Patch: "",
        Seats: "",
        Tradeable: false,
        Owned: 0,
        Sources: [],
      },
    },
  },
];

interface FullListCollectibleProps {
  List: CollectibleTreatedData[];
  FullList: CollectibleData[];
}

const FullListCollectible = ({ List, FullList }: FullListCollectibleProps) => {
  const FalseList = !List[0]?.Data.Name || !FullList[0]?.Name;

  const [listIndex, setListIndex] = useState(32);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [showOnlyObtained, setShowOnlyObtained] = useState<boolean>(true);

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
      <label className="label cursor-pointer gap-2 rounded-lg bg-base-300 px-3">
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
      <div className="flex gap-2">
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

        <Label Filter="Premium" />
        <Label Filter="Limited" />
        <Label Filter="Event" />
        <Label Filter="Achievement" />
        <Label Filter="PvP" />
        <Label Filter="Trial" />
        <Label Filter="Raid" />
      </div>

      <CollectibleList
        FilteredList={list.slice(0, listIndex)}
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
