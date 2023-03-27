import { PlusIcon } from "@/Assets/Images/UI";
import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import { useStats } from "@/Contexts/StatsContext";
import { reverseArray } from "@/Helpers/reverseArray";
import { CollectibleData, CollectibleTypes } from "@/Types";
import "chart.js/auto";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const [collectibleQuery, setCollectibleQuery] = useState<string>("");
  const [characterQuery, setCharacterQuery] = useState<string>("");
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

  interface CollectibleItemListProps {
    data: CollectibleTypes;
    index: number;
  }

  const CollectibleItemList = ({ data, index }: CollectibleItemListProps) => {
    const {
      freeCompany: {
        FreeCompany: { ActiveMemberCount },
      },
    } = useFreeCompany();

    const { Count, Owners } = data;
    const { Name, Icon } = data.Data;

    const percentage = (Count / ActiveMemberCount) * 100;

    const Placement = () => (
      <div className="col-span-1 grid place-items-center">{index + 1}</div>
    );

    const CollectableIcon = () => (
      <div className="col-span-1">
        <img
          src={`http://xivapi.com${Icon}`}
          alt={Name}
          className="mask mask-squircle w-12"
        />
      </div>
    );

    const Counter = () => (
      <div
        className="tooltip col-span-1 grid cursor-default place-items-center rounded-lg text-primary duration-300 hover:bg-base-300"
        data-tip={`${
          percentage > 1 ? Math.floor(percentage) : percentage.toFixed(1)
        }%`}
      >
        <div>{Count}</div>
      </div>
    );

    const CollectableName = () => (
      <div className="col-span-1 grid items-center capitalize">{Name}</div>
    );

    const OwnerList = () => {
      const [indexes, setIndexes] = useState(0);
      const list = useMemo(() => Owners.slice(0, indexes), [Owners, indexes]);
      const divRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        if (divRef.current) {
          const newSize = Math.floor(divRef.current.offsetWidth / 40);
          setIndexes(newSize);
        }

        const handleResize = () => {
          if (divRef.current) {
            const newSize = Math.floor(divRef.current.offsetWidth / 40);

            setIndexes(newSize);
          }
        };

        window.addEventListener("resize", handleResize);

        // Cleanup function to remove event listener
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, [divRef]);

      const OwnerItem = ({ data }: any) => {
        const { Avatar, Name, ID } = data.Character;
        return (
          <Link
            to={`Character/ID`}
            className="tooltip z-10 rounded-lg p-1 duration-300 hover:bg-neutral"
            data-tip={Name}
          >
            <img src={Avatar} alt={Name} className="mask mask-squircle w-8" />
          </Link>
        );
      };

      const OwnerCard = ({ data }: any) => {
        const { Avatar, Name, ID } = data.Character;

        const SplitName = Name.split(" ");

        return (
          <Link
            to={`Character/ID`}
            className="grid place-items-center rounded-lg p-2 text-center duration-300 hover:bg-neutral"
          >
            <img src={Avatar} alt={Name} className="mask mask-squircle w-12" />
            <span>{SplitName[0]}</span>
            <span>{SplitName[1]}</span>
          </Link>
        );
      };

      const Modal = () => {
        const SeeAllButton = () => (
          <label
            htmlFor={`MountModal-${index}`}
            className="duration mx-4 w-16 cursor-pointer rounded-lg bg-base-100 p-2 text-center text-sm hover:bg-base-300"
          >
            See all
          </label>
        );

        const OwnerList = () => (
          <div className="grid grid-cols-4 items-center gap-2">
            {Owners.map((Owner) => (
              <OwnerCard key={uuidv4()} data={Owner} />
            ))}
          </div>
        );

        const CloseButton = () => (
          <label
            htmlFor={`MountModal-${index}`}
            className="btn-secondary btn-circle btn-lg btn fixed right-2 top-2"
          >
            ✕
          </label>
        );

        return (
          <>
            <SeeAllButton />
            <input
              type="checkbox"
              id={`MountModal-${index}`}
              className="modal-toggle"
            />

            <div className="modal">
              <div className="modal-box">
                <OwnerList />
              </div>
              <CloseButton />
            </div>
          </>
        );
      };

      return (
        <div
          className="col-span-1 flex items-center justify-between"
          ref={divRef}
        >
          <div className="flex items-center">
            {list.map((Owner) => (
              <OwnerItem key={uuidv4()} data={Owner} />
            ))}
          </div>
          {Owners.length > indexes ? <Modal /> : null}
        </div>
      );
    };

    return (
      <div className="grid grid-cols-[2rem_3rem_4rem_.25fr_1fr] grid-rows-1 gap-2 border-b border-neutral-700 bg-neutral py-1 duration-300 hover:bg-base-100">
        <Placement />
        <CollectableIcon />
        <Counter />
        <CollectableName />
        <OwnerList />
      </div>
    );
  };

  const CollectibleList = () => {
    const [indexes, setIndexes] = useState(10);
    const list = useMemo(() => filter.slice(0, indexes), [filter, indexes]);

    useEffect(() => {
      setIndexes(10);
    }, [filter]);

    return (
      <div className="mt-2 grid gap-4 rounded-t-lg">
        <div className="rounded-lg outline outline-1 outline-neutral-700">
          <div className="grid grid-cols-[2rem_3rem_4rem_.25fr_1fr] grid-rows-1 gap-2 border-b border-neutral-700 py-2">
            <div className="col-span-1 grid place-items-center opacity-70">
              #
            </div>
            <div className="col-span-1 text-sm opacity-70"></div>
            <div className="col-span-1 text-sm opacity-70">Count</div>
            <div className="col-span-1 text-sm opacity-70">Name</div>
            <div className="col-span-1 text-sm opacity-70">Owners</div>
          </div>

          <div className="grid rounded-b-lg">
            {list.map((Collectible, index) => (
              <CollectibleItemList
                key={uuidv4()}
                data={Collectible}
                index={index}
              />
            ))}
          </div>
        </div>

        {filter.length > indexes ? (
          <button
            className="btn-secondary btn w-full"
            onClick={() => setIndexes(indexes + 10)}
          >
            Show More
          </button>
        ) : null}
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
      Content: <CollectibleList />,
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

  function filterByCollectQuery(data: CollectibleTypes[]) {
    return data.filter((Collectible) =>
      Collectible.Data.Name.toLowerCase().includes(
        collectibleQuery.toLowerCase()
      )
    );
  }

  function filterByCharQuery(data: CollectibleTypes[]) {
    if (characterQuery.length === 0) return data;

    return data.filter((Collectible) =>
      Collectible.Owners.some((owner) =>
        owner.Character.Name.toLowerCase().includes(
          characterQuery.toLowerCase()
        )
      )
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
    const isQueryEmpty = collectibleQuery.length === 0;
    const isSourceEmpty = sourceFilter.length === 0;

    const queryResult = filterByCharQuery(filterByCollectQuery(arr));
    const sourceResult = filterByCharQuery(filterBySource(arr));

    const QueryOnly = !isQueryEmpty && isSourceEmpty;
    const SourceOnly = isQueryEmpty && !isSourceEmpty;
    const QueryAndSource = !isQueryEmpty && !isSourceEmpty;

    if (QueryOnly) return queryResult;
    if (QueryAndSource) return filterByCollectQuery(sourceResult);
    if (SourceOnly) return sourceResult;
    else return arr;
  }

  useEffect(() => {
    const reverse = reverseArray(popularMount);
    if (filterRarest) setFilter(filterList(reverse));
    else setFilter(filterList(popularMount));
  }, [collectibleQuery, characterQuery, sourceFilter, filterRarest]);

  return (
    <div className="flex flex-col">
      <div className="mt-4 flex w-full flex-col justify-between gap-2 sm:flex-row">
        <div className="flex gap-2">
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

          <div className="tabs tabs-boxed w-full sm:w-fit">
            <Link
              to="Popular"
              className={`tab w-1/2 sm:w-fit ${
                !filterRarest ? "tab-active" : ""
              }`}
            >
              Popular
            </Link>
            <Link
              to="Rarest"
              className={`tab w-1/2 sm:w-fit ${
                filterRarest ? "tab-active" : ""
              }`}
            >
              Rarest
            </Link>
          </div>
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
              placeholder="Seach Mount"
              onChange={(e) => setCollectibleQuery(e.target.value)}
              className="input-bordered input h-[40px]"
            />
          </div>
        </div>
      </div>
      <div className="tabs tabs-boxed mt-2 flex items-center px-2 sm:w-fit">
        {SourceTabs.map((tab, index) => (
          <button
            className={`tab w-1/5 ${
              index === sourceTabIndex ? "tab-active" : ""
            }`}
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
