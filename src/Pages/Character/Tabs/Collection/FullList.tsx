import { useCharacter } from "@/Contexts/CharacterContext";
import { useGameData } from "@/Contexts/GameDataContext";
import { CollectibleData } from "@/Types";
import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { SubTabs } from "./SubTabs";

interface CollectibleTreatedData {
  Obtained: boolean;
  Data: CollectibleData;
}

export const FullList = () => {
  const { Mounts, Minions } = useCharacter().char.Collection;

  const isDefaultPath = /FullList|Collection/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[0]
  );

  return (
    <section className="grid gap-2 rounded-t-lg">
      <SubTabs isDefaultPath={isDefaultPath} />
      <Outlet />
      {isDefaultPath ? <MountList /> : null}
    </section>
  );
};

interface ItemProps {
  Obtained: boolean;
  Data: CollectibleData;
}

function createCollectibleList(
  ownedList: CollectibleData[],
  fullList: CollectibleData[]
): CollectibleTreatedData[] {
  return fullList.map((e: CollectibleData) => {
    return {
      Obtained: ownedList.some(
        (a) => a.Name.toLowerCase() === e.Name.toLowerCase()
      ),
      Data: e,
    };
  });
}

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

export const Item = ({ Data, Obtained }: ItemProps) => {
  if (!Data) return null;

  const { Icon, Name, Portrait } = Data;
  // const { Patch, Sources } = data.Data.FFXIVCollectData;

  return Obtained ? (
    <div className="grid place-items-center gap-2 rounded-lg bg-base-300 p-2 duration-100  hover:bg-base-100 hover:saturate-150">
      <img src={Portrait} alt={Name} className="aspect-square" />
      <h4 className="text-center">{Name}</h4>
    </div>
  ) : (
    <div className="grid place-items-center gap-2 rounded-lg bg-base-300 p-2 opacity-30  duration-100 hover:bg-base-100 hover:opacity-70">
      <img src={Portrait} alt={Name} className="grayscale-50 aspect-square" />
      <h4 className="text-center">{Name}</h4>
    </div>
  );
};

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

export const MountList = () => {
  const { Mounts } = useCharacter().char.Collection;
  const { mounts } = useGameData();

  const FalseList = !Mounts[0]?.Name || !mounts[0]?.Name;

  const [listIndex, setListIndex] = useState(32);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [showOnlyObtained, setShowOnlyObtained] = useState<boolean>(true);

  const list = useMemo<CollectibleTreatedData[]>(
    () =>
      !FalseList
        ? showOnlyObtained
          ? filterBySourceCheck(
              filterObtained(createCollectibleList(Mounts, mounts)),
              checkedKeys
            )
          : filterBySourceCheck(
              createCollectibleList(Mounts, mounts),
              checkedKeys
            )
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
      filterObtained(createCollectibleList(Mounts, mounts)),
      checkedKeys
    ).length;

    const totalCount = filterBySourceCheck(
      createCollectibleList(Mounts, mounts),
      checkedKeys
    ).length;

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
            <span className="label-text text-primary">Only Obtained</span>
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

      <div className="grid grid-cols-4 gap-2 lg:grid-cols-7 xl:grid-cols-8">
        {list.slice(0, listIndex).map((Collectible) => {
          const { Obtained, Data } = Collectible;
          return <Item key={uuid()} Data={Data} Obtained={Obtained} />;
        })}
      </div>

      {list.length > listIndex ? (
        <button
          className="btn-primary btn"
          onClick={() => setListIndex(listIndex + 32)}
        >
          Show More
        </button>
      ) : null}
    </article>
  );
};

export const MinionList = () => {
  const { Minions } = useCharacter().char.Collection;
  const { minions } = useGameData();

  const FalseList = !Minions[0]?.Name || !minions[0]?.Name;

  const [listIndex, setListIndex] = useState(32);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [showOnlyObtained, setShowOnlyObtained] = useState<boolean>(true);

  const list = useMemo<CollectibleTreatedData[]>(
    () =>
      !FalseList
        ? showOnlyObtained
          ? filterBySourceCheck(
              filterObtained(createCollectibleList(Minions, minions)),
              checkedKeys
            )
          : filterBySourceCheck(
              createCollectibleList(Minions, minions),
              checkedKeys
            )
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
      filterObtained(createCollectibleList(Minions, minions)),
      checkedKeys
    ).length;

    const totalCount = filterBySourceCheck(
      createCollectibleList(Minions, minions),
      checkedKeys
    ).length;

    const percentage = Math.floor((ownedCount / totalCount) * 100);

    return (
      <h2 className="flex w-fit gap-4 rounded-lg bg-base-200 p-2 px-4 text-gray-400">
        <div className="flex gap-1">
          <span className="text-primary">{ownedCount}</span>
          <span>of</span>
          <span>{totalCount}</span>
          <span>({percentage}%)</span>
        </div>
        {/* <span className="text-accent">Obtainable Minions.</span> */}
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
            <span className="label-text text-primary">Only Obtained</span>
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

      <div className="grid grid-cols-4 gap-2 lg:grid-cols-7 xl:grid-cols-8">
        {list.slice(0, listIndex).map((Collectible) => {
          const { Obtained, Data } = Collectible;
          return <Item key={uuid()} Data={Data} Obtained={Obtained} />;
        })}
      </div>

      {list.length > listIndex ? (
        <button
          className="btn-primary btn"
          onClick={() => setListIndex(listIndex + 32)}
        >
          Show More
        </button>
      ) : null}
    </article>
  );
};
