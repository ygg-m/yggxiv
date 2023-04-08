import { useCharacter } from "@/Contexts/CharacterContext";
import { useGameData } from "@/Contexts/GameDataContext";
import { scrollToTop } from "@/Helpers";
import { CollectibleTreatedData } from "@/Types";
import { useMemo, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { CollectibleList } from "./CollectibleList";
import {
  emptyItem,
  filterByPatch,
  filterBySourceCheck,
  filterObtained,
  FullListCollectibleProps,
  getSources,
} from "./helpers";

export const Expansion = () => {
  const isDefaultPath = /Expansion/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[0]
  );

  scrollToTop(336);

  return (
    <section className="grid gap-4">
      <SubTabs isDefaultPath={isDefaultPath} />
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

const FullListCollectible = ({ List, FullList }: FullListCollectibleProps) => {
  const FalseList = !List[0]?.Data.Name || !FullList[0]?.Name;

  interface ExpansionProps {
    Patch: number;
    Name: string;
    Background: string;
  }

  const Expansion = ({ Patch, Name, Background }: ExpansionProps) => {
    const [listIndex, setListIndex] = useState(32);
    const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
    const [showOnlyObtained, setShowOnlyObtained] = useState<boolean>(true);
    const [showList, setShowList] = useState<boolean>(false);

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

    const Labels = () => (
      <>
        {" "}
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
        {sourceList.map((source) => {
          return <Label Filter={source} />;
        })}
      </>
    );

    return (
      <article className="grid rounded-lg outline outline-1 outline-gray-700 duration-100 hover:outline-primary">
        <div className="relative z-0 grid rounded-lg before:absolute before:-z-10 before:h-full before:w-full before:rounded-lg before:bg-neutral before:bg-opacity-50">
          <div
            className="flex w-full cursor-pointer flex-col justify-between p-4 text-white duration-100 hover:text-primary md:flex-row"
            onClick={() => setShowList(!showList)}
          >
            <h1 className="h-fit text-6xl font-black uppercase">{Name}</h1>
            <Count />
          </div>

          {showList ? (
            <div className="flex flex-wrap gap-2 px-4 pb-4">
              <Labels />
            </div>
          ) : null}

          <img
            src={Background}
            alt={`${Name} Background`}
            className="absolute -z-20 h-full w-full rounded-lg object-cover"
          />
        </div>

        {showList ? (
          <div className="p-4">
            <CollectibleList
              FilteredList={list.slice(0, listIndex)}
              ListLength={list.length}
              Index={listIndex}
              setIndex={setListIndex}
            />
          </div>
        ) : null}
      </article>
    );
  };

  return (
    <article className="grid gap-4">
      <Expansion
        Patch={2.0}
        Name="A Realm Reborn"
        Background="https://img.finalfantasyxiv.com/lds/h/l/QpExCxHkd7zpxqXK1cl4Uz8bJ8.jpg?_ga=2.18938430.781238313.1680968566-1091794286.1670936645"
      />
      <Expansion
        Patch={3.0}
        Name="Heavensward"
        Background="https://fr.web.img6.acsta.net/pictures/19/06/27/18/09/2256112.jpg"
      />
      <Expansion
        Patch={4.0}
        Name="Stormblood"
        Background="https://m.media-amazon.com/images/S/aplus-media/vc/b4076b75-fa48-44a8-a3cc-2b2bca53e91b.jpg"
      />
      <Expansion
        Patch={5.0}
        Name="Shadowbringers"
        Background="https://www.spaziogames.it/wp-content/uploads/2019/02/Final-Fantasy-XIV_2019_02-02-19_023.jpg"
      />
      <Expansion
        Patch={6.0}
        Name="Endwalker"
        Background="https://i.imgur.com/6Q3ZZHM.jpeg"
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
