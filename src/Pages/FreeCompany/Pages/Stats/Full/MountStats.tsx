import { useStats } from "@/Contexts/StatsContext";
import { CollectibleData, CollectibleTypes } from "@/Types";
import "chart.js/auto";
import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";

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
  const { popularMount } = useStats();
  const [filter, setFilter] = useState<CollectibleTypes[]>(popularMount);
  const [query, setQuery] = useState<string>("");
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [CardTabIndex, setCardTabIndex] = useState<number>(0);

  const ShowChart = ({ data }: CollectibleList) => {
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
    const { Count, Owners } = data;
    const { Name, Icon } = data.Data;
    return (
      <div className="grid rounded-lg bg-base-100 p-4">
        <div className="flex">
          <img
            src={`http://xivapi.com${Icon}`}
            alt={Name}
            className="mask mask-squircle"
          />
          <h2 className="text-lg capitalize">{Name}</h2>
        </div>
      </div>
    );
  };

  const CollectibleCards = () => {
    return (
      <div className="mt-4 grid gap-4">
        <div className="tabs tabs-boxed flex w-fit items-center px-2">
          {CardTabs.map((tab, index) => (
            <button
              className={`tab ${index === CardTabIndex ? "tab-active" : ""}`}
              onClick={() => tab.Click(index)}
            >
              {tab.Name}
            </button>
          ))}
        </div>
        {filter.map((Collectible) => (
          <CollectibleCard data={Collectible} />
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

  const CardTabs = [
    {
      Name: "All",
      Click: (index: number) => {
        setCardTabIndex(index);
      },
    },
    {
      Name: "Main Story",
      Click: (index: number) => {
        setCardTabIndex(index);
      },
    },
    {
      Name: "Expansion",
      Click: (index: number) => {
        setCardTabIndex(index);
      },
    },
  ];

  useEffect(() => {
    if (query.length === 0) setFilter(popularMount);
    else
      setFilter(
        popularMount.filter((Collectible) =>
          Collectible.Data.Name.toLowerCase().includes(query.toLowerCase())
        )
      );
  }, [query]);

  return (
    <div className="grid">
      <div className="mt-4 flex w-full justify-between">
        <div className="tabs tabs-boxed flex items-center px-2">
          {Tabs.map((tab, index) => (
            <button
              className={`tab ${index === tabIndex ? "tab-active" : ""}`}
              onClick={() => tab.Click(index)}
            >
              {tab.Name}
            </button>
          ))}
        </div>
        <div className="form-control">
          <input
            value={query}
            type="text"
            placeholder="Search by Name"
            onChange={(e) => setQuery(e.target.value)}
            className="input-bordered input"
          />
        </div>
      </div>

      {Tabs[tabIndex].Content}
    </div>
  );
};
