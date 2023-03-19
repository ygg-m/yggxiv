import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Footer } from "../Components";
import {
  Leaderboard,
  MainInfo,
  Members,
  Stats,
} from "../Components/FreeCompany";
import { useFreeCompany } from "../Contexts/FreeCompanyContext";

export const FreeCompany = () => {
  const { freeCompany, fetchFreeCompany, baseFetchLoad, MembersFullData } =
    useFreeCompany();
  const { FreeCompany } = freeCompany;
  const { ActiveMemberCount } = FreeCompany;
  const [activeTab, setActiveTab] = useState<number>(0);

  const { fcId } = useParams();

  const isMemberDataEmpty =
    MembersFullData[0]?.Character?.ID === 0 || MembersFullData.length === 0;
  const isFCDataEmpty = freeCompany.FreeCompany.ID === "0";
  const isFCDataDifferent = freeCompany.FreeCompany.ID !== fcId;
  const isMemberDataDifferent =
    freeCompany.FreeCompanyMembers[0]?.ID !== MembersFullData[0]?.Character?.ID;

  const CoverImage = () => {
    return (
      <img
        src="https://img.finalfantasyxiv.com/lds/h/U/0P1ncRVYw3wO_6OEYE375vk-0I.jpg?_ga=2.111044928.472477140.1677699247-1091794286.1670936645"
        className="h-60 w-screen border-b border-neutral-500 object-cover"
        alt="Cover Image"
      />
    );
  };

  const Header = () => {
    const ProfileImage = () => {
      const { Crest } = FreeCompany;
      return (
        <div className="relative -mt-16 h-32 w-32 overflow-hidden rounded-xl shadow-2xl outline outline-1 outline-neutral-500">
          <img src={Crest[0]} alt="" className="absolute" />
          <img src={Crest[1]} alt="" className="absolute" />
          <img src={Crest[2]} alt="" className="absolute" />
        </div>
      );
    };

    const FC_Name = () => {
      const { Name } = FreeCompany;
      return (
        <h1 className="flex items-center gap-4 text-5xl font-bold">{Name}</h1>
      );
    };

    const Server = () => {
      const { Server, DC } = FreeCompany;
      const DataCenter = DC.replace("]", "");
      return (
        <div className="flex items-center gap-2 md:mt-4">
          <div className="badge badge-md bg-neutral-800 py-3">{DataCenter}</div>
          <div className="text-rose-200 badge-primary badge badge-md py-3">
            {Server}
          </div>
        </div>
      );
    };
    return (
      <header className="mb-8 flex w-full flex-col items-center gap-4 md:flex-row md:gap-8">
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
              key={uuidv4()}
              className={`tab-lifted tab tab-lg duration-300 ${
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

  const MemoizedNavigator = memo(Navigator);

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
      label: "Leaderboard",
      content: <Leaderboard />,
    },
    {
      label: "Stats",
      content: <Stats />,
    },
  ];

  if (isFCDataDifferent || isFCDataEmpty) {
    fetchFreeCompany(fcId);
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <button className="loading btn">Getting free company info</button>
      </div>
    );
  }

  if (baseFetchLoad)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <button className="loading btn-square btn"></button>
      </div>
    );

  return (
    <div className="flex min-h-screen w-screen flex-col items-center bg-neutral-900">
      <CoverImage />
      <div className="flex w-screen max-w-screen-2xl flex-col px-2 pr-4 sm:px-8">
        <Header />
        <MemoizedNavigator />
        <article className="tab-content">{tabs[activeTab].content}</article>
      </div>
      <Footer />
    </div>
  );
};
