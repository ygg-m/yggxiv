import { useCharacter } from "@/Contexts/CharacterContext";

export const CharInfo = () => {
  const { char } = useCharacter();

  const BasicInfo = () => {
    const { Bio } = char.Profile;

    return (
      <article className="grid gap-4 rounded-b-lg rounded-tr-lg bg-base-100 p-4">
        <div className="h-fit w-full rounded-lg bg-base-200 p-4 text-center">
          {Bio}
        </div>

        <div className="grid w-full rounded-lg p-4 md:grid-cols-2">{Bio}</div>
      </article>
    );
  };

  return (
    <section className="grid min-h-[calc(100vh-464px)] gap-4 pb-8">
      <BasicInfo />
    </section>
  );
};
