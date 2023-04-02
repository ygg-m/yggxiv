import { FetchProgress } from "@/Components/LoadingComponents/FetchProgress";
import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import { StatsProvider } from "@/Contexts/StatsContext";
import { userLoadingPhrases } from "@/Data/loadingPhrases";
import { Outlet, useLocation } from "react-router-dom";
import { Mount } from "./Mount";
import { Tabs } from "./Tabs";

export const Leaderboard = () => {
  const { loadStats } = useFreeCompany();

  const isDefaultPath = /Leaderboard/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[0]
  );

  if (!loadStats)
    return (
      <div className="rounded-lg bg-base-100">
        <FetchProgress arr={userLoadingPhrases} />
      </div>
    );

  return (
    <StatsProvider>
      <section className="grid  gap-4 pb-8">
        <Tabs isDefaultPath={isDefaultPath} />
        <Outlet />
        {isDefaultPath ? <Mount /> : null}
      </section>
    </StatsProvider>
  );
};
