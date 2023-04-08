import { useCharacter } from "@/Contexts/CharacterContext";
import { TreatedAchievementData } from "@/Types/index";
import { v4 as uuid } from "uuid";

export const Achievements = () => {
  const { List, Points, Public } = useCharacter().char.Achievements;

  return (
    <section>
      {List.map((e: TreatedAchievementData) => (
        <div key={uuid()}>{e.Data.Name}</div>
      ))}
    </section>
  );
};
