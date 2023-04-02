import { useCharacter } from "@/Contexts/CharacterContext";
import { Bozjan } from "./Bozjan";
import { Crafters } from "./Crafters";
import { Elemental } from "./Elemental";
import { Gatherers } from "./Gatherers";
import { Healers } from "./Healers";
import { Melee } from "./Melee";
import { RangedMagic } from "./RangedMagic";
import { RangedPhys } from "./RangedPhys";
import { Tanks } from "./Tanks";

export const CharJobs = () => {
  const { char } = useCharacter();
  const { Battle, CraftGather, Bozjan: BozData, Elemental: ElData } = char.Jobs;

  const SpecialJobs = () => {
    return BozData || ElData ? (
      <section className="flex gap-2">
        <Bozjan data={BozData} />
        <Elemental data={ElData} />
      </section>
    ) : null;
  };

  const BattleJobs = () => {
    return (
      <>
        <Tanks data={Battle.Tanks} />
        <Healers data={Battle.Healers} />
        <Melee data={Battle.Melee} />
        <RangedPhys data={Battle.RangedPhys} />
        <RangedMagic data={Battle.RangedMagic} />
      </>
    );
  };

  const CraftGatherJobs = () => {
    return (
      <>
        <Crafters data={CraftGather.Craft} />
        <Gatherers data={CraftGather.Gather} />
      </>
    );
  };

  return (
    <article className="flex flex-col gap-4 rounded-lg rounded-b-lg bg-base-100 p-4">
      <SpecialJobs />
      <BattleJobs />
      <CraftGatherJobs />
    </article>
  );
};
