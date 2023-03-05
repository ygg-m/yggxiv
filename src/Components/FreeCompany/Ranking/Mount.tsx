import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { MedalIcon, TrophyIcon } from "../../../Assets/Images/UI";
import { useFreeCompanyContext } from "../../../Contexts/FreeCompanyContext";

export const Mount = () => {
  const { MembersFullData } = useFreeCompanyContext();

  const placement = useMemo(
    () =>
      MembersFullData.sort(
        (a, b) =>
          (b.Mounts ? b.Mounts.length : 0) - (a.Mounts ? a.Mounts.length : 0)
      ),
    MembersFullData
  );

  const firstPlace = useMemo(() => placement.slice(0, 1)[0], placement);
  const secondPlace = useMemo(() => placement.slice(1, 2)[0], placement);
  const thirdPlace = useMemo(() => placement.slice(2, 3)[0], placement);
  const everyoneElse = useMemo(() => placement.slice(3), placement);

  const FirstPlace = () => {
    const {
      Mounts,
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
          <h3 className="text-2xl">{Mounts.length} Mounts</h3>
        </div>
      </article>
    );
  };

  const SecondPlace = () => {
    const {
      Mounts,
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
          <span className="text-2xl">{Mounts.length} Mounts</span>
        </div>
      </article>
    );
  };

  const ThirdPlace = () => {
    const {
      Mounts,
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
          <h3 className="text-2xl">{Mounts.length} Mounts</h3>
        </div>
      </article>
    );
  };

  const Table = () => {
    return (
      <div className="grid gap-3">
        {everyoneElse.map((member, index) => {
          const {
            Mounts,
            Character: { Name, Avatar },
          } = member;

          return (
            <article
              key={uuidv4()}
              className="cursor-pointer flex flex-col md:flex-row border border-base-100 rounded-lg p-4 gap-4 items-center hover:bg-primary duration-300 hover:border-transparent"
            >
              <span className="w-8">{index + 4}º</span>
              <img
                src={Avatar}
                alt={Name}
                className="mask mask-squircle h-12"
              />
              <div className="grid">
                <span className="text-lg font-bold">{Name}</span>
                <span className="text-lg">{Mounts?.length || 0} Mounts</span>
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
