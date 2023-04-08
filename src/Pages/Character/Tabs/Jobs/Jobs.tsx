import { useCharacter } from "@/Contexts/CharacterContext";
import { scrollToBottom } from "@/Helpers";
import { Bozjan, Elemental, JobList } from "./";

// bg-tank
// bg-healer
// bg-dps
// bg-gatherer
// bg-crafter

export const Jobs = () => {
  const { char } = useCharacter();
  const { Battle, CraftGather, Bozjan: BozData, Elemental: ElData } = char.Jobs;

  scrollToBottom();

  const SpecialJobs = () => {
    return BozData || ElData ? (
      <section className="flex flex-col gap-4 rounded-lg bg-base-100 p-4 md:flex-row">
        <Bozjan data={BozData} />
        <Elemental data={ElData} />
      </section>
    ) : null;
  };

  const BattleJobs = () => {
    return (
      <article className="grid place-items-center gap-4 md:grid-cols-2">
        <JobList data={Battle.Tanks} />
        <JobList data={Battle.Healers} />
        <JobList data={Battle.Melee} />
        <JobList data={Battle.RangedPhys} />
        <JobList data={Battle.RangedMagic} />
      </article>
    );
  };

  const CraftGatherJobs = () => {
    return (
      <article className="grid place-items-center gap-4 md:grid-cols-2">
        <JobList data={CraftGather.Craft} />
        <JobList data={CraftGather.Gather} />
      </article>
    );
  };

  return (
    <article className="mb-8 flex flex-col gap-4">
      <SpecialJobs />
      <BattleJobs />
      <CraftGatherJobs />
    </article>
  );
};
