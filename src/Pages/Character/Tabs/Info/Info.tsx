import { useCharacter } from "@/Contexts/CharacterContext";
import { scrollToTop } from "@/Helpers";
import { BasicInfo } from "./BasicInfo";
import { CollectibleInfo } from "./CollectibleInfo";

export const Info = () => {
  const { char } = useCharacter();
  const { Mounts, Minions } = useCharacter().char.Collection;

  scrollToTop();

  return (
    <section className="grid gap-4 pb-8">
      <BasicInfo data={char} />
      <CollectibleInfo Mounts={Mounts} Minions={Minions} />
    </section>
  );
};
