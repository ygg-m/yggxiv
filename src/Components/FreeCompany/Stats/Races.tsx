import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFreeCompanyContext } from "../../../Contexts/FreeCompanyContext";
import { races } from "../../../Data/races";

export const Races = () => {
  const { MembersFullData } = useFreeCompanyContext();
  const [activeTab, setActiveTab] = useState<number>(0);

  const raceCounts: {
    [raceName: string]: {
      raceCount: number;
      tribeCount: number;
      tribeCount2: number;
      raceData: {
        ID: number;
        Icon: any;
        Name: string;
        Tribes: {
          Tribe1: {
            ID: number;
            Icon: any;
            Name: string;
          };
          Tribe2: {
            ID: number;
            Icon: any;
            Name: string;
          };
        };
      };
    };
  } = {};

  Object.values(MembersFullData).forEach((character) => {
    const raceID = character.Character.Race;
    const tribeID = character.Character.Tribe;
    const raceData = races.filter((e) => e.ID === raceID)[0];

    if (!raceCounts[raceID]) {
      raceCounts[raceID] = {
        raceCount: 0,
        tribeCount: 0,
        tribeCount2: 0,
        raceData,
      };
    }

    if (raceID === raceCounts[raceID].raceData.ID)
      raceCounts[raceID].raceCount++;

    if (tribeID === raceCounts[raceID].raceData.Tribes.Tribe1.ID)
      raceCounts[raceID].tribeCount++;

    if (tribeID === raceCounts[raceID].raceData.Tribes.Tribe2.ID)
      raceCounts[raceID].tribeCount2++;
  });

  interface raceData {
    raceCount: number;
    tribeCount: number;
    tribeCount2: number;
    raceData: {
      ID: number;
      Icon: any;
      Name: string;
      Tribes: {
        Tribe1: {
          ID: number;
          Icon: any;
          Name: string;
        };
        Tribe2: {
          ID: number;
          Icon: any;
          Name: string;
        };
      };
    };
  }

  const countsArray = Object.entries(raceCounts).map(
    ([raceID, { raceCount, tribeCount, tribeCount2, raceData }]) => ({
      ID: raceID,
      raceCount: raceCount,
      tribeCount: tribeCount,
      tribeCount2: tribeCount2,
      raceData,
    })
  );

  const sortPlacement = (list: raceData[]) => {
    return list.sort((a, b) => b.raceCount - a.raceCount);
  };

  const [placement, setPlacement] = useState(() => sortPlacement(countsArray));

  const firstPlace = placement.slice(0, 1)[0];
  const secondPlace = placement.slice(1, 2)[0];
  const thirdPlace = placement.slice(2, 3)[0];
  const everyoneElse = placement.slice(3);

  const tabs = [
    {
      label: "Races",
      filterJobs: () => setPlacement(sortPlacement(countsArray)),
    },
    {
      label: "Tribes",
      filterJobs: () => {
        const filter = countsArray.sort((a, b) => b.tribeCount - a.tribeCount);
        const filter2 = filter.sort((a, b) => b.tribeCount2 - a.tribeCount2);
        const filter3 = filter2.sort((a, b) => b.tribeCount - a.tribeCount2);
        setPlacement(sortPlacement(filter3));
      },
    },
  ];

  function handleClick(index: number) {
    tabs[index].filterJobs();
    setActiveTab(index);
  }

  const FirstPlace = () => {
    const {
      raceCount,
      tribeCount,
      tribeCount2,
      raceData: { ID, Icon, Name, Tribes },
    } = firstPlace;

    return (
      <article className="gap-3 w-52 text-center grid justify-center rounded-lg p-4 items-center">
        <div className="px-4 grid justify-center text-gold pb-2">
          <span className="font-extrabold text-lg text-center ">
            1<span className="font-normal">rst</span>
          </span>
        </div>
        <img src={Icon} alt={Name} className="mask mask-squircle w-32" />
        <div className="grid">
          <h3 className="text-2xl">{Name}</h3>
          <h3 className="text-4xl font-bold text-gold">{raceCount}</h3>
        </div>
      </article>
    );
  };

  const SecondPlace = () => {
    const {
      raceCount,
      tribeCount,
      tribeCount2,
      raceData: { ID, Icon, Name, Tribes },
    } = secondPlace;

    return (
      <article className="gap-3 w-40 text-center flex flex-col justify-center rounded-lg p-4 items-center translate-y-10">
        <div className="px-4 grid justify-center text-silver pb-2">
          <span className="font-extrabold text-lg text-center ">
            2<span className="font-normal">nd</span>
          </span>
        </div>
        <img src={Icon} alt={Name} className="mask mask-squircle w-24" />
        <div className="grid">
          <h3 className="text-2xl">{Name}</h3>
          <h3 className="text-4xl font-bold text-gold">{raceCount}</h3>
        </div>
      </article>
    );
  };

  const ThirdPlace = () => {
    const {
      raceCount,
      tribeCount,
      tribeCount2,
      raceData: { ID, Icon, Name, Tribes },
    } = thirdPlace;

    return (
      <article className="gap-3 w-40 text-center flex flex-col justify-center rounded-lg p-4 items-center translate-y-10">
        <div className="px-4 grid justify-center text-bronze pb-2">
          <span className="font-extrabold text-lg text-center ">
            3<span className="font-normal">rd</span>
          </span>
        </div>
        <img src={Icon} alt={Name} className="mask mask-squircle w-24" />
        <div className="grid">
          <h3 className="text-2xl">{Name}</h3>
          <h3 className="text-4xl font-bold text-gold">{raceCount}</h3>
        </div>
      </article>
    );
  };

  const Table = () => {
    return (
      <div className="grid rounded-lg bg-base-300 outline outline-base-100 w-full">
        {everyoneElse.map((raceInfo, index) => {
          const {
            raceCount,
            tribeCount,
            tribeCount2,
            raceData: { ID, Icon, Name, Tribes },
          } = raceInfo;

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
                  <img
                    src={Icon}
                    alt={Name}
                    className="mask mask-squircle w-14"
                  />
                  <span className="text-lg">{Name}</span>
                </div>
                <div className="grid">
                  <span className="text-lg text-gold font-bold">
                    {raceCount}
                  </span>
                </div>
              </article>
              <div className="divider m-0 h-0"></div>
            </>
          );
        })}
      </div>
    );
  };

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
