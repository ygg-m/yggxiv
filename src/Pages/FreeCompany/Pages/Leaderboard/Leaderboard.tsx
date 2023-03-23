import { FetchProgress } from "@/Components/LoadingComponents/FetchProgress";
import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import { StatsProvider } from "@/Contexts/StatsContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Tabs } from "./Tabs";

export const Leaderboard = () => {
  const { MembersFullData, fetchProgress, loadStats } = useFreeCompany();

  const location = useLocation();
  const currentPath = location.pathname.split("/").reverse()[0];
  const paths = ["Mount", "Minion", "Achievement"];
  const isInDefault = !paths.includes(currentPath);

  if (!loadStats) return <FetchProgress value={fetchProgress} />;

  return (
    <StatsProvider>
      <section className="grid min-h-[calc(100vh-448px)] gap-4 pb-8">
        <Tabs />
        <Outlet />
        {isInDefault && <Navigate to="Mount" />}
      </section>
    </StatsProvider>
  );
};
