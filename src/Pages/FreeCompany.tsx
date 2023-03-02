import { useState } from "react";
import { useParams } from "react-router-dom";
import { Footer } from "../Components";
import { useFreeCompanyContext } from "../Contexts/FreeCompanyContext";

import { MainInfo, Members } from "../Components/FreeCompany";

export const FreeCompany = () => {
  const { freeCompany, fetchFreeCompany, fetchLoad } = useFreeCompanyContext();
  const { FreeCompany } = freeCompany;
  const { ActiveMemberCount } = FreeCompany;
  const [activeTab, setActiveTab] = useState<number>(0);

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
