import { useCharacter } from "@/Contexts/CharacterContext";
import { TreatedAchievementData } from "@/Types";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { getGroups } from "./helpers";

interface GroupProps {
  Name: string;
  List: TreatedAchievementData[];
}

const Item = ({ data }: { data: TreatedAchievementData }) => {
  const { Obtained, Date } = data;
  const { Name, Icon, Description } = data.Data;
  //   const { Patch, Owned } = data.Data.FFXIVCollectData;

  const ShowIcon = ({ Icon, Name }: { Icon: string; Name: string }) => (
    <div>
      <img
        src={Icon}
        alt={Name}
        className={`mask mask-squircle ${Obtained ? "grayscale-50" : ""}`}
      />
    </div>
  );

  const ShowName = ({ Name }: { Name: string }) => <div>{Name}</div>;

  return (
    <div className="border-b border-base-100 duration-100">
      <div
        className={`grid grid-cols-[3rem_.4fr_1fr_5rem] items-center gap-4 p-2 ${
          Obtained ? "hover:bg-base-300" : "opacity-30 hover:bg-neutral"
        }`}
      >
        <ShowIcon Icon={Icon} Name={Name} />
        <div>{Name}</div>
        <div>{Description}</div>
        <div>20 Points</div>
      </div>
    </div>
  );
};

const Group = ({ Name, List }: GroupProps) => {
  const obtainedList = List.filter((e) => e.Obtained === true);
  const percentage = Math.floor((obtainedList.length / List.length) * 100);

  const [showList, setShowList] = useState<boolean>(false);

  const Header = () => (
    <div
      className="flex w-full cursor-pointer justify-between rounded-lg bg-neutral p-4 duration-100 hover:bg-base-100"
      onClick={() => setShowList(!showList)}
    >
      <span>{Name}</span>
      <span>
        {obtainedList.length}
        <span className="text-gray-500">
          {" "}
          / {List.length} ({percentage}%)
        </span>
      </span>
    </div>
  );

  return (
    <article className="rounded-lg outline outline-1 outline-base-100">
      <Header />

      {showList && List.map((e) => <Item key={uuid()} data={e} />)}
    </article>
  );
};

export const FullList = () => {
  const { List, Points, Public } = useCharacter().char.Achievements;

  const groupList = getGroups(List);

  return (
    <section className="grid gap-4">
      {groupList.map((e) => (
        <Group
          key={uuid()}
          Name={e}
          List={List.filter((a) => a.Data.Group === e)}
        />
      ))}
    </section>
  );
};
