import { useParams } from "react-router-dom";
import { useFreeCompanyContext } from "../Contexts/FreeCompanyContext";
import {
  parseAlliedGC,
  parseDate,
  parseEstatePlot,
  parseStaff,
} from "../Helpers/index";
import { FreeCompanyMembersSmall } from "../Helpers/xviapi";

export const FreeCompany = () => {
  const { freeCompany, fetchFreeCompany, fetchLoad } = useFreeCompanyContext();
  const { FreeCompany } = freeCompany;
  const { FreeCompanyMembers: Members } = freeCompany;

  const { fcId } = useParams();
  if (freeCompany.FreeCompany.ID === "") {
    fetchFreeCompany(fcId);
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <button className="btn btn-square loading"></button>
      </div>
    );
  }

  const CoverImage = () => {
    return (
      <img
        src="https://img.finalfantasyxiv.com/lds/h/U/0P1ncRVYw3wO_6OEYE375vk-0I.jpg?_ga=2.111044928.472477140.1677699247-1091794286.1670936645"
        className="w-screen h-60 object-cover border-b border-neutral-500"
        alt="Cover Image"
      />
    );
  };

  const ProfileImage = () => {
    const { Crest } = FreeCompany;
    return (
      <div className="relative w-32 h-32 overflow-hidden rounded-xl -mt-16 shadow-2xl outline outline-1 outline-neutral-500">
        <div className="absolute">
          <img src={Crest[0]} alt="" />
        </div>
        <div className="absolute">
          <img src={Crest[1]} alt="" />
        </div>
        <div className="absolute">
          <img src={Crest[2]} alt="" />
        </div>
      </div>
    );
  };

  const FC_Name = () => {
    const { Name } = FreeCompany;
    return (
      <h1 className="text-5xl font-bold flex items-center gap-4">{Name}</h1>
    );
  };

  const Server = () => {
    const { Server, DC } = FreeCompany;
    const DataCenter = DC.replace("]", "");
    return (
      <div className="mt-4 flex gap-2 items-center">
        <div className="py-3 badge badge-md bg-neutral-800">{DataCenter}</div>
        <div className="py-3 badge badge-md bg-rose-900 text-rose-200">
          {Server}
        </div>
      </div>
    );
  };

  const Navigator = () => {
    const { ActiveMemberCount } = FreeCompany;
    return (
      <nav className="flex">
        <div className="tabs">
          <a className="tab tab-lifted tab-active duration-300">Profile</a>
          <a className="tab tab-lifted duration-300">
            Members ({ActiveMemberCount})
          </a>
        </div>
      </nav>
    );
  };

  const Profile = () => {
    const { Name, Tag, Formed, Rank } = FreeCompany;
    const [FormedDate, FormedTime] = parseDate(Formed);

    const BasicInfo = () => {
      return (
        <section className="flex flex-col basis-1/2 bg-gray-700 rounded-lg p-6">
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
        <section className="flex flex-col basis-1/2 bg-gray-700 rounded-lg p-6">
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
      <article className="flex p-4 gap-4 bg-gray-800 rounded-b-lg rounded-tr-lg">
        <BasicInfo />
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
      <section className="flex basis-1/2 bg-gray-800 rounded-lg p-4 mt-4 gap-4">
        <div className="flex flex-col gap-4 basis-1/2 p-2">
          <h3 className="text-3xl font-bold">
            {Name} <span className="badge badge-md -translate-y-1">{Size}</span>
          </h3>
          <h5 className="">{Greeting}</h5>
        </div>

        <div className="flex bg-gray-700 rounded-lg basis-1/2 justify-between">
          <div className="flex flex-col items-center justify-center py-4 px-8 basis-full">
            <div className="text-sm opacity-60 italic">City</div>
            <div className="text-lg font-bold">{City}</div>
          </div>
          <div className="divider divider-horizontal m-0"></div>
          <div className="flex flex-col items-center justify-center py-4 px-8 basis-full">
            <div className="text-sm opacity-60 italic">Ward</div>
            <div className="text-lg font-bold">{Ward}</div>
          </div>
          <div className="divider divider-horizontal m-0"></div>

          <div className="flex flex-col items-center justify-center p-4 basis-full">
            <div className="text-sm opacity-60 italic">Plot</div>
            <div className="text-lg font-bold">{Plot}</div>
          </div>
        </div>
      </section>
    );
  };

  const Staff = () => {
    const Staffs = parseStaff(Members) as FreeCompanyMembersSmall[];

    type CardProps = {
      Avatar: string;
      ID: number;
      Name: string;
      Rank: string;
      RankIcon: string;
    };

    const Card: React.FC<CardProps> = ({
      Avatar,
      ID,
      Name,
      Rank,
      RankIcon,
    }) => {
      return (
        <article className="flex gap-4 p-6 outline outline-1 outline-gray-700 rounded-lg hover:bg-rose-900 hover:outline-rose-900 hover:text-rose-200 duration-300 cursor-pointer">
          <img
            src={Avatar}
            alt={`Profile Picture from ${Name}`}
            className="h-16 w-16 rounded-full"
          />
          <div className="flex flex-col gap-2 justify-center">
            <span className="font-bold">{Name}</span>
            <span className="flex gap-2 items-center">
              <img src={RankIcon} alt={"Rank Icon"} />
              {Rank}
            </span>
          </div>
        </article>
      );
    };

    return (
      <section className="mt-4 pb-8 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Staffs.map((member) => {
          const { Avatar, ID, Name, Rank, RankIcon } = member;
          return (
            <Card
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

  if (fetchLoad)
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <button className="btn btn-square loading"></button>
      </div>
    );

  return (
    <div className="w-screen bg-neutral-900 min-h-screen flex flex-col items-center">
      <CoverImage />
      <div className="w-screen max-w-screen-2xl flex flex-col px-8">
        <header className="w-full flex gap-8 items-center mb-4">
          <ProfileImage />
          <FC_Name />
          <Server />
        </header>
        <Navigator />
        <Profile />
        <Estate />
        <Staff />
      </div>
    </div>
  );
};
