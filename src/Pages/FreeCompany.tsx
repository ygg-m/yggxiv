import { useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Footer } from "../Components";
import { MainInfo, Members, Ranking, Stats } from "../Components/FreeCompany";
import { useFreeCompanyContext } from "../Contexts/FreeCompanyContext";

export const FreeCompany = () => {
  const {
    freeCompany,
    fetchFreeCompany,
    baseFetchLoad,
    MembersFullData,
    fetchMembersData,
  } = useFreeCompanyContext();
  const { FreeCompany } = freeCompany;
  const { ActiveMemberCount } = FreeCompany;
  const [activeTab, setActiveTab] = useState<number>(0);

  const { fcId } = useParams();

  const isMemberDataEmpty =
    MembersFullData[0]?.Character?.ID === 0 || MembersFullData.length === 0;
  const isFCDataEmpty = freeCompany.FreeCompany.ID === "0";
  const isFCDataDifferent = freeCompany.FreeCompany.ID !== fcId;
  const isMemberDataDifferent =
    freeCompany.FreeCompanyMembers.filter(
      (e) => e.ID === MembersFullData[0]?.Character?.ID
    ).length === 0;

  if (isFCDataDifferent || isFCDataEmpty) {
    fetchFreeCompany(fcId);

    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <button className="btn loading">Getting free company info</button>
      </div>
    );
  }

  if (isMemberDataEmpty || isMemberDataDifferent) fetchMembersData();

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
          <img src={Crest[0]} alt="" className="absolute" />
          <img src={Crest[1]} alt="" className="absolute" />
          <img src={Crest[2]} alt="" className="absolute" />
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
        <div className="md:mt-4 flex gap-2 items-center">
          <div className="py-3 badge badge-md bg-neutral-800">{DataCenter}</div>
          <div className="py-3 badge badge-md bg-primary text-rose-200">
            {Server}
          </div>
        </div>
      );
    };
    return (
      <header className="w-full flex flex-col md:flex-row md:gap-8 gap-4 items-center mb-8">
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
      label: "Ranking",
      content: <Ranking />,
    },
    {
      label: "Stats",
      content: <Stats />,
    },
  ];

  if (baseFetchLoad)
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
        <article className="tab-content">{tabs[activeTab].content}</article>
      </div>
      <Footer />
    </div>
  );
};
