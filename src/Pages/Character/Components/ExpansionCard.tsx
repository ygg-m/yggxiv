import { CollectibleTreatedData, TreatedAchievementData } from "@/Types";
import { Link } from "react-router-dom";

interface CardProps {
  Patch: number;
  Name: string;
  Background: string;
  LinkURL: string;
  List: any;
}

export const ExpansionCard = ({
  Patch,
  Name,
  Background,
  LinkURL,
  List,
}: CardProps) => {
  const patchList = List.filter(
    (a: TreatedAchievementData | CollectibleTreatedData) =>
      parseFloat(a.Data.FFXIVCollectData.Patch) > Patch &&
      parseFloat(a.Data.FFXIVCollectData.Patch) < Patch + 1
  );
  const obtainedList = patchList.filter(
    (e: TreatedAchievementData | CollectibleTreatedData) => e.Obtained === true
  );

  const percentage = Math.floor((obtainedList.length / patchList.length) * 100);

  return (
    <Link
      to={LinkURL}
      className="relative z-10 grid h-[35rem] basis-1/5 cursor-pointer items-end justify-center overflow-hidden rounded-lg p-8 text-white outline outline-1 outline-gray-600 duration-200 before:absolute before:z-10 before:h-full before:w-full before:bg-neutral before:bg-opacity-70 before:duration-200 hover:basis-1/3 hover:text-primary hover:outline-primary hover:before:bg-opacity-40 lg:p-0"
    >
      <div className="z-20 grid w-full place-items-center gap-2 rounded-lg bg-neutral bg-opacity-80 p-4 text-center lg:mb-6">
        <h1 className="text-xl font-bold uppercase">{Name}</h1>
        <h2 className="text-lg text-neutral-content">{percentage}%</h2>
      </div>

      <img
        src={Background}
        alt={Name}
        className="absolute -z-10 h-full w-full object-cover"
      />
    </Link>
  );
};
