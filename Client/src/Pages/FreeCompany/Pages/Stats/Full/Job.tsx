import { useStats } from "@/Contexts/StatsContext";
import { jobData } from "@/Types";
import "chart.js/auto";
import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import { v4 as uuidv4 } from "uuid";

export const Job = () => {
  const { popularJobs } = useStats();
  const [filter, setFilter] = useState(popularJobs);
  const [RoleFilter, setRoleFilter] = useState<string[]>([
    "Tank",
    "Healer",
    "DPS",
    "Gatherer",
    "Crafter",
  ]);
  const [RoleTabIndex, setRoleTabIndex] = useState<number>(0);
  const [LevelFilter, setLevelFilter] = useState<string>("LvMax");
  const [LevelTabIndex, setLevelTabIndex] = useState<number>(0);

  const RoleTabs = [
    {
      Name: "All",
      Click: (index: number) => {
        setRoleTabIndex(index);
        setRoleFilter(["Tank", "Healer", "DPS", "Gatherer", "Crafter"]);
      },
    },
    {
      Name: "Tank",
      Click: (index: number) => {
        setRoleTabIndex(index);
        setRoleFilter(["Tank"]);
      },
    },
    {
      Name: "Healer",
      Click: (index: number) => {
        setRoleTabIndex(index);
        setRoleFilter(["Healer"]);
      },
    },
    {
      Name: "DPS",
      Click: (index: number) => {
        setRoleTabIndex(index);
        setRoleFilter(["DPS"]);
      },
    },
    {
      Name: "Gather & Craft",
      Click: (index: number) => {
        setRoleTabIndex(index);
        setRoleFilter(["Gatherer", "Crafter"]);
      },
    },
  ];

  const LevelTabs = [
    {
      Name: "Max Level",
      Click: (index: number) => {
        setLevelTabIndex(index);
        setLevelFilter("LvMax");
      },
    },
    {
      Name: "Level 80+",
      Click: (index: number) => {
        setLevelTabIndex(index);
        setLevelFilter("Lv80");
      },
    },
    {
      Name: "Level 70+",
      Click: (index: number) => {
        setLevelTabIndex(index);
        setLevelFilter("Lv70");
      },
    },
    {
      Name: "Level 60+",
      Click: (index: number) => {
        setLevelTabIndex(index);
        setLevelFilter("Lv60");
      },
    },
    {
      Name: "Level 50+",
      Click: (index: number) => {
        setLevelTabIndex(index);
        setLevelFilter("Lv50");
      },
    },
    {
      Name: "Level 30+",
      Click: (index: number) => {
        setLevelTabIndex(index);
        setLevelFilter("Lv30");
      },
    },
  ];

  useEffect(() => {
    const FilterByRole = popularJobs.filter((e) =>
      RoleFilter.includes(e.jobData.Role)
    );

    const level = parseInt(LevelFilter.substring(LevelFilter.length - 2));

    if (typeof level === "number") {
      const FilterByLevel = FilterByRole.filter((e) => e[LevelFilter] > 0);
      const result = FilterByLevel.sort(
        (a, b) => b[LevelFilter] - a[LevelFilter]
      );
      setFilter(result);
    } else {
      const FilterByLevel = FilterByRole.filter((e) => e["LvMax"] > 0);
      const result = FilterByLevel.sort(
        (a, b) => b[LevelFilter] - a[LevelFilter]
      );
      setFilter(result);
    }
  }, [RoleTabIndex, LevelTabIndex]);

  const NavTabs = () => {
    return (
      <div className="grid gap-2">
        <div className="tabs tabs-boxed w-fit ">
          {RoleTabs.map((tab, index) => (
            <button
              className={`tab ${RoleTabIndex === index ? "tab-active" : ""}`}
              key={uuidv4()}
              onClick={() => tab.Click(index)}
            >
              {tab.Name}
            </button>
          ))}
        </div>

        <div className="tabs tabs-boxed w-fit ">
          {LevelTabs.map((tab, index) => (
            <button
              className={`tab ${LevelTabIndex === index ? "tab-active" : ""}`}
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

  interface ChartProps {
    data: jobData[];
  }

  const ShowChart = ({ data }: ChartProps) => {
    const NameList = data.map((job) => {
      const split = job.Name.split(" ");
      const Names = split
        .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
        .join(" ");
      const TAGs = job.jobData.Tag;
      return data.length > 10 ? TAGs : Names;
    });

    const dataValues = filter.map((e) => e[LevelFilter]);

    function getRoleColor(role: string) {
      const roles = [
        { Name: "tank", Color: "#3e51b1" },
        { Name: "healer", Color: "#3c672f" },
        { Name: "dps", Color: "#743333" },
        { Name: "gatherer", Color: "#a28838" },
        { Name: "crafter", Color: "#6748ad" },
      ];

      const Role = roles.find((r) => r.Name === role.toLowerCase());

      return Role?.Color;
    }

    const treatedData = {
      labels: NameList,
      indexAxis: "y",
      datasets: [
        {
          label: "Total",
          backgroundColor: (context: any) => {
            const role = data[context.dataIndex].jobData.Role;
            const color = getRoleColor(role);
            return color;
          },
          borderColor: "#222731",
          borderWidth: 3,
          data: dataValues,
        },
      ],
    };

    const options = {
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

    return <Chart type="bar" data={treatedData} options={options} />;
  };

  const level = parseInt(LevelFilter.substring(LevelFilter.length - 2));
  const isNumber = !isNaN(level);
  const isLvl30 = level === 30;

  return (
    <div className="mt-4 grid gap-8">
      <NavTabs />
      <div>
        Showing{" "}
        <span className="text-accent">{RoleTabs[RoleTabIndex].Name}</span> Jobs{" "}
        {isNumber ? (
          <span>
            from{" "}
            <span className="text-accent">
              Level {level} to {isLvl30 ? level + 19 : level + 9}
            </span>
            .
          </span>
        ) : (
          <span>
            at <span className="text-accent">Max Level</span>.
          </span>
        )}
      </div>
      <ShowChart data={filter} />,
    </div>
  );
};
