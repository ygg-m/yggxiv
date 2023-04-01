import { CollectibleChart } from "@/Pages/FreeCompany/Components/CollectibleList/Chart";
import { List } from "@/Pages/FreeCompany/Components/CollectibleList/List";
import { CollectibleTypes } from "@/Types";
import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { filterList } from "../Helpers/collectibleFilters";

export const CollectibleStats = ({ data }: { data: CollectibleTypes[] }) => {
  const isRarest = useLocation().pathname.split("/").reverse()[0] === "Rarest";

  const [sourceFilter, setSourceFilter] = useState<string[]>([]);
  const [sourceTabIndex, setSourceTabIndex] = useState<number>(0);

  const [collectibleQuery, setCollectibleQuery] = useState<string>("");
  const [characterQuery, setCharacterQuery] = useState<string>("");

  const [tabIndex, setTabIndex] = useState<number>(0);

  const filter = useMemo(
    () => filterList(data, characterQuery, collectibleQuery, sourceFilter),
    [collectibleQuery, characterQuery, sourceFilter, data]
  );

  const Tabs = [
    {
      Name: "Cards",
      Click: (index: number) => {
        setTabIndex(index);
      },
      Content: <List data={filter} query={characterQuery} />,
    },
    {
      Name: "Chart",
      Click: (index: number) => {
        setTabIndex(index);
      },
      Content: <CollectibleChart data={filter} />,
    },
  ];

  const SourceTabs = [
    {
      Name: "All",
      Click: (index: number) => {
        setSourceTabIndex(index);
        setSourceFilter([]);
      },
    },
    {
      Name: "Quest",
      Click: (index: number) => {
        setSourceTabIndex(index);
        setSourceFilter(["Quest"]);
      },
    },
    {
      Name: "Premium",
      Click: (index: number) => {
        setSourceTabIndex(index);
        setSourceFilter(["Premium"]);
      },
    },
    {
      Name: "Trial",
      Click: (index: number) => {
        setSourceTabIndex(index);
        setSourceFilter(["Trial"]);
      },
    },
    {
      Name: "Raid",
      Click: (index: number) => {
        setSourceTabIndex(index);
        setSourceFilter(["Raid"]);
      },
    },
  ];

  const TabNav = () => (
    <div className="tabs tabs-boxed w-full sm:w-fit">
      {Tabs.map((tab, index) => (
        <button
          className={`tab w-1/2 sm:w-fit ${
            index === tabIndex ? "tab-active" : ""
          }`}
          onClick={() => tab.Click(index)}
          key={uuidv4()}
        >
          {tab.Name}
        </button>
      ))}
    </div>
  );

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
          {/* <TabNav /> */}
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
              placeholder="Seach Collectible"
              onChange={(e) => setCollectibleQuery(e.target.value)}
              className="input-bordered input h-[40px]"
            />
          </div>
        </div>
      </div>
      <SourceNav />

      {Tabs[tabIndex].Content}
    </div>
  );
};
