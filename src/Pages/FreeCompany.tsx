import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../Components";
import { useFreeCompanyContext } from "../Contexts/FreeCompanyContext";
import {
  parseAlliedGC,
  parseDate,
  parseEstatePlot,
  parseStaff,
} from "../Helpers/index";
import { FreeCompanyMembersSmall } from "../Types/index";

export const FreeCompany = () => {
  const { freeCompany, fetchFreeCompany, fetchLoad } = useFreeCompanyContext();
  const { FreeCompany } = freeCompany;
  const { ActiveMemberCount } = FreeCompany;
  const { FreeCompanyMembers } = freeCompany;
  const [activeTab, setActiveTab] = useState<number>(0);
  const [memberFilterOpen, setMemberFilterOpen] = useState(false);

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

  const Header = () => {
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
          <div className="py-3 badge badge-md bg-primary text-rose-200">
            {Server}
          </div>
        </div>
      );
    };
    return (
      <header className="w-full flex gap-8 items-center mb-4">
        <ProfileImage />
        <FC_Name />
        <Server />
      </header>
    );
  };

  const Navigator = () => {
    return (
      <nav className="flex">
        <div className="tabs">
          {tabs.map((tab, index) => (
            <span
              key={index}
              className={`tab tab-lg tab-lifted duration-300 ${
                index === activeTab ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </span>
          ))}
        </div>
      </nav>
    );
  };

  const MainInfo = () => {
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
              {Name}{" "}
              <span className="badge badge-md -translate-y-1">{Size}</span>
            </h3>
            <h5 className="">{Greeting}</h5>
          </div>

          <div className="flex bg-base-300 rounded-lg basis-1/2 justify-between">
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
      const Staffs = parseStaff(
        FreeCompanyMembers
      ) as FreeCompanyMembersSmall[];

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
          <Link to={`/Character/${ID}`}>
            <article className="flex gap-4 p-6 outline outline-1 outline-base-300 rounded-lg hover:bg-primary hover:outline-primary hover:text-rose-200 duration-300 cursor-pointer">
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
          </Link>
        );
      };

      return (
        <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

    return (
      <section className="grid gap-4 pb-8 min-h-[calc(100vh-448px)]">
        <BasicInfo />
        <Estate />
        <Staff />
      </section>
    );
  };

  const Members = () => {
    const MemberFilter = () => {
      const FilterButton = () => {
        return (
          <button
            className={`btn gap-4 ${
              memberFilterOpen ? "bg-primary hover:bg-primary" : ""
            }`}
            onClick={() => {
              setMemberFilterOpen(!memberFilterOpen);
            }}
          >
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 512 512"
            >
              <path d="M0 416c0-17.7 14.3-32 32-32l54.7 0c12.3-28.3 40.5-48 73.3-48s61 19.7 73.3 48L480 384c17.7 0 32 14.3 32 32s-14.3 32-32 32l-246.7 0c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48L32 448c-17.7 0-32-14.3-32-32zm192 0a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM384 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm-32-80c32.8 0 61 19.7 73.3 48l54.7 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-54.7 0c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l246.7 0c12.3-28.3 40.5-48 73.3-48zM192 64a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm73.3 0L480 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l-214.7 0c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48L32 128C14.3 128 0 113.7 0 96S14.3 64 32 64l86.7 0C131 35.7 159.2 16 192 16s61 19.7 73.3 48z" />
            </svg>{" "}
            filters
          </button>
        );
      };

      const FilterContent = () => {
        return (
          <div
            className={`duration-300 ${
              memberFilterOpen ? "h-fit visible mt-2" : "h-0 invisible"
            }`}
          >
            Filters content
          </div>
        );
      };

      const SearchButton = () => {
        return (
          <button className="btn btn-square hover:bg-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        );
      };

      return (
        <nav className="navbar grid bg-base-100 rounded-lg">
          <div className="flex justify-between">
            <FilterButton />
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search Member"
                  className="input input-bordered"
                />
                <SearchButton />
              </div>
            </div>
          </div>
          <FilterContent />
        </nav>
      );
    };

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
        <Link to={`/Character/${ID}`}>
          <article className="flex gap-4 p-6 outline outline-1 outline-base-300 rounded-lg hover:bg-primary hover:outline-primary hover:text-rose-200 duration-300 cursor-pointer">
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
        </Link>
      );
    };

    const List = () => {
      return (
        <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {FreeCompanyMembers.map((member) => {
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

    return (
      <section className="grid gap-4 pb-8 min-h-[calc(100vh-448px)]">
        <MemberFilter />
        <List />
      </section>
    );
  };

  const Ranks = () => {
    return (
      <section className="grid gap-4 pb-8 min-h-[calc(100vh-448px)]">
        Content for Ranks Tab
      </section>
    );
  };

  const Stats = () => {
    return <section className="grid gap-4 pb-8">Content for Stats Tab</section>;
  };

  const tabs = [
    {
      label: "Info",
      content: <MainInfo />,
    },
    {
      label: `Members (${ActiveMemberCount})`,
      content: <Members />,
    },
    {
      label: "Ranks",
      content: <Ranks />,
    },
    {
      label: "Stats",
      content: <Stats />,
    },
  ];

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
        <Header />
        <Navigator />
        <div className="tab-content">{tabs[activeTab].content}</div>
      </div>
      <Footer />
    </div>
  );
};
