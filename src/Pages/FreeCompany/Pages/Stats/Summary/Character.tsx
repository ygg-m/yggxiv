import { FemaleIcon, MaleIcon } from "@/Assets/Images/UI";
import { useStats } from "@/Contexts/StatsContext";
import { raceData } from "@/Types";
import { v4 as uuidv4 } from "uuid";
import { ShowData } from "../ShowData";
import { Genders } from "./Genders";

interface RaceProps {
  data: raceData;
}

interface RacesProps {
  data: raceData[];
}

const Race = ({ data }: RaceProps) => {
  const {
    RaceCount,
    TribeCount_1,
    TribeCount_2,
    MaleCount,
    FemaleCount,
    memberList,
  } = data;

  const {
    Name,
    Tribes: { Tribe1, Tribe2 },
  } = data.raceData;

  const { Avatar, Name: CharName } =
    memberList[Math.floor(Math.random() * memberList.length)].Character;

  return (
    <div className="grid gap-2 rounded-lg bg-base-200 p-4 duration-200 hover:bg-base-300">
      <div className="grid justify-center gap-2 p-4">
        <div className="tooltip" data-tip={CharName}>
          <img src={Avatar} alt={Name} className="mask mask-squircle w-24" />
        </div>
        <h4 className="text-center text-lg">{Name}</h4>
      </div>

      <div className="rounded-lg bg-neutral px-4 py-2">
        <ShowData name="Characters" value={RaceCount} />
      </div>

      <div className="rounded-lg bg-neutral px-4 py-2">
        <ShowData name={Tribe1.Name} value={TribeCount_1} />
        <ShowData name={Tribe2.Name} value={TribeCount_2} />
      </div>

      <div className="rounded-lg bg-neutral px-4 py-2">
        <ShowData
          name="Male"
          value={MaleCount}
          icon={<MaleIcon className="h-4 w-4" />}
        />
        <ShowData
          name="Female"
          value={FemaleCount}
          icon={<FemaleIcon className="h-4 w-4" />}
        />
      </div>
    </div>
  );
};

const Races = ({ data }: RacesProps) => {
  const top3 = data.slice(0, 3);

  return (
    <div className="grid gap-2">
      <div className="flex justify-between">
        <h2 className="text-2xl">Most popular Races</h2>
        <button className="btn-primary btn">See full List →</button>
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        {top3.map((race) => (
          <Race key={uuidv4()} data={race} />
        ))}
      </div>
    </div>
  );
};

export const Character = () => {
  const { popularRaces, popularGender } = useStats();
  return (
    <div className="rounded-lg p-8">
      <h2 className="text-3xl font-bold">Character</h2>
      <div className="divider"></div>
      <Races data={popularRaces} />
      <div className="divider"></div>
      <Genders {...popularGender} />
    </div>
  );
};
