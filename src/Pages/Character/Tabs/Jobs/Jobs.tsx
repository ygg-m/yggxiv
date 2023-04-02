import { useCharacter } from "@/Contexts/CharacterContext";
import {
  Bozjan,
  Crafters,
  Elemental,
  Gatherers,
  Healers,
  Melee,
  RangedMagic,
  RangedPhys,
  Tanks,
} from "./";

export const CharJobs = () => {
  const { char } = useCharacter();
  const { Battle, CraftGather, Bozjan: BozData, Elemental: ElData } = char.Jobs;

  const SpecialJobs = () => {
    return BozData || ElData ? (
      <section className="flex gap-4 rounded-lg bg-base-100 p-4">
        <Bozjan data={BozData} />
        <Elemental data={ElData} />
      </section>
    ) : null;
  };

  const BattleJobs = () => {
    return (
      <article className="grid md:grid-cols-2">
        <Tanks data={Battle.Tanks} />
        <Healers data={Battle.Healers} />
        <Melee data={Battle.Melee} />
        <RangedPhys data={Battle.RangedPhys} />
        <RangedMagic data={Battle.RangedMagic} />
      </article>
    );
  };

  const CraftGatherJobs = () => {
    return (
      <article>
        <Crafters data={CraftGather.Craft} />
        <Gatherers data={CraftGather.Gather} />
      </article>
    );
  };

  return (
    <article className="flex flex-col gap-4">
      <SpecialJobs />
      <BattleJobs />
      <CraftGatherJobs />
    </article>
  );
};
