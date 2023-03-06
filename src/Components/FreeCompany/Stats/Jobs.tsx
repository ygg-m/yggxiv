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

  interface jobData {
    Name: string;
    Count: number;
    classId: number;
    jobData: {
      Job: string;
      Role: string;
      Position?: string;
      ImageSrc: string;
      SVG?: object;
    };
  }

  // Convert the counts to an array of objects with Name, Count, and classId properties
  const countsArray = Object.entries(level90Counts).map(
    ([className, { count, classId, jobData }]) => ({
      Name: className,
      Count: count,
      classId,
      jobData,
    })
  );

  const sortPlacement = (list: jobData[]) => {
    return list.sort((a, b) => b.Count - a.Count);
  };

  const [placement, setPlacement] = useState(() => sortPlacement(countsArray));

  const firstPlace = placement.slice(0, 1)[0];
  const secondPlace = placement.slice(1, 2)[0];
  const thirdPlace = placement.slice(2, 3)[0];
  const everyoneElse = placement.slice(3);

  // declare dinamic variables so TailwindCSS recognize it.
  // bg-dps
  // bg-tank
  // bg-healer
  // bg-gatherer
  // bg-crafter

  const FirstPlace = () => {
    const {
      Count,
      jobData: { Job, ImageSrc, Role },
    } = firstPlace;

    return (
      <article className="flex flex-col md:flex-row px-4 py-2 gap-4 items-center text-gold ">
        1rst
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
      <article className="flex flex-col md:flex-row px-4 py-2 gap-4 items-center text-silver">
        2nd
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
      <article className="flex flex-col md:flex-row px-4 py-2 gap-4 items-center text-bronze">
        3rd
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
      <div className="grid w-full">
        {everyoneElse.map((jobinfo, index) => {
          const {
            Count,
            jobData: { Job, ImageSrc, Role },
          } = jobinfo;

          return (
            <>
              <article
                key={uuidv4()}
                className="flex flex-col md:flex-row px-4 py-2 gap-4 items-center"
              >
                <span className="w-8">{index + 4}º</span>
                <div
                  className={`p-1 mask mask-squircle bg-${Role.toLowerCase()}`}
                >
                  <img src={ImageSrc} className="w-8" alt={Job} />
                </div>
                <span className="text-lg font-bold capitalize">{Job}</span>
                <span className="text-lg">{Count}</span>
              </article>
              {index !== everyoneElse.length - 1 && (
                <div className="divider m-0 h-1"></div>
              )}
            </>
          );
        })}
      </div>
    );
  };

  const tabs = [
    {
      label: "All",
      filterJobs: () => setPlacement(sortPlacement(countsArray)),
    },
    {
      label: "Battle Jobs",
      filterJobs: () => {
        const filter = countsArray.filter(
          (e) =>
            e.jobData.Role === "DPS" ||
            e.jobData.Role === "Tank" ||
            e.jobData.Role === "Healer"
        );
        setPlacement(sortPlacement(filter));
      },
    },
    {
      label: "Craft / Gather",
      filterJobs: () => {
        const filter = countsArray.filter(
          (e) => e.jobData.Role === "Crafter" || e.jobData.Role === "Gatherer"
        );
        setPlacement(sortPlacement(filter));
      },
    },
  ];

  function handleClick(index: number) {
    tabs[index].filterJobs();
    setActiveTab(index);
  }

  return (
    <section className="flex flex-col items-center">
      <nav className="w-11/12 grid md:grid-cols-3 rounded-b-lg h-fit mb-4 outline outline-base-100 p-2">
        {tabs.map((tab, index) => (
          <a
            key={uuidv4()}
            className={`tab tab-lg tabs-boxed duration-300 ${
              index === activeTab ? "tab-active bg-base-100" : "bg-transparent"
            }`}
            onClick={() => handleClick(index)}
          >
            {tab.label}
          </a>
        ))}
      </nav>
      <div className="border border-base-100 rounded-xl w-full">
        <div className="grid w-full">
          <FirstPlace />
          <div className="divider m-0 h-1"></div>
          <SecondPlace />
          <div className="divider m-0 h-1"></div>
          <ThirdPlace />
          <div className="divider m-0 h-1"></div>
        </div>
        <Table />
      </div>
    </section>
  );
};
