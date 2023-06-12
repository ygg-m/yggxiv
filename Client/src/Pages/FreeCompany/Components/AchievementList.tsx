import { AchieveList } from "@/Pages/FreeCompany/Components/CollectibleList/AchieveList";
import { AchievementsTypes } from "@/Types";
import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { filterList } from "../Pages/Stats/Helpers/achievementFilters";

export const AchievementList = ({
  data,
  publicCount,
}: {
  data: AchievementsTypes[];
  publicCount: number;
}) => {
  const isRarest = useLocation().pathname.split("/").reverse()[0] === "Rarest";

  const [sourceFilter, setSourceFilter] = useState<string>("");
  const [sourceTabIndex, setSourceTabIndex] = useState<number>(0);

  const [collectibleQuery, setCollectibleQuery] = useState<string>("");
  const [characterQuery, setCharacterQuery] = useState<string>("");

  const filter = useMemo(
    () => filterList(data, characterQuery, collectibleQuery, sourceFilter),
    [collectibleQuery, characterQuery, sourceFilter, data]
  );

  const SourceTabs = [
    {
      Name: "All",
      Click: (index: number) => {
        setSourceTabIndex(index);
        setSourceFilter("");
      },
    },
    {
      Name: "Battle",
      Click: (index: number) => {
        setSourceTabIndex(index);
        setSourceFilter("Battle");
      },
    },
    {
      Name: "PvP",
      Click: (index: number) => {
        setSourceTabIndex(index);
        setSourceFilter("PvP");
      },
    },
    {
      Name: "Character",
      Click: (index: number) => {
        setSourceTabIndex(index);
        setSourceFilter("Character");
      },
    },
    {
      Name: "Items",
      Click: (index: number) => {
        setSourceTabIndex(index);
        setSourceFilter("Items");
      },
    },
    {
      Name: "Crafting & Gathering",
      Click: (index: number) => {
        setSourceTabIndex(index);
        setSourceFilter("Crafting & Gathering");
      },
    },
    {
      Name: "Quests",
      Click: (index: number) => {
        setSourceTabIndex(index);
        setSourceFilter("Quests");
      },
    },
    {
      Name: "Exploration",
      Click: (index: number) => {
        setSourceTabIndex(index);
        setSourceFilter("Exploration");
      },
    },
    {
      Name: "Grand Company",
      Click: (index: number) => {
        setSourceTabIndex(index);
        setSourceFilter("Grand Company");
      },
    },
    {
      Name: "Legacy",
      Click: (index: number) => {
        setSourceTabIndex(index);
        setSourceFilter("Legacy");
      },
    },
  ];

  const RareNav = () => (
    <div className="tabs tabs-boxed w-full sm:w-fit">
      <Link
        to="Popular"
        className={`tab w-1/2 sm:w-fit ${!isRarest ? "tab-active" : ""}`}
      >
        Popular
      </Link>
      <Link
        to="Rarest"
        className={`tab w-1/2 sm:w-fit ${isRarest ? "tab-active" : ""}`}
      >
        Rarest
      </Link>
    </div>
  );

  const SourceNav = () => (
    <div className="tabs tabs-boxed mt-2 flex items-center px-2 sm:w-fit">
      {SourceTabs.map((tab, index) => (
        <button
          className={`tab w-1/5 sm:w-fit ${
            index === sourceTabIndex ? "tab-active" : ""
          }`}
          onClick={() => tab.Click(index)}
          key={uuidv4()}
        >
          {tab.Name}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col">
      <div className="mt-4 flex w-full flex-col justify-between gap-2 sm:flex-row">
        <div className="flex gap-2">
          <RareNav />
        </div>
        <div className="flex gap-2">
          <div className="form-control -order-1 sm:order-1">
            <input
              value={characterQuery}
              type="text"
              placeholder="Search Character"
              onChange={(e) => setCharacterQuery(e.target.value)}
              className="input-bordered input h-[40px]"
            />
          </div>

          <div className="form-control -order-1 sm:order-1">
            <input
              value={collectibleQuery}
              type="text"
              placeholder="Seach Achievement"
              onChange={(e) => setCollectibleQuery(e.target.value)}
              className="input-bordered input h-[40px]"
            />
          </div>
        </div>
      </div>
      <SourceNav />
      <AchieveList
        data={filter}
        query={characterQuery}
        publicCount={publicCount}
      />
    </div>
  );
};
