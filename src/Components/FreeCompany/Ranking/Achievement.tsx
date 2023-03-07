import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { MedalIcon, TrophyIcon } from "../../../Assets/Images/UI";
import { useFreeCompanyContext } from "../../../Contexts/FreeCompanyContext";
import { formatNumber } from "../../../Helpers";

export const Achievement = () => {
  const { MembersFullData } = useFreeCompanyContext();

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
  const everyoneElse = placement.slice(3);

  const FirstPlace = () => {
    const {
      Achievements: { Points },
      Character: { Name, Avatar },
    } = firstPlace;

    return (
      <article className="gap-3 w-52 text-center cursor-pointer grid justify-center rounded-lg p-4 items-center hover:bg-base-300 duration-300">
        <div className="px-4 grid justify-center text-gold pb-2">
          <span className="font-extrabold text-lg text-center ">
            1<span className="font-normal">rst</span>
          </span>
          <TrophyIcon className="h-12 w-12" />
        </div>
        <div className="flex justify-center">
          <img
            src={Avatar}
            alt={Name}
            className="rounded-full outline outline-gold w-36 duration-300"
          />
        </div>
        <div className="grid">
          <h3 className="text-2xl">{Name}</h3>
          <h3 className="text-4xl font-bold text-gold">
            {formatNumber(Points)}
          </h3>
        </div>
      </article>
    );
  };

  const SecondPlace = () => {
    const {
      Achievements: { Points },
      Character: { Name, Avatar },
    } = secondPlace;
    return (
      <article className="gap-3 w-40 text-center cursor-pointer flex flex-col justify-center rounded-lg p-4 items-center translate-y-10 hover:bg-base-300 duration-300">
        <div className="px-4 grid justify-center text-silver pb-2">
          <span className="font-extrabold text-lg text-center ">
            2<span className="font-normal">nd</span>
          </span>
          <MedalIcon className="h-12 w-12" />
        </div>
        <div className="flex justify-center">
          <img
            src={Avatar}
            alt={Name}
            className="rounded-full outline outline-silver w-24 duration-300"
          />
        </div>
        <div className="grid">
          <h3 className="text-2xl">{Name}</h3>
          <h3 className="text-4xl font-bold text-gold">
            {formatNumber(Points)}
          </h3>
        </div>
      </article>
    );
  };

  const ThirdPlace = () => {
    const {
      Achievements: { Points },
      Character: { Name, Avatar },
    } = thirdPlace;
    return (
      <article className="gap-3 w-40 text-center cursor-pointer flex flex-col justify-center rounded-lg p-4 items-center translate-y-10 hover:bg-base-300 duration-300">
        <div className="px-4 grid justify-center text-bronze pb-2">
          <span className="font-extrabold text-lg text-center ">
            3<span className="font-normal">rd</span>
          </span>
          <MedalIcon className="h-12 w-12" />
        </div>
        <div className="flex justify-center">
          <img
            src={Avatar}
            alt={Name}
            className="rounded-full outline outline-bronze w-24 duration-300"
          />
        </div>
        <div className="grid">
          <h3 className="text-2xl">{Name}</h3>
          <h3 className="text-4xl font-bold text-gold">
            {formatNumber(Points)}
          </h3>
        </div>
      </article>
    );
  };

  const Table = () => {
    return (
      <div className="grid rounded-lg bg-base-300 outline outline-base-100">
        {everyoneElse.map((member, index) => {
          const {
            Achievements: { Points },
            Character: { Name, Avatar },
          } = member;

          if (Points === 0) return null;

          return (
            <>
              <article
                key={uuidv4()}
                className="cursor-pointer justify-between flex flex-col sm:flex-row p-4 gap-4 items-center hover:bg-base-100 duration-300 hover:border-transparent"
              >
                <div className="flex items-center gap-4 flex-col sm:flex-row">
                  <span className="w-8 text-center sm:text-left">
                    {index + 4}º
                  </span>
                  <img
                    src={Avatar}
                    alt={Name}
                    className="mask mask-squircle h-12"
                  />
                  <span className="text-lg">{Name}</span>
                </div>
                <div className="grid">
                  <span className="text-lg font-bold text-gold">
                    {formatNumber(Points)}
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
    <section>
      <div className="flex w-full justify-center mb-4 pb-12">
        <SecondPlace />
        <FirstPlace />
        <ThirdPlace />
      </div>
      <Table />
    </section>
  );
};
