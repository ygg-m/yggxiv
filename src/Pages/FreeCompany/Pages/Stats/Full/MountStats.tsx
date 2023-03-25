import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import { useStats } from "@/Contexts/StatsContext";
import { reverseArray } from "@/Helpers/reverseArray";
import { CollectibleData, CollectibleTypes } from "@/Types";
import "chart.js/auto";
import { useEffect, useMemo, useState } from "react";
import { Chart } from "react-chartjs-2";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface CollectibleList {
  data: CollectibleTypes[];
}

function capitalizeText(str: string) {
  const split = str.split(" ");
  const capitalize = split.map((s) => s.charAt(0).toUpperCase() + s.slice(1));
  const result = capitalize.join(" ");

  return result;
}

export const MountStats = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/").reverse()[0];

  const { popularMount } = useStats();
  const [filter, setFilter] = useState<CollectibleTypes[]>(popularMount);
  const [sourceFilter, setSourceFilter] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [sourceTabIndex, setSourceTabIndex] = useState<number>(0);
  const filterRarest = useMemo<boolean>(
    () => (currentPath === "Rarest" ? true : false),
    [currentPath]
  );

  const ShowChart = ({ data }: CollectibleList) => {
    data.forEach((el) => {
      if (typeof el.Data.Name === "undefined") console.log(el);
    });

    const NameList = data.map((Collectible) =>
      capitalizeText(Collectible.Data.Name)
    );
    const dataValues = data.map((Collectible) => Collectible.Count);

    const treatedData = {
      labels: NameList,
      indexAxis: "y",
      datasets: [
        {
          label: "Total",
          backgroundColor: "#2A303C",
          borderColor: "#222731",
          borderWidth: 3,
          data: dataValues,
        },
      ],
    };

    const options = {
      indexAxis: "y" as const,
      scales: {
        y: {
          stacked: true,
          grid: {
            display: true,
            color: "#222731",
          },
          ticks: {
            stepSize: 1,
          },
        },
        x: {
          stacked: true,
          grid: {
            display: false,
          },
        },
      },
      layout: {
        padding: {
          bottom: 60,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    const minHeight = 48;
    const height = 12 * data.length > 48 ? 12 * data.length : minHeight;

    return (
      <div className="w-full">
        <Chart
          type="bar"
          data={treatedData}
          options={options}
          height={height}
        />
      </div>
    );
  };

  interface CollectibleCardProps {
    data: CollectibleTypes;
  }

  const CollectibleCard = ({ data }: CollectibleCardProps) => {
    const {
      freeCompany: {
        FreeCompany: { ActiveMemberCount },
      },
    } = useFreeCompany();

    const { Count, Owners } = data;
    const { Name, Icon } = data.Data;

    const percentage = (Count / ActiveMemberCount) * 100;

    return (
      <div className="grid rounded-lg bg-base-100 p-4">
        <div className="flex items-center gap-4">
          <img
            src={`http://xivapi.com${Icon}`}
            alt={Name}
            className="mask mask-squircle"
          />

          <h3 className="w-[12rem] text-lg capitalize">{Name}</h3>

          <div className="flex flex-wrap rounded-lg bg-neutral p-2">
            {Owners.map((owner) => {
              const { Avatar, Name, ID } = owner.Character;
              return (
                <div
                  className="tooltip rounded-lg bg-transparent p-2 duration-300 hover:bg-base-200"
                  data-tip={Name}
                  key={uuidv4()}
                >
                  <img
                    src={Avatar}
                    alt={Name}
                    className="mask mask-squircle w-12"
                  />
                </div>
              );
            })}
          </div>

          <div className="grid place-items-center">
            <h2 className="flex items-center gap-2 text-3xl font-bold text-primary">
              {Count}
            </h2>
            <span className="text-lg font-normal text-neutral-content">
              {Count === 1 ? "Owner" : "Owners"}
            </span>
            <h3 className="opacity-80">
              (
              {percentage >= 1 ? Math.floor(percentage) : percentage.toFixed(1)}
              %)
            </h3>
          </div>
        </div>
      </div>
    );
  };

  const CollectibleCards = () => {
    return (
      <div className="mt-4 grid gap-4">
        {filter.map((Collectible) => (
          <CollectibleCard key={uuidv4()} data={Collectible} />
        ))}
      </div>
    );
  };

  const Tabs = [
    {
      Name: "Chart",
      Click: (index: number) => {
        setTabIndex(index);
      },
      Content: <ShowChart data={filter} />,
    },
    {
      Name: "Cards",
      Click: (index: number) => {
        setTabIndex(index);
      },
      Content: <CollectibleCards />,
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

  function filterByQuery(data: CollectibleTypes[]) {
    return data.filter((Collectible) =>
      Collectible.Data.Name.toLowerCase().includes(query.toLowerCase())
    );
  }

  function filterBySource(data: CollectibleTypes[]) {
    return data.filter((Collectible) =>
      Collectible.Data.FFXIVCollectData.Sources.find((el) =>
        sourceFilter.includes(el.type)
      )
    );
  }

  function filterList(arr: CollectibleTypes[]) {
    const isQueryEmpty = query.length === 0;
    const isSourceEmpty = sourceFilter.length === 0;

    const queryResult = filterByQuery(arr);
    const sourceResult = filterBySource(arr);

    const QueryOnly = !isQueryEmpty && isSourceEmpty;
    const SourceOnly = isQueryEmpty && !isSourceEmpty;
    const QueryAndSource = !isQueryEmpty && !isSourceEmpty;

    if (QueryOnly) return queryResult;
    if (QueryAndSource) return filterByQuery(sourceResult);
    if (SourceOnly) return sourceResult;
    else return arr;
  }

  useEffect(() => {
    const reverse = reverseArray(popularMount);
    if (filterRarest) setFilter(filterList(reverse));
    else setFilter(filterList(popularMount));
  }, [query, sourceFilter, filterRarest]);

  return (
    <div className="flex flex-col">
      <div className="mt-4 flex w-full justify-between">
        <div className="flex gap-2">
          <div className="tabs tabs-boxed">
            {Tabs.map((tab, index) => (
              <button
                className={`tab ${index === tabIndex ? "tab-active" : ""}`}
                onClick={() => tab.Click(index)}
                key={uuidv4()}
              >
                {tab.Name}
              </button>
            ))}
          </div>

          <div className="tabs tabs-boxed">
            <Link
              to="Popular"
              className={`tab ${!filterRarest ? "tab-active" : ""}`}
            >
              Popular
            </Link>
            <Link
              to="Rarest"
              className={`tab ${filterRarest ? "tab-active" : ""}`}
            >
              Rarest
            </Link>
          </div>
        </div>
        <div className="form-control">
          <input
            value={query}
            type="text"
            placeholder="Search by Name"
            onChange={(e) => setQuery(e.target.value)}
            className="input-bordered input h-[40px]"
          />
        </div>
      </div>
      <div className="tabs tabs-boxed mt-2 flex w-fit items-center px-2">
        {SourceTabs.map((tab, index) => (
          <button
            className={`tab ${index === sourceTabIndex ? "tab-active" : ""}`}
            onClick={() => tab.Click(index)}
            key={uuidv4()}
          >
            {tab.Name}
          </button>
        ))}
      </div>

      {Tabs[tabIndex].Content}
    </div>
  );
};
