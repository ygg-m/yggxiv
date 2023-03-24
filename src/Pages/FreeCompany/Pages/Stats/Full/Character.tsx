import { FemaleIcon, MaleIcon } from "@/Assets/Images/UI";
import { useStats } from "@/Contexts/StatsContext";
import { raceData } from "@/Types";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const RaceChart = ({ data }: { data: raceData[] }) => {
  const treatedData = {
    labels: data.map((race) => race.raceData.Name),
    indexAxis: "y",
    datasets: [
      {
        label: "Total",
        backgroundColor: "#2A303C",
        borderColor: "#222731",
        borderWidth: 3,
        data: data.map((race) => race.Race.Count),
      },
      {
        label: "Male",
        backgroundColor: "#eec643",
        borderColor: "#2A303C",
        borderWidth: 3,
        data: data.map((race) => race.Race.Male),
        stack: "0",
      },
      {
        label: "Female",
        backgroundColor: "#5c0099",
        borderColor: "#2A303C",
        borderWidth: 3,
        data: data.map((race) => race.Race.Female),
        stack: "0",
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
  };

  const RaceList = data.map((race) => {
    const randomIndex = Math.floor(Math.random() * race.memberList.length);
    const Character = race.memberList[randomIndex].Character;
    const MemberInfo = { Avatar: Character.Avatar, Name: Character.Name };
    return MemberInfo;
  });

  return (
    <div className="grid gap-2">
      <Chart type="bar" data={treatedData} options={options} />
      <div className="ml-6 hidden justify-between px-4 sm:flex md:px-2 xl:px-6 2xl:px-10">
        {RaceList.map((Character) => (
          <div className="tooltip" data-tip={Character.Name}>
            <img
              src={Character.Avatar}
              className="mask mask-squircle w-8 sm:w-12 md:w-16 lg:w-24"
            />
          </div>
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
    <div className="grid gap-16 p-8">
      <RaceChart data={popularRaces} />
      <GenderChart data={popularGender} />
    </div>
  );
};
