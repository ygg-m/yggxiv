import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFreeCompanyContext } from "../../Contexts/FreeCompanyContext";
import { Achievement, Minion, Mount } from "./Ranking/index";

export const Ranking = () => {
  const { MembersFullData, membersFetchLoad, fetchProgress } =
    useFreeCompanyContext();
  const [activeTab, setActiveTab] = useState<number>(0);

  const isMemberDataEmpty = MembersFullData[0]?.Character?.ID === 0;
  if (isMemberDataEmpty || membersFetchLoad)
    return (
      <section className="grid gap-4 pb-8 min-h-[calc(100vh-448px)]">
        <nav className="navbar grid bg-base-100 rounded-lg h-fit">
          <button className="btn loading">
            Getting members info ({fetchProgress}%)
          </button>
        </nav>
      </section>
    );

  const tabs = [
    {
      label: "Mount",
      content: <Mount />,
    },
    {
      label: "Minion",
      content: <Minion />,
    },
    {
      label: "Achievement",
      content: <Achievement />,
    },
  ];

  return (
    <section className="grid gap-4 pb-8 min-h-[calc(100vh-448px)]">
      <nav className="p-2 grid md:grid-cols-3 bg-base-100 rounded-lg h-fit">
        {tabs.map((tab, index) => (
          <a
            key={uuidv4()}
            className={`tab tab-lg tabs-boxed duration-300 bg-base-100 ${
              index === activeTab ? "tab-active bg-base-300" : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </a>
        ))}
      </nav>
      <article>{tabs[activeTab].content}</article>
    </section>
  );
};
