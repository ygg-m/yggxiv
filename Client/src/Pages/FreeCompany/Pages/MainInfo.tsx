import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useFreeCompany } from "../../../Contexts/FreeCompanyContext";

import {
  parseAlliedGC,
  parseDate,
  parseEstatePlot,
  parseStaff,
} from "../../../Helpers";
import { MembersListTypes } from "../../../Types";
import { Card } from "../Components/CharacterCard";

export const MainInfo = () => {
  const { freeCompany } = useFreeCompany();
  const { FreeCompany, FreeCompanyMembers: Members } = freeCompany;
  const { Name, Tag, Formed, Rank, Slogan } = FreeCompany;
  const [FormedDate, FormedTime] = parseDate(Formed);

  const BasicInfo = () => {
    const Info = () => {
      return (
        <section className="flex basis-1/2 flex-col rounded-lg bg-base-300 p-6">
          <div className="flex flex-col">
            <div className="text-sm italic opacity-60">Name (Tag)</div>
            <div>{`${Name} (${Tag})`}</div>
          </div>
          <div className="divider"></div>

          <div className="flex flex-col">
            <div className="text-sm italic opacity-60">Formed in</div>
            <div>
              {FormedDate} - {FormedTime}
            </div>
          </div>
          <div className="divider"></div>

          <div className="flex flex-col">
            <div className="text-sm opacity-60">Rank</div>
            <div>{Rank}</div>
          </div>
        </section>
      );
    };

    const Ranks = () => {
      const { Reputation, Ranking } = FreeCompany;
      const { Monthly, Weekly } = Ranking;
      const AlliedGC = parseAlliedGC(Reputation);

      return (
        <section className="flex basis-1/2 flex-col rounded-lg bg-base-300 p-6">
          <div className="flex flex-col">
            <div className="text-sm opacity-60">Allied Grand Company</div>
            <div className="flex gap-2">
              {AlliedGC.Name}
              {AlliedGC.Icon && (
                <img src={AlliedGC.Icon} alt="" className="h-6 rounded-lg" />
              )}
            </div>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col">
            <div className="text-sm opacity-60">Weekly Rank</div>
            <div>{Weekly}º</div>
          </div>
          <div className="divider"></div>

          <div className="flex flex-col">
            <div className="text-sm opacity-60">Montly Rank</div>
            <div>{Monthly}º</div>
          </div>
        </section>
      );
    };

    return (
      <article className="grid gap-4 rounded-b-lg rounded-tr-lg bg-base-100 p-4 md:grid-cols-2">
        <span className="col-span-2 p-4 text-center">{Slogan}</span>
        <Info />
        <Ranks />
      </article>
    );
  };

  const Estate = () => {
    const {
      Estate: { Greeting, Name, Plot: rawPlot },
    } = FreeCompany;
    const { Size, City, Plot, Ward } = parseEstatePlot(rawPlot);

    return (
      <section className="grid gap-4 rounded-lg bg-base-100 p-4 md:grid-cols-2">
        <div className="flex basis-1/2 flex-col gap-4 p-2">
          <h3 className="text-3xl font-bold">
            {Name} <span className="badge badge-md -translate-y-1">{Size}</span>
          </h3>
          <h5 className="">{Greeting}</h5>
        </div>

        <div className="flex basis-1/2 justify-between rounded-lg bg-base-300">
          <div className="flex basis-full flex-col items-center justify-center py-4 px-8">
            <div className="text-sm italic opacity-60">City</div>
            <div className="text-lg font-bold">{City}</div>
          </div>
          <div className="divider divider-horizontal m-0 before:border-2 before:border-base-100 after:border-2 after:border-base-100"></div>
          <div className="flex basis-full flex-col items-center justify-center py-4 px-8">
            <div className="text-sm italic opacity-60">Ward</div>
            <div className="text-lg font-bold">{Ward}</div>
          </div>
          <div className="divider divider-horizontal m-0 before:border-2 before:border-base-100 after:border-2 after:border-base-100"></div>
          <div className="flex basis-full flex-col items-center justify-center p-4">
            <div className="text-sm italic opacity-60">Plot</div>
            <div className="text-lg font-bold">{Plot}</div>
          </div>
        </div>
      </section>
    );
  };

  const Staff = () => {
    const Staffs = parseStaff(Members) as MembersListTypes[];

    return (
      <section className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Staffs.map((member) => {
          const { Avatar, ID, Name, Rank, RankIcon } = member;
          return (
            <Card
              key={uuidv4()}
              Avatar={Avatar}
              ID={ID}
              Name={Name}
              Rank={Rank}
              RankIcon={RankIcon}
            />
          );
        })}
      </section>
    );
  };

  return (
    <section className="grid  gap-4 pb-8">
      <BasicInfo />
      <Estate />
      <Staff />
    </section>
  );
};
