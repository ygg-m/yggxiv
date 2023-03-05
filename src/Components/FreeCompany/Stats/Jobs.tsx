import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFreeCompanyContext } from "../../../Contexts/FreeCompanyContext";
import { jobs } from "../../../Data/jobs";

export const Jobs = () => {
  const { MembersFullData } = useFreeCompanyContext();
  const [activeTab, setActiveTab] = useState<number>(0);

  const level90Counts: {
    [className: string]: {
      count: number;
      classId: number;
      jobData: {
        Job: string;
        ImageSrc: string;
        Role: string;
        Position?: string;
        SVG?: object;
      };
    };
  } = {};

  // Count the number of Level 90 jobs for each class
  Object.values(MembersFullData).forEach((character) => {
    character.Character.ClassJobs.forEach((job) => {
      if (job.Level === 90) {
        const classId = job.UnlockedState.ID;
        const className = job.Name.split(" / ")[1];
        const jobData = jobs.filter(
          (e) => e.Job.toLowerCase() === className.toLowerCase()
        )[0];
        if (!level90Counts[className]) {
          level90Counts[className] = { count: 0, classId, jobData };
        }
        level90Counts[className].count++;
      }
    });
  });

  // Convert the counts to an array of objects with Name, Count, and classId properties
  const countsArray = Object.entries(level90Counts).map(
    ([className, { count, classId, jobData }]) => ({
      Name: className,
      Count: count,
      classId,
      jobData,
    })
  );

  const placement = useMemo(
    () => countsArray.sort((a, b) => b.Count - a.Count),
    MembersFullData
  );

  const firstPlace = useMemo(() => placement.slice(0, 1)[0], placement);
  const secondPlace = useMemo(() => placement.slice(1, 2)[0], placement);
  const thirdPlace = useMemo(() => placement.slice(2, 3)[0], placement);
  const everyoneElse = useMemo(() => placement.slice(3), placement);

  console.log(everyoneElse);

  const FirstPlace = () => {
    const {
      Count,
      jobData: { Job, ImageSrc, Role },
    } = firstPlace;

    return (
      <article className="cursor-pointer flex flex-col md:flex-row border border-base-100 bg-base-100 rounded-lg p-4 gap-4 items-center text-gold hover:bg-primary duration-300 hover:border-transparent">
        <div className={`p-3 mask mask-squircle bg-${Role.toLowerCase()}`}>
          <img src={ImageSrc} className="w-10" alt={Job} />
        </div>
        <h3 className="text-2xl font-bold capitalize">{Job}</h3>
        <span className="text-2xl">{Count}</span>
      </article>
    );
  };

  const SecondPlace = () => {
    const {
      Count,
      jobData: { Job, ImageSrc, Role },
    } = secondPlace;

    return (
      <article className="cursor-pointer flex flex-col md:flex-row border border-base-100 bg-base-100 rounded-lg p-4 gap-4 items-center text-silver hover:bg-primary duration-300 hover:border-transpar3nt">
        <div className={`p-3 mask mask-squircle bg-${Role.toLowerCase()}`}>
          <img src={ImageSrc} className="w-10" alt={Job} />
        </div>
        <span className="text-2xl font-bold capitalize">{Job}</span>
        <span className="text-2xl">{Count}</span>
      </article>
    );
  };

  const ThirdPlace = () => {
    const {
      Count,
      jobData: { Job, ImageSrc, Role },
    } = thirdPlace;

    return (
      <article className="cursor-pointer flex flex-col md:flex-row border border-base-100 bg-base-100 rounded-lg p-4 gap-4 items-center text-bronze hover:bg-primary duration-300 hover:border-transparent">
        <div className={`p-3 mask mask-squircle bg-${Role.toLowerCase()}`}>
          <img src={ImageSrc} className="w-10" alt={Job} />
        </div>
        <h3 className="text-2xl font-bold capitalize">{Job}</h3>
        <span className="text-2xl">{Count}</span>
      </article>
    );
  };

  const Table = () => {
    return (
      <div className="grid gap-3 w-full">
        {everyoneElse.map((jobinfo, index) => {
          const {
            Count,
            jobData: { Job, ImageSrc, Role },
          } = jobinfo;

          return (
            <article
              key={uuidv4()}
              className="cursor-pointer flex flex-col md:flex-row border border-base-100 rounded-lg p-4 gap-4 items-center hover:bg-primary duration-300 hover:border-transparent"
            >
              <span className="w-8">{index + 4}º</span>
              <div
                className={`p-3 mask mask-squircle bg-${Role.toLowerCase()}`}
              >
                <img src={ImageSrc} className="w-8" alt={Job} />
              </div>
              <span className="text-lg font-bold capitalize">{Job}</span>
              <span className="text-lg">{Count}</span>
            </article>
          );
        })}
      </div>
    );
  };

  const tabs = [
    {
      label: "All",
      content: <></>,
    },
    {
      label: "Battle Jobs",
      content: <></>,
    },
    {
      label: "Craft / Gather",
      content: <></>,
    },
  ];

  return (
    <section className="flex flex-col items-center">
      <nav className="w-11/12 grid md:grid-cols-3 rounded-b-lg h-fit mb-4 outline outline-base-100 p-2">
        {tabs.map((tab, index) => (
          <a
            key={uuidv4()}
            className={`tab tab-lg tabs-boxed duration-300 ${
              index === activeTab ? "tab-active bg-base-100" : "bg-transparent"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </a>
        ))}
      </nav>
      <div className="grid gap-4 w-full">
        <FirstPlace />
        <SecondPlace />
        <ThirdPlace />
      </div>
      <div className="divider"></div>
      <Table />
    </section>
  );
};
