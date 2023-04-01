import { useCharacter } from "@/Contexts/CharacterContext";
import { BasicInfo } from "./BasicInfo";

export const CharInfo = () => {
  const { char } = useCharacter();

  return (
    <section className="grid min-h-[calc(100vh-464px)] gap-4 pb-8">
      <BasicInfo data={char} />
    </section>
  );
};
