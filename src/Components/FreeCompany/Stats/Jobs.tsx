import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFreeCompanyContext } from "../../../Contexts/FreeCompanyContext";
import { jobs } from "../../../Data/jobs";

export const Jobs = () => {
  const { MembersFullData } = useFreeCompanyContext();
  const [activeTab, setActiveTab] = useState<number>(0);

  const maxLevelCounts: {
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

  Object.values(MembersFullData).forEach((character) => {
    character.Character.ClassJobs.forEach((job) => {
      const isBlueLvMax = job.JobID === 36 && job.Level === 70;
      if (job.Level === 90 || isBlueLvMax) {
        const classId = job.UnlockedState.ID;
        const className = job.Name.split(" / ")[1];
        const jobData = jobs.filter(
          (e) => e.Job.toLowerCase() === className.toLowerCase()
        )[0];

        if (!maxLevelCounts[className]) {
          maxLevelCounts[className] = { count: 0, classId, jobData };
        }

        maxLevelCounts[className].count++;
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

  const countsArray = Object.entries(maxLevelCounts).map(
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
    {
      label: "Tank",
      filterJobs: () => {
        const filter = countsArray.filter((e) => e.jobData.Role === "Tank");
        setPlacement(sortPlacement(filter));
      },
    },
    {
      label: "Healer",
      filterJobs: () => {
        const filter = countsArray.filter((e) => e.jobData.Role === "Healer");
        setPlacement(sortPlacement(filter));
      },
    },
    {
      label: "DPS",
      filterJobs: () => {
        const filter = countsArray.filter((e) => e.jobData.Role === "DPS");
        setPlacement(sortPlacement(filter));
      },
    },
  ];

  const FirstPlace = () => {
    const {
      Count,
      jobData: { Job, ImageSrc, Role },
    } = firstPlace;

    return (
      <article className="gap-3 w-52 text-center grid justify-center rounded-lg p-4 items-center">
        <div className="px-4 grid justify-center text-gold pb-2">
          <span className="font-extrabold text-lg text-center ">
            1<span className="font-normal">rst</span>
          </span>
        </div>
        <div
          className={`mask p-4 mask-squircle flex justify-center bg-${Role.toLowerCase()}`}
        >
          <img src={ImageSrc} alt={Job} className="w-24" />
        </div>
        <div className="grid">
          <h3 className="text-2xl">{Job}</h3>
          <h3 className="text-4xl font-bold text-gold">{Count}</h3>
        </div>
      </article>
    );
  };

  const SecondPlace = () => {
    const {
      Count,
      jobData: { Job, ImageSrc, Role },
    } = secondPlace;

    return (
      <article className="gap-3 w-40 text-center flex flex-col justify-center rounded-lg p-4 items-center translate-y-10">
        <div className="px-4 grid justify-center text-silver pb-2">
          <span className="font-extrabold text-lg text-center ">
            2<span className="font-normal">nd</span>
          </span>
        </div>
        <div
          className={`mask p-4 mask-squircle flex justify-center bg-${Role.toLowerCase()}`}
        >
          <img src={ImageSrc} alt={Job} className="w-16" />
        </div>
        <div className="grid">
          <h3 className="text-2xl">{Job}</h3>
          <h3 className="text-4xl font-bold text-gold">{Count}</h3>
        </div>
      </article>
    );
  };

  const ThirdPlace = () => {
    const {
      Count,
      jobData: { Job, ImageSrc, Role },
    } = thirdPlace;

    return (
      <article className="gap-3 w-40 text-center flex flex-col justify-center rounded-lg p-4 items-center translate-y-10">
        <div className="px-4 grid justify-center text-bronze pb-2">
          <span className="font-extrabold text-lg text-center ">
            3<span className="font-normal">rd</span>
          </span>
        </div>
        <div
          className={`mask p-4 mask-squircle flex justify-center bg-${Role.toLowerCase()}`}
        >
          <img src={ImageSrc} alt={Job} className="w-16" />
        </div>
        <div className="grid">
          <h3 className="text-2xl">{Job}</h3>
          <h3 className="text-4xl font-bold text-gold">{Count}</h3>
        </div>
      </article>
    );
  };

  const Table = () => {
    return (
      <div className="grid rounded-lg bg-base-300 outline outline-base-100 w-full">
        {everyoneElse.map((jobinfo, index) => {
          const {
            Count,
            jobData: { Job, ImageSrc, Role },
          } = jobinfo;

          return (
            <>
              <article
                key={uuidv4()}
                className="justify-between flex flex-col sm:flex-row p-4 gap-4 items-center hover:bg-base-100 duration-300 hover:border-transparent"
              >
                <div className="flex items-center gap-4 flex-col sm:flex-row">
                  <span className="w-8 text-center sm:text-left">
                    {index + 4}º
                  </span>
                  <div
                    className={`mask p-2 mask-squircle flex justify-center bg-${Role.toLowerCase()}`}
                  >
                    <img src={ImageSrc} alt={Job} className="w-8" />
                  </div>
                  <span className="text-lg">{Job}</span>
                </div>
                <div className="grid">
                  <span className="text-lg text-gold font-bold">{Count}</span>
                </div>
              </article>
              <div className="divider m-0 h-0"></div>
            </>
          );
        })}
      </div>
    );
  };

  function handleClick(index: number) {
    tabs[index].filterJobs();
    setActiveTab(index);
  }

  return (
    <section className="flex flex-col items-center">
      <nav className="w-11/12 grid md:grid-cols-6 rounded-b-lg h-fit mb-4 outline outline-base-100 p-2">
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
      <div className="flex w-full justify-center mb-4 pb-12">
        <SecondPlace />
        <FirstPlace />
        <ThirdPlace />
      </div>
      <Table />
    </section>
  );
};
