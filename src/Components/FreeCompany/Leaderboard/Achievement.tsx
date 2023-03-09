import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { MedalIcon, TrophyIcon } from "../../../Assets/Images/UI";
import { useFreeCompany } from "../../../Contexts/FreeCompanyContext";
import { formatNumber } from "../../../Helpers";

export const Achievement = () => {
  const { MembersFullData } = useFreeCompany();

  const placement = useMemo(
    () =>
      MembersFullData.sort((a, b) => {
        if (a.Achievements.Points || b.Achievements.Points)
          return b.Achievements.Points - a.Achievements.Points;
        else return 0;
      }),
    MembersFullData
  );

  const firstPlace = placement.slice(0, 1)[0];
  const secondPlace = placement.slice(1, 2)[0];
  const thirdPlace = placement.slice(2, 3)[0];
  const everyoneElse = placement
    .slice(3)
    .filter((e) => e.Achievements.Points !== 0);

  const FirstPlace = () => {
    const {
      Achievements: { Points },
      Character: { Name, Portrait },
    } = firstPlace;

    return (
      <article className="-order-1 sm:order-2 gap-3 sm:w-64 p-2 sm:h-[530px] text-center cursor-pointer flex flex-col justify-center rounded-lg items-center hover:bg-base-300 duration-300">
        <div className="px-4 grid justify-center text-gold pb-2">
          <span className="font-extrabold text-lg text-center ">
            1<span className="font-normal">rst</span>
          </span>
          <TrophyIcon className="h-12 w-12" />
        </div>

        <div className="relative justify-center w-full h-96 sm:h-full overflow-hidden rounded-xl outline-1 outline outline-gold ">
          <img
            src={Portrait}
            alt={Name}
            className="object-cover w-full sm:h-full duration-300"
          />
          <div className="grid pb-2 absolute bottom-0 w-full bg-neutral bg-opacity-90 rounded-xl border-t border-t-gold px-2">
            <h3 className="text-2xl">{Name}</h3>
            <h3 className="text-4xl font-bold text-gold">
              {formatNumber(Points)}
            </h3>
          </div>
        </div>
      </article>
    );
  };

  const SecondPlace = () => {
    const {
      Achievements: { Points },
      Character: { Name, Portrait },
    } = secondPlace;
    return (
      <article className="order-1 self-end sm:order-2 gap-3 sm:w-52 p-2 sm:h-[430px] text-center cursor-pointer flex flex-col justify-center rounded-lg items-center hover:bg-base-300 duration-300">
        <div className="px-4 grid justify-center text-silver pb-2">
          <span className="font-extrabold text-lg text-center ">
            2<span className="font-normal">nd</span>
          </span>
          <MedalIcon className="h-12 w-12" />
        </div>

        <div className="relative justify-center h-full">
          <img
            src={Portrait}
            alt={Name}
            className="rounded-xl object-cover outline-1 outline outline-silver h-full duration-300"
          />
          <div className="grid pb-2 absolute bottom-0 w-full bg-neutral bg-opacity-90 rounded-xl border-t border-t-silver px-2">
            <h3 className="text-xl">{Name}</h3>
            <h3 className="text-2xl font-bold text-gold">
              {formatNumber(Points)}
            </h3>
          </div>
        </div>
      </article>
    );
  };

  const ThirdPlace = () => {
    const {
      Achievements: { Points },
      Character: { Name, Portrait },
    } = thirdPlace;
    return (
      <article className="order-3 self-end sm:order-2 gap-3 sm:w-52 p-2 sm:h-[380px] text-center cursor-pointer flex flex-col justify-center rounded-lg items-center hover:bg-base-300 duration-300">
        <div className="px-4 grid justify-center text-bronze pb-2">
          <span className="font-extrabold text-lg text-center ">
            3<span className="font-normal">rd</span>
          </span>
          <MedalIcon className="h-9 w-9" />
        </div>

        <div className="relative justify-center h-full">
          <img
            src={Portrait}
            alt={Name}
            className="rounded-xl object-cover outline-1 outline outline-bronze h-full duration-300"
          />
          <div className="grid pb-2 absolute bottom-0 w-full bg-neutral bg-opacity-90 rounded-xl border-t border-t-bronze px-2">
            <h3 className="text-xl">{Name}</h3>
            <h3 className="text-2xl font-bold text-gold">
              {formatNumber(Points)}
            </h3>
          </div>
        </div>
      </article>
    );
  };

  const Table = () => {
    return (
      <div className="grid rounded-lg bg-base-300 w-full max-w-[672px] outline outline-base-100">
        {everyoneElse.map((member, index) => {
          const {
            Achievements: { Points },
            Character: { Name, Avatar },
          } = member;

          return (
            <>
              <article
                key={uuidv4()}
                className="cursor-pointer sm:justify-between flex flex-row p-4 gap-4 items-center hover:bg-base-100 duration-300 hover:border-transparent"
              >
                <div className="flex items-center gap-4 flex-row w-24">
                  <span className="w-8 text-center sm:text-left">
                    {index + 4}º
                  </span>
                  <img
                    src={Avatar}
                    alt={Name}
                    className="mask mask-squircle h-12 w-12"
                  />
                </div>
                <div className="flex sm:w-full flex-col sm:flex-row justify-between">
                  <span className="text-lg">{Name}</span>
                  <span className="text-lg text-gold font-bold">
                    {formatNumber(Points)}
                  </span>
                </div>
              </article>
              {everyoneElse[index] !==
                everyoneElse[everyoneElse.length - 1] && (
                <div className="divider m-0 h-0"></div>
              )}
            </>
          );
        })}
      </div>
    );
  };

  return (
    <section>
      <div className="flex w-full justify-center mb-4 pb-12 gap-2 flex-col sm:flex-row">
        <SecondPlace />
        <FirstPlace />
        <ThirdPlace />
      </div>
      <div className="flex justify-center">
        <Table />
      </div>
    </section>
  );
};
