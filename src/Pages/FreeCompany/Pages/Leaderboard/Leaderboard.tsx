import { FetchProgress } from "@/Components/LoadingComponents/FetchProgress";
import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import { StatsProvider } from "@/Contexts/StatsContext";
import { userLoadingPhrases } from "@/Data/loadingPhrases";
import { Navigate, Outlet, useLocation } from "react-router-dom";
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

  if (!loadStats) return <FetchProgress arr={userLoadingPhrases} />;

  return (
    <StatsProvider>
      <section className="grid min-h-[calc(100vh-448px)] gap-4 pb-8">
        <Tabs isDefaultPath={isDefaultPath} />
        <Outlet />
        {isDefaultPath ? <Mount /> : null}
      </section>
    </StatsProvider>
  );
};
