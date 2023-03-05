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
  const firstPlace = useMemo(() => placement.slice(0, 1)[0], placement);
  const secondPlace = useMemo(() => placement.slice(1, 2)[0], placement);
  const thirdPlace = useMemo(() => placement.slice(2, 3)[0], placement);
  const everyoneElse = useMemo(() => placement.slice(3), placement);

  const FirstPlace = () => {
    const {
      Achievements: { Points },
      Character: { Name, Avatar },
    } = firstPlace;

    return (
      <article className="cursor-pointer flex flex-col md:flex-row border border-base-100 bg-base-100 rounded-lg p-4 gap-4 items-center text-gold hover:bg-primary duration-300 hover:border-transparent">
        <div className="px-4 grid justify-center">
          <TrophyIcon className="h-12 w-12" />
          <span className="font-extrabold text-lg text-center">1rst</span>
        </div>
        <img src={Avatar} alt={Name} className="mask mask-squircle" />
        <div className="grid">
          <h3 className="text-2xl font-bold">{Name}</h3>
          <h3 className="text-2xl">{formatNumber(Points)} Points</h3>
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
      <article className="cursor-pointer flex flex-col md:flex-row border border-base-100 bg-base-100 rounded-lg p-4 gap-4 items-center text-silver hover:bg-primary duration-300 hover:border-transparent">
        <div className="px-4 grid justify-center">
          <MedalIcon className="h-12 w-12" />
          <span className="font-extrabold text-lg text-center">2nd</span>
        </div>
        <img src={Avatar} alt={Name} className="mask mask-squircle" />
        <div className="grid">
          <span className="text-2xl font-bold">{Name}</span>
          <span className="text-2xl">{formatNumber(Points)} Points</span>
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
      <article className="cursor-pointer flex flex-col md:flex-row border border-base-100 bg-base-100 rounded-lg p-4 gap-4 items-center text-bronze hover:bg-primary duration-300 hover:border-transparent">
        <div className="px-4 grid justify-center">
          <MedalIcon className="h-12 w-12" />
          <span className="font-extrabold text-lg text-center">3rd</span>
        </div>
        <img src={Avatar} alt={Name} className="mask mask-squircle" />
        <div className="grid">
          <h3 className="text-2xl font-bold">{Name}</h3>
          <h3 className="text-2xl">{formatNumber(Points)} Points</h3>
        </div>
      </article>
    );
  };

  const Table = () => {
    return (
      <div className="grid gap-3">
        {everyoneElse.map((member, index) => {
          const {
            Achievements: { Points },
            Character: { Name, Avatar },
          } = member;

          if (Points === 0) return null;

          return (
            <article
              key={uuidv4()}
              className="cursor-pointer flex flex-col md:flex-row border border-base-100 rounded-lg p-4 gap-4 items-center hover:bg-primary duration-300 hover:border-transparent"
            >
              <div className="px-4 grid justify-center">
                <span className="text-center">{index + 4}º</span>
              </div>
              <img
                src={Avatar}
                alt={Name}
                className="mask mask-squircle h-12"
              />
              <div className="grid">
                <span className="text-lg font-bold">{Name}</span>
                <span className="text-lg">{formatNumber(Points)} Points</span>
              </div>
            </article>
          );
        })}
      </div>
    );
  };

  return (
    <section>
      <div className="grid gap-4 mb-4">
        <FirstPlace />
        <SecondPlace />
        <ThirdPlace />
      </div>
      <div className="divider"></div>
      <Table />
    </section>
  );
};
