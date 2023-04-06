import { useCharacter } from "@/Contexts/CharacterContext";
import { BasicInfo } from "./BasicInfo";
import { CollectibleInfo } from "./CollectibleInfo";

export const Info = () => {
  const { char } = useCharacter();

  return (
    <section className="grid gap-4 pb-8">
      <BasicInfo data={char} />
      <CollectibleInfo data={char.Collection} />
    </section>
  );
};
