import { FetchProgress } from "@/Components/LoadingComponents/FetchProgress";
import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import { StatsProvider } from "@/Contexts/StatsContext";
import { userLoadingPhrases } from "@/Data/loadingPhrases";
import { Outlet, useLocation } from "react-router-dom";
import { Summary } from "./Summary/Summary";
import { Tabs } from "./Tabs";

export const Stats = () => {
  const { MembersFullData, loadStats } = useFreeCompany();

  const isMembersValid = MembersFullData[0].Character.ID !== 0;

  const isDefaultPath = /Stats/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[0]
  );

  if (!loadStats || !isMembersValid)
    return (
      <div className="rounded-lg bg-base-100">
        <FetchProgress arr={userLoadingPhrases} />
      </div>
    );

  return (
    <StatsProvider>
      <section className="flex  flex-col pb-8">
        <Tabs isDefaultPath={isDefaultPath} />
        <Outlet />
        {isDefaultPath ? <Summary /> : null}
      </section>
    </StatsProvider>
  );
};
