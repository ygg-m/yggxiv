import { ChevronRightIcon } from "@/Assets/Images/UI";
import { useStats } from "@/Contexts/StatsContext";
import { jobData } from "@/Types";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ShowData } from "../ShowData";

interface JobProps {
  data: jobData;
}

interface JobsProps {
  data: jobData[];
}

const JobData = ({ data }: JobProps) => {
  const { LvMax, Lv80, Lv70, Lv60, Lv50, Lv30 } = data;
  const { Job, Role, ImageSrc } = data.jobData;

  return (
    <div className="grid gap-2 rounded-lg bg-base-300 p-4">
      <div className="grid justify-center gap-2 p-4">
        <img
          src={ImageSrc}
          alt={Job}
          className={`mask mask-squircle w-24 p-4 bg-${Role.toLowerCase()}`}
        />
        <h4 className="text-center text-lg">{Job}</h4>
      </div>

      <div className="rounded-lg bg-neutral px-4 py-2">
        <ShowData name="Max Level" value={LvMax} />
      </div>
      <div className="rounded-lg bg-neutral px-4 py-2">
        <ShowData name="Level 80+" value={Lv80} />
        <ShowData name="Level 70+" value={Lv70} />
        <ShowData name="Level 60+" value={Lv60} />
        <ShowData name="Level 50+" value={Lv50} />
        <ShowData name="Level 30+" value={Lv30} />
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
