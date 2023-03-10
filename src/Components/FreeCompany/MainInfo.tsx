import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useFreeCompany } from "../../Contexts/FreeCompanyContext";

import {
  parseAlliedGC,
  parseDate,
  parseEstatePlot,
  parseStaff,
} from "../../Helpers";
import { MembersListTypes } from "../../Types";
import { Card } from "./CharacterCard";

export const MainInfo = () => {
  const { freeCompany } = useFreeCompany();
  const { FreeCompany, FreeCompanyMembers: Members } = freeCompany;
  const { Name, Tag, Formed, Rank, Slogan } = FreeCompany;
  const [FormedDate, FormedTime] = parseDate(Formed);

  const BasicInfo = () => {
    const Info = () => {
      return (
        <section className="flex flex-col basis-1/2 bg-base-300 rounded-lg p-6">
          <div className="flex flex-col">
            <div className="text-sm opacity-60 italic">Name (Tag)</div>
            <div>{`${Name} (${Tag})`}</div>
          </div>
          <div className="divider"></div>

          <div className="flex flex-col">
            <div className="text-sm opacity-60 italic">Formed in</div>
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
        <section className="flex flex-col basis-1/2 bg-base-300 rounded-lg p-6">
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
            <div>{Weekly}??</div>
          </div>
          <div className="divider"></div>

          <div className="flex flex-col">
            <div className="text-sm opacity-60">Montly Rank</div>
            <div>{Monthly}??</div>
          </div>
        </section>
      );
    };

    return (
      <article className="grid md:grid-cols-2 p-4 gap-4 bg-base-100 rounded-b-lg rounded-tr-lg">
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
      <section className="grid md:grid-cols-2 bg-base-100 rounded-lg p-4 gap-4">
        <div className="flex flex-col gap-4 basis-1/2 p-2">
          <h3 className="text-3xl font-bold">
            {Name} <span className="badge badge-md -translate-y-1">{Size}</span>
          </h3>
          <h5 className="">{Greeting}</h5>
        </div>

        <div className="flex bg-base-300 rounded-lg basis-1/2 justify-between">
          <div className="flex flex-col items-center justify-center py-4 px-8 basis-full">
            <div className="text-sm opacity-60 italic">City</div>
            <div className="text-lg font-bold">{City}</div>
          </div>
          <div className="divider divider-horizontal m-0 after:border-2 before:border-2 before:border-base-100 after:border-base-100"></div>
          <div className="flex flex-col items-center justify-center py-4 px-8 basis-full">
            <div className="text-sm opacity-60 italic">Ward</div>
            <div className="text-lg font-bold">{Ward}</div>
          </div>
          <div className="divider divider-horizontal m-0 after:border-2 before:border-2 before:border-base-100 after:border-base-100"></div>
          <div className="flex flex-col items-center justify-center p-4 basis-full">
            <div className="text-sm opacity-60 italic">Plot</div>
            <div className="text-lg font-bold">{Plot}</div>
          </div>
        </div>
      </section>
    );
  };

  const Staff = () => {
    const Staffs = parseStaff(Members) as MembersListTypes[];

    return (
      <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
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
    <section className="grid gap-4 pb-8 min-h-[calc(100vh-448px)]">
      <BasicInfo />
      <Estate />
      <Staff />
    </section>
  );
};
