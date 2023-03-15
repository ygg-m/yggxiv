import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useStats } from "../../../Contexts/StatsContext";

export const Jobs = () => {
  const { popularJobs } = useStats();

  const [activeTab, setActiveTab] = useState<number>(0);
  const [placement, setPlacement] = useState(popularJobs);

  interface jobData {
    Name: string;
    LvMax: number;
    Lv80: number;
    Lv70: number;
    Lv60: number;
    Lv50: number;
    Lv30: number;
    classId: number;
    jobData: {
      Job: string;
      Role: string;
      Position?: string;
      ImageSrc: string;
      SVG?: object;
    };
  }

  // declare dinamic variables so TailwindCSS recognize it.
  // bg-dps
  // bg-tank
  // bg-healer
  // bg-gatherer
  // bg-crafter

  const firstPlace = placement[0];
  const secondPlace = placement[1];
  const thirdPlace = placement[2];
  const everyoneElse = placement.slice(3);

  const tabs = [
    {
      label: "All",
      filterJobs: () => setPlacement(popularJobs),
    },
    {
      label: "Battle Jobs",
      filterJobs: () =>
        setPlacement(
          popularJobs.filter(
            (e: jobData) =>
              e.jobData.Role === "DPS" ||
              e.jobData.Role === "Tank" ||
              e.jobData.Role === "Healer"
          )
        ),
    },
    {
      label: "Craft / Gather",
      filterJobs: () =>
        setPlacement(
          popularJobs.filter(
            (e: jobData) =>
              e.jobData.Role === "Gatherer" || e.jobData.Role === "Crafter"
          )
        ),
    },
    {
      label: "Tank",
      filterJobs: () =>
        setPlacement(
          popularJobs.filter((e: jobData) => e.jobData.Role === "Tank")
        ),
    },
    {
      label: "Healer",
      filterJobs: () =>
        setPlacement(
          popularJobs.filter((e: jobData) => e.jobData.Role === "Healer")
        ),
    },
    {
      label: "DPS",
      filterJobs: () =>
        setPlacement(
          popularJobs.filter((e: jobData) => e.jobData.Role === "DPS")
        ),
    },
  ];

  const FirstPlace = () => {
    const {
      LvMax,
      jobData: { Job, ImageSrc, Role },
    } = firstPlace;

    return (
      <article className="-order-1 bg-base-100 sm:order-2 gap-3 w-52 text-center grid justify-center rounded-lg p-4 items-center">
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
          <h3 className="text-4xl font-bold text-gold">{LvMax}</h3>
        </div>
      </article>
    );
  };

  const SecondPlace = () => {
    const {
      LvMax,
      jobData: { Job, ImageSrc, Role },
    } = secondPlace;

    return (
      <article className="order-1 self-end bg-base-100 gap-3 sm:h-[240px] w-40 text-center flex flex-col justify-center rounded-lg p-4 items-center">
        <div className="px-4 grid justify-center text-silver">
          <span className="font-extrabold text-lg text-center ">
            2<span className="font-normal">nd</span>
          </span>
        </div>
        <div
          className={`mask p-4 mask-squircle flex justify-center bg-${Role.toLowerCase()}`}
        >
          <img src={ImageSrc} alt={Job} className="w-14" />
        </div>
        <div className="grid">
          <h3 className="text-xl">{Job}</h3>
          <h3 className="text-2xl font-bold text-gold">{LvMax}</h3>
        </div>
      </article>
    );
  };

  const ThirdPlace = () => {
    const {
      LvMax,
      jobData: { Job, ImageSrc, Role },
    } = thirdPlace;

    return (
      <article className="order-3 self-end bg-base-100 gap-3 w-40 sm:h-[200px] text-center flex flex-col justify-center rounded-lg p-4 items-center">
        <div className="px-4 grid justify-center text-bronze">
          <span className="font-extrabold text-lg text-center ">
            3<span className="font-normal">rd</span>
          </span>
        </div>
        <div
          className={`mask p-2 mask-squircle flex justify-center bg-${Role.toLowerCase()}`}
        >
          <img src={ImageSrc} alt={Job} className="w-10" />
        </div>
        <div className="grid">
          <h3 className="text-xl">{Job}</h3>
          <h3 className="text-2xl font-bold text-gold">{LvMax}</h3>
        </div>
      </article>
    );
  };

  const Table = () => {
    return (
      <div className="grid rounded-lg bg-base-300 w-full max-w-[672px] outline outline-base-100">
        {everyoneElse.map((jobinfo: jobData, index: number) => {
          const {
            LvMax,
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
                  <span className="text-lg text-gold font-bold">{LvMax}</span>
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
    <section className="flex flex-col items-center gap-4">
      <nav className="w-11/12 grid md:grid-cols-6 rounded-b-lg h-fit outline outline-base-100 p-2">
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
      <div className="flex w-full justify-center gap-2">
        <SecondPlace />
        <FirstPlace />
        <ThirdPlace />
      </div>
      <Table />
    </section>
  );
};
