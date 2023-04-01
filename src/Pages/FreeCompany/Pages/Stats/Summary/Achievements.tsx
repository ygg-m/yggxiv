import { ChevronRightIcon } from "@/Assets/Images/UI";
import { SimpleLoading } from "@/Components/LoadingComponents/SimpleLoading";
import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import { useStats } from "@/Contexts/StatsContext";
import { shuffleArray } from "@/Helpers";
import { AchievementsTypes } from "@/Types";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface AchievementProps {
  data: AchievementsTypes;
  showOwners?: boolean;
  showCount?: boolean;
}

interface RareAchievementProps {
  data: AchievementsTypes[];
}

const Achievement = ({ data, showOwners, showCount }: AchievementProps) => {
  const {
    freeCompany: {
      FreeCompany: { ActiveMemberCount },
    },
  } = useFreeCompany();

  if (!data.Data) return <SimpleLoading />;

  const { Count, Owners } = data;
  const { Name, Icon, Description } = data.Data;

  const percentage = Math.floor((Count / ActiveMemberCount) * 100);

  const MultipleOwners = () => {
    return (
      <div className="grid rounded-lg bg-neutral px-4 py-2">
        <span>Owners</span>
        <div className="grid grid-cols-3 place-items-center sm:grid-cols-8 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {Owners.map((owner) => {
            const { Name, Avatar } = owner;
            return (
              <div
                className="tooltip cursor-pointer rounded-lg p-2 duration-200 hover:bg-base-300"
                data-tip={Name}
                key={uuidv4()}
              >
                <img
                  src={Avatar}
                  alt={Name}
                  className="mask mask-squircle w-10"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const SingleOwner = () => {
    const { Name, Avatar } = Owners[0];

    return (
      <div className="flex flex-col items-center">
        <div className="divider m-0 mb-2"></div>
        <span className="opacity-70">Owner</span>
        <div className="grid cursor-pointer place-items-center gap-2 rounded-lg bg-transparent p-2 duration-200 hover:bg-neutral">
          <img src={Avatar} alt={Name} className="mask mask-squircle w-16" />
          <span className="text-center">{Name}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="relative grid gap-2 rounded-lg bg-base-200 p-4 duration-200 hover:bg-base-300">
      <div
        className="tooltip grid place-items-center justify-center gap-2 p-4"
        data-tip={Description}
      >
        <img
          src={`https://xivapi.com/${Icon}`}
          alt={Name}
          className="mask mask-squircle w-24"
        />
        <h4 className="text-center text-lg capitalize">{Name}</h4>
      </div>

      {showCount && (
        <div className="grid place-items-center">
          <span className="text-5xl font-bold text-primary">{Count}</span>
          <span className="opacity-70">owners ({percentage}%)</span>
        </div>
      )}

      {showOwners ? (
        Owners.length > 1 ? (
          <MultipleOwners />
        ) : (
          <SingleOwner />
        )
      ) : null}
    </div>
  );
};

const RarestAchievements = ({ data }: RareAchievementProps) => {
  const reverse = [...data].reverse().filter((e) => e.Data);
  const lowestNumberOfOwners = reverse[0]?.Count;
  const filter = reverse.filter((e) => e.Count === lowestNumberOfOwners);
  const shuffle = shuffleArray(filter);
  const top3 = shuffle.slice(0, 3);

  const emptyAchieve = {
    Count: 0,
    Data: {
      ID: 0,
      Name: "No Achievements",
      Group: "Legacy",
      Category: "Legacy",
      Icon: "/img-misc/lodestone/blog_avatar.jpg",
      Description: "Looks like NO ONE got ANY achievement in this Category...",
    },
    Owners: [],
  };

  if (filter.length === 0)
    return (
      <div className="grid min-h-[364px] gap-2">
        <div className="grid gap-6 md:grid-cols-3">
          <Achievement key={uuidv4()} data={emptyAchieve} />
        </div>
      </div>
    );

  return (
    <div className="grid min-h-[364px] gap-2">
      <div className="grid gap-6 md:grid-cols-3">
        {top3.map((achieve) => (
          <Achievement key={uuidv4()} data={achieve} showOwners />
        ))}
      </div>
    </div>
  );
};

export const Achievements = () => {
  const { rareAchievement } = useStats();
  const { MembersFullData } = useFreeCompany();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [filter, setFilter] = useState(rareAchievement);

  let publicAchievement: number = 0;
  MembersFullData.forEach(
    (member) => member.Achievements.List.length > 0 && publicAchievement++
  );

  const location = useLocation();
  const currentFC = location.pathname.split("/")[2];
  const FullViewPath = `/FreeCompany/${currentFC}/Stats/Achievement`;

  const GroupTabs = [
    {
      Name: "Battle",
      Click: (index: number) => {
        setTabIndex(index);
        setFilter(rareAchievement.filter((ac) => ac.Data.Group === "Battle"));
      },
    },
    {
      Name: "PvP",
      Click: (index: number) => {
        setTabIndex(index);
        setFilter(rareAchievement.filter((ac) => ac.Data.Group === "PvP"));
      },
    },
    {
      Name: "Character",
      Click: (index: number) => {
        setTabIndex(index);
        setFilter(
          rareAchievement.filter((ac) => ac.Data.Group === "Character")
        );
      },
    },
    {
      Name: "Items",
      Click: (index: number) => {
        setTabIndex(index);
        setFilter(rareAchievement.filter((ac) => ac.Data.Group === "Items"));
      },
    },
    {
      Name: "Crafting & Gathering",
      Click: (index: number) => {
        setTabIndex(index);
        setFilter(
          rareAchievement.filter(
            (ac) => ac.Data.Group === "Crafting & Gathering"
          )
        );
      },
    },
    {
      Name: "Quests",
      Click: (index: number) => {
        setTabIndex(index);
        setFilter(rareAchievement.filter((ac) => ac.Data.Group === "Quests"));
      },
    },
    {
      Name: "Exploration",
      Click: (index: number) => {
        setTabIndex(index);
        setFilter(
          rareAchievement.filter((ac) => ac.Data.Group === "Exploration")
        );
      },
    },
    {
      Name: "Grand Company",
      Click: (index: number) => {
        setTabIndex(index);
        setFilter(
          rareAchievement.filter((ac) => ac.Data.Group === "Grand Company")
        );
      },
    },
    {
      Name: "Legacy",
      Click: (index: number) => {
        setTabIndex(index);
        setFilter(rareAchievement.filter((ac) => ac.Data.Group === "Legacy"));
      },
    },
  ];

  const NavTab = () => {
    return (
      <div>
        <div className="tabs tabs-boxed mb-4 p-2">
          {GroupTabs.map((tab, index) => (
            <button
              className={`tab ${tabIndex === index ? "tab-active" : ""}`}
              key={uuidv4()}
              onClick={() => tab.Click(index)}
            >
              {tab.Name}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-lg p-8">
      <h2 className="text-3xl font-bold">Achievement</h2>
      <h4>
        Using data of{" "}
        <span className="text-accent">{publicAchievement} characters</span> that
        made their Achievements Public.
      </h4>
      <div className="divider"></div>
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl">Rarest Achievements</h2>
        <Link to={FullViewPath} className="btn-primary btn gap-2">
          See full List <ChevronRightIcon className="w-2" />
        </Link>
      </div>
      <NavTab />
      <RarestAchievements data={filter} />
    </div>
  );
};
