import { FemaleIcon, MaleIcon } from "@/Assets/Images/UI";
import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import { useStats } from "@/Contexts/StatsContext";
import { raceData } from "@/Types";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { v4 as uuidv4 } from "uuid";

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
        stack: "Race Gender",
      },
      {
        label: "Female",
        backgroundColor: "#5c0099",
        borderColor: "#2A303C",
        borderWidth: 3,
        data: data.map((race) => race.Race.Female),
        stack: "Race Gender",
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
          <div className="tooltip" data-tip={Character.Name} key={uuidv4()}>
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

interface RaceProps {
  data: raceData;
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
          display: true,
          stepSize: 1,
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
    <div className="flex min-h-[300px] items-center gap-4 rounded-lg bg-base-200 p-4 pl-6 duration-100 hover:bg-base-300">
      <div className="flex flex-col place-items-center gap-2">
        <div className="tooltip" data-tip={CharName}>
          <img src={Avatar} alt={Name} className="mask mask-squircle w-24" />
        </div>
        <h4 className="text-center text-lg">{Name}</h4>
      </div>

      <div className="w-full rounded-lg bg-neutral px-4 py-2">
        <Chart type="bar" data={chartData} options={options} />
      </div>
    </div>
  );
};

export const CharacterStats = () => {
  const { popularRaces, popularGender } = useStats();

  const HyurFilter = popularRaces.filter(
    (race) => race.raceData.Name === "Hyur"
  );

  return (
    <div className="grid gap-16 p-8">
      <RaceChart data={popularRaces} />
      <GenderChart data={popularGender} />
      <div className="grid grid-cols-2 gap-4">
        {popularRaces.map((race) => (
          <Race key={uuidv4()} data={race} />
        ))}
      </div>
    </div>
  );
};
