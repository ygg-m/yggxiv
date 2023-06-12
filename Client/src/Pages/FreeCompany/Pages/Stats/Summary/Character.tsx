import { ChevronRightIcon, FemaleIcon, MaleIcon } from "@/Assets/Images/UI";
import { useStats } from "@/Contexts/StatsContext";
import { raceData } from "@/Types";
import { Link, useLocation } from "react-router-dom";

import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { v4 as uuidv4 } from "uuid";
import { ShowData } from "../ShowData";
import { Genders } from "./Genders";

interface RaceProps {
  data: raceData;
}

interface RacesProps {
  data: raceData[];
}

const Race = ({ data }: RaceProps) => {
  const {
    freeCompany: {
      FreeCompany: { ActiveMemberCount },
    },
  } = useFreeCompany();

  const { Race, Tribe1, Tribe2, memberList } = data;

  const { Name, Tribes: TribeData } = data.raceData;

  const { Avatar, Name: CharName } =
    memberList[Math.floor(Math.random() * memberList.length)].Character;

  const percentage = Math.floor((Race.Count / ActiveMemberCount) * 100);

  const chartData = {
    labels: ["Total", TribeData.Tribe1.Name, TribeData.Tribe2.Name],
    datasets: [
      {
        label: "Total",
        backgroundColor: ["#2A303C"],
        borderColor: "#222731",
        borderWidth: 4,
        data: [Race.Count, Tribe1.Count, Tribe2.Count],
        stack: "Total",
      },
      {
        label: "Male",
        backgroundColor: "#eec643",
        borderColor: "#2A303C",
        borderWidth: 3,
        data: [Race.Male, Tribe1.Male, Tribe2.Male],
        stack: "Gender",
      },
      {
        label: "Female",
        backgroundColor: "#5c0099",
        borderColor: "#2A303C",
        borderWidth: 3,
        data: [Race.Female, Tribe1.Female, Tribe2.Female],
        stack: "Gender",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        grid: {
          display: true,
          color: "#222731",
        },
        ticks: {
          beginAtZero: false,
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    // plugins: {
    //   legend: {
    //     display: false,
    //   },
    // },
  };

  return (
    <div className="grid gap-4 rounded-lg bg-base-200 p-4 pt-6 duration-100 hover:bg-base-300">
      <div className="grid place-items-center gap-2">
        <div className="tooltip" data-tip={CharName}>
          <img src={Avatar} alt={Name} className="mask mask-squircle w-24" />
        </div>
        <h4 className="text-center text-lg">{Name}</h4>
      </div>

      <div className="grid place-items-center pb-2">
        <span className="text-5xl font-bold text-primary">{Race.Count}</span>
        <span className="opacity-70">characters ({percentage}%)</span>
      </div>

      <div className="rounded-lg bg-neutral px-4 py-2">
        <Chart type="bar" data={chartData} options={options} />
      </div>
    </div>
  );
};

const Races = ({ data }: RacesProps) => {
  const top3 = data.slice(0, 3);

  const location = useLocation();
  const currentFC = location.pathname.split("/")[2];
  const FullViewPath = `/FreeCompany/${currentFC}/Stats/Character`;

  return (
    <div className="grid gap-2">
      <div className="flex justify-between">
        <h2 className="text-2xl">Most popular Races</h2>
        <Link to={FullViewPath} className="btn-primary btn gap-2">
          See full List <ChevronRightIcon className="w-2" />
        </Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {top3.map((race) => (
          <Race key={uuidv4()} data={race} />
        ))}
      </div>
    </div>
  );
};

interface GenderProps {
  data: { Count: number }[];
}

const GenderChart = ({ data }: GenderProps) => {
  const treatedData = {
    labels: ["Male", "Female"],
    indexAxis: "y",
    datasets: [
      {
        backgroundColor: ["#eec643", "#5c0099"],
        borderColor: "#222731",
        borderWidth: 4,
        data: data.map((gender) => gender.Count),
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: false,
          display: false,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="grid w-full place-items-center">
      <div className="rounded-lg bg-base-200 p-8">
        <div className="flex justify-center gap-8">
          <MaleIcon className="h-16 w-16 text-primary" />
          <FemaleIcon className="h-16 w-16 text-secondary" />
        </div>
        <div className="max-w-sm">
          <Chart type="doughnut" data={treatedData} options={options} />
        </div>
      </div>
    </div>
  );
};

export const Character = () => {
  const { popularRaces, popularGender } = useStats();
  return (
    <div className="rounded-lg p-8">
      <h2 className="text-3xl font-bold">Character</h2>
      <div className="divider"></div>
      <Races data={popularRaces} />
      <div className="divider"></div>
      <GenderChart data={popularGender} />
    </div>
  );
};
