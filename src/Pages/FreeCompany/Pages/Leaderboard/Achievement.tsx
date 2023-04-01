import { v4 as uuidv4 } from "uuid";
import { MedalIcon, TrophyIcon } from "../../../../Assets/Images/UI";
import { useStats } from "../../../../Contexts/StatsContext";
import { formatNumber } from "../../../../Helpers";
import { CharacterData } from "../../../../Types";

export const Achievement = () => {
  const { getAchievementLeaderboard } = useStats();

  const placement = getAchievementLeaderboard();

  const FirstPlace = () => {
    if (placement.FirstPlace === undefined) return null;

    const {
      Achievements: { Points },
      Character: { Name, Portrait },
    } = placement.FirstPlace;

    return (
      <article className="-order-1 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg p-2 text-center duration-300 hover:bg-base-300 sm:order-2 sm:h-[530px] sm:w-64">
        <div className="grid justify-center px-4 pb-2 text-gold">
          <span className="text-center text-lg font-extrabold ">
            1<span className="font-normal">rst</span>
          </span>
          <TrophyIcon className="h-12 w-12" />
        </div>

        <div className="relative h-96 w-full justify-center overflow-hidden rounded-xl outline outline-1 outline-gold sm:h-full ">
          <img
            src={Portrait}
            alt={Name}
            className="w-full object-cover duration-300 sm:h-full"
          />
          <div className="absolute bottom-0 grid w-full rounded-xl border-t border-t-gold bg-neutral bg-opacity-90 px-2 pb-2">
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
    if (placement.SecondPlace === undefined) return null;

    const {
      Achievements: { Points },
      Character: { Name, Portrait },
    } = placement.SecondPlace;
    return (
      <article className="order-1 flex cursor-pointer flex-col items-center justify-center gap-3 self-end rounded-lg p-2 text-center duration-300 hover:bg-base-300 sm:order-2 sm:h-[430px] sm:w-52">
        <div className="grid justify-center px-4 pb-2 text-silver">
          <span className="text-center text-lg font-extrabold ">
            2<span className="font-normal">nd</span>
          </span>
          <MedalIcon className="h-12 w-12" />
        </div>

        <div className="relative h-full justify-center">
          <img
            src={Portrait}
            alt={Name}
            className="h-full rounded-xl object-cover outline outline-1 outline-silver duration-300"
          />
          <div className="absolute bottom-0 grid w-full rounded-xl border-t border-t-silver bg-neutral bg-opacity-90 px-2 pb-2">
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
    if (placement.ThirdPlace === undefined) return null;

    const {
      Achievements: { Points },
      Character: { Name, Portrait },
    } = placement.ThirdPlace;
    return (
      <article className="order-3 flex cursor-pointer flex-col items-center justify-center gap-3 self-end rounded-lg p-2 text-center duration-300 hover:bg-base-300 sm:order-2 sm:h-[380px] sm:w-52">
        <div className="grid justify-center px-4 pb-2 text-bronze">
          <span className="text-center text-lg font-extrabold ">
            3<span className="font-normal">rd</span>
          </span>
          <MedalIcon className="h-9 w-9" />
        </div>

        <div className="relative h-full justify-center">
          <img
            src={Portrait}
            alt={Name}
            className="h-full rounded-xl object-cover outline outline-1 outline-bronze duration-300"
          />
          <div className="absolute bottom-0 grid w-full rounded-xl border-t border-t-bronze bg-neutral bg-opacity-90 px-2 pb-2">
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
      <div className="grid w-full max-w-[672px] rounded-lg bg-base-300 outline outline-base-100">
        {placement.EveryoneElse.map((member: CharacterData, index: number) => {
          const {
            Achievements: { Points },
            Character: { Name, Avatar },
          } = member;

          return (
            <div key={uuidv4()}>
              <article className="flex cursor-pointer flex-row items-center gap-4 p-4 duration-300 hover:border-transparent hover:bg-base-100 sm:justify-between">
                <div className="flex w-24 flex-row items-center gap-4">
                  <span className="w-8 text-center sm:text-left">
                    {index + 4}º
                  </span>
                  <img
                    src={Avatar}
                    alt={Name}
                    className="mask mask-squircle h-12 w-12"
                  />
                </div>
                <div className="flex flex-col justify-between sm:w-full sm:flex-row">
                  <span className="text-lg">{Name}</span>
                  <span className="text-lg font-bold text-gold">
                    {formatNumber(Points)}
                  </span>
                </div>
              </article>
              {placement.EveryoneElse[index] !==
                placement.EveryoneElse[placement.EveryoneElse.length - 1] && (
                <div className="divider m-0 h-0"></div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section>
      <div className="mb-4 flex w-full flex-col justify-center gap-2 pb-12 sm:flex-row">
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
