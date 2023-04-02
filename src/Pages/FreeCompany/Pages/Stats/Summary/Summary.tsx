import { FetchProgress } from "@/Components/LoadingComponents/FetchProgress";
import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import { userLoadingPhrases } from "@/Data/loadingPhrases";
import { Achievements } from "./Achievements";
import { Character } from "./Character";
import { Job } from "./Job";
import { Minion } from "./Minion";
import { Mount } from "./Mount";

export const Summary = () => {
  const { loadStats } = useFreeCompany();
  if (!loadStats) return <FetchProgress arr={userLoadingPhrases} />;

  return (
    <section className="mt-4 grid gap-4">
      <Character />
      <Job />
      <Mount />
      <Minion />
      <Achievements />
    </section>
  );
};
