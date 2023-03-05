import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFreeCompanyContext } from "../../../Contexts/FreeCompanyContext";
import { jobs } from "../../../Data/jobs";
import { getJobImage } from "../../../Helpers/getJobImage";

export const Jobs = () => {
  const { MembersFullData } = useFreeCompanyContext();
  const [activeTab, setActiveTab] = useState<number>(0);

  const level90Counts: {
    [className: string]: { count: number; classId: number };
  } = {};

  // Count the number of Level 90 jobs for each class
  Object.values(MembersFullData).forEach((character) => {
    character.Character.ClassJobs.forEach((job) => {
      if (job.Level === 90) {
        const classId = job.UnlockedState.ID;
        const className = job.Name.split(" / ")[1];
        const jobData = jobs.filter(
          (e) => e.Job.toLowerCase() === className.toLowerCase()
        );
        if (!level90Counts[className]) {
          level90Counts[className] = { count: 0, classId };
        }
        level90Counts[className].count++;
      }
    });
  });

  // Convert the counts to an array of objects with Name, Count, and classId properties
  const countsArray = Object.entries(level90Counts).map(
    ([className, { count, classId }]) => ({
      Name: className,
      Count: count,
      classId,
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

  const FirstPlace = () => {
    const { Name, Count, classId } = firstPlace;

    return (
      <article className="cursor-pointer flex flex-col md:flex-row border border-base-100 bg-base-100 rounded-lg p-4 gap-4 items-center text-gold hover:bg-primary duration-300 hover:border-transparent">
        {" "}
        <div className="p-3 mask mask-squircle bg-base-300">
          <img
            src={`https://xivapi.com/cj/1/${Name.replace(" ", "")}.png`}
            className="w-10"
            alt={Name}
          />
        </div>
        <h3 className="text-2xl font-bold capitalize">{Name}</h3>
        <span className="text-2xl">{Count}</span>
      </article>
    );
  };

  const SecondPlace = () => {
    const { Name, Count, classId } = secondPlace;

    return (
      <article className="cursor-pointer flex flex-col md:flex-row border border-base-100 bg-base-100 rounded-lg p-4 gap-4 items-center text-silver hover:bg-primary duration-300 hover:border-transpar3nt">
        {" "}
        <div className="p-3 mask mask-squircle bg-base-300">
          <img
            src={`https://xivapi.com/cj/1/${Name.replace(" ", "")}.png`}
            className="w-10"
            alt={Name}
          />
        </div>
        <span className="text-2xl font-bold capitalize">{Name}</span>
        <span className="text-2xl">{Count}</span>
      </article>
    );
  };

  const ThirdPlace = () => {
    const { Name, Count, classId } = thirdPlace;

    return (
      <article className="cursor-pointer flex flex-col md:flex-row border border-base-100 bg-base-100 rounded-lg p-4 gap-4 items-center text-bronze hover:bg-primary duration-300 hover:border-transparent">
        {" "}
        <div className="p-3 mask mask-squircle bg-base-300">
          <img
            src={`https://xivapi.com/cj/1/${Name.replace(" ", "")}.png`}
            className="w-10"
            alt={Name}
          />
        </div>
        <h3 className="text-2xl font-bold capitalize">{Name}</h3>
        <span className="text-2xl">{Count}</span>
      </article>
    );
  };

  const Table = () => {
    return (
      <div className="grid gap-3 w-full">
        {everyoneElse.map((job, index) => {
          const { Name, Count, classId } = job;

          return (
            <article
              key={uuidv4()}
              className="cursor-pointer flex flex-col md:flex-row border border-base-100 rounded-lg p-4 gap-4 items-center hover:bg-primary duration-300 hover:border-transparent"
            >
              <div className="p-2 mask mask-squircle bg-base-100">
                <img
                  src={`https://xivapi.com/cj/1/${Name.replace(" ", "")}.png`}
                  className="w-8"
                  alt={Name}
                />
              </div>
              <span className="text-lg font-bold capitalize">{Name}</span>
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
