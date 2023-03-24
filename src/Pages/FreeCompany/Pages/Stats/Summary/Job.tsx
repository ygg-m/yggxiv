import { ChevronRightIcon } from "@/Assets/Images/UI";
import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import { useStats } from "@/Contexts/StatsContext";
import { jobData } from "@/Types";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface JobProps {
  data: jobData;
}

interface JobsProps {
  data: jobData[];
}

const JobData = ({ data }: JobProps) => {
  const { LvMax, Lv80, Lv70, Lv60, Lv50, Lv30 } = data;
  const { Job, Role, ImageSrc } = data.jobData;
  const {
    freeCompany: {
      FreeCompany: { ActiveMemberCount },
    },
  } = useFreeCompany();

  const percentage = Math.floor((LvMax / ActiveMemberCount) * 100);

  const chartData = {
    labels: ["Max Level", "Lv80+", "Lv70+", "Lv60+", "Lv50+", "Lv30+"],
    datasets: [
      {
        backgroundColor: [
          "#eec643",
          "#743333",
          "#743333",
          "#743333",
          "#743333",
          "#743333",
        ],
        borderColor: "#222731",
        borderWidth: 4,
        data: [LvMax, Lv80, Lv70, Lv60, Lv50, Lv30],
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
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // bg-dps
  // bg-tank
  // bg-healer
  // bg-crafter
  // bg-gatherer

  return (
    <div className="grid gap-4 rounded-lg bg-base-200 p-4 pt-6 duration-300 hover:bg-base-300">
      <div className="grid justify-center gap-2">
        <img
          src={ImageSrc}
          alt={Job}
          className={`mask mask-squircle w-24 p-4 bg-${Role.toLowerCase()}`}
        />
        <h4 className="text-center text-lg">{Job}</h4>
      </div>

      <div className="grid place-items-center pb-2">
        <span className="text-5xl font-bold text-primary">{LvMax}</span>
        <span className="opacity-70">
          characters at Max Level ({percentage}%)
        </span>
      </div>
      <div className="rounded-lg bg-neutral px-4 py-2 py-3">
        <Chart type="bar" data={chartData} options={options} />
      </div>
    </div>
  );
};

const Jobs = ({ data }: JobsProps) => {
  const top3 = data.slice(0, 3);

  const location = useLocation();
  const currentFC = location.pathname.split("/")[2];
  const FullViewPath = `/FreeCompany/${currentFC}/Stats/Job`;

  return (
    <div className="grid gap-2">
      <div className="flex justify-between">
        <h2 className="text-2xl">Most popular Jobs</h2>
        <Link to={FullViewPath} className="btn-primary btn gap-2">
          See full List <ChevronRightIcon className="w-2" />
        </Link>
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        {top3.map((job: jobData) => (
          <JobData key={uuidv4()} data={job} />
        ))}
      </div>
    </div>
  );
};

export const Job = () => {
  const { popularJobs } = useStats();

  return (
    <div className="rounded-lg bg-base-100 p-8">
      <h2 className="text-3xl font-bold">Job</h2>
      <div className="divider"></div>
      <Jobs data={popularJobs} />
    </div>
  );
};
