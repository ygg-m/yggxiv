import { useCharacter } from "@/Contexts/CharacterContext";
import { TreatedAchievementData } from "@/Types";
import { Link, Outlet, useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { ExpansionCard } from "../../Components/ExpansionCard";
import { Group } from "./Group";
import { getGroups } from "./helpers";

import BackgroundARR from "@/Assets/Images/Expansions/A Realm Reborn.jpg";
import BackgroundEW from "@/Assets/Images/Expansions/Endwalker.jpg";
import BackgroundHW from "@/Assets/Images/Expansions/Heavensward.jpg";
import BackgroundSHB from "@/Assets/Images/Expansions/Shadowbringers.jpg";
import BackgroundSB from "@/Assets/Images/Expansions/Stormblood.jpg";

const ExpansionList = ({ List }: { List: TreatedAchievementData[] }) => (
  <section className="flex flex-col gap-4 lg:flex-row">
    <ExpansionCard
      Patch={2.0}
      Name="A Realm Reborn"
      Background="https://img.finalfantasyxiv.com/lds/h/l/QpExCxHkd7zpxqXK1cl4Uz8bJ8.jpg?_ga=2.18938430.781238313.1680968566-1091794286.1670936645"
      LinkURL="ARealmReborn"
      List={List}
    />
    <ExpansionCard
      Patch={3.0}
      Name="Heavensward"
      Background="https://fr.web.img6.acsta.net/pictures/19/06/27/18/09/2256112.jpg"
      LinkURL="Heavensward"
      List={List}
    />
    <ExpansionCard
      Patch={4.0}
      Name="Stormblood"
      Background="https://m.media-amazon.com/images/S/aplus-media/vc/b4076b75-fa48-44a8-a3cc-2b2bca53e91b.jpg"
      LinkURL="Stormblood"
      List={List}
    />
    <ExpansionCard
      Patch={5.0}
      Name="Shadowbringers"
      Background="https://www.spaziogames.it/wp-content/uploads/2019/02/Final-Fantasy-XIV_2019_02-02-19_023.jpg"
      LinkURL="Shadowbringers"
      List={List}
    />
    <ExpansionCard
      Patch={6.0}
      Name="Endwalker"
      Background="https://i.imgur.com/6Q3ZZHM.jpeg"
      LinkURL="Endwalker"
      List={List}
    />
  </section>
);

export const Expansion = () => {
  const isDefaultPath = /Expansion/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[0]
  );

  const { List } = useCharacter().char.Achievements;

  return isDefaultPath ? <ExpansionList List={List} /> : <Outlet />;
};

const AchieveList = ({
  List,
  Background,
  Name,
}: {
  List: TreatedAchievementData[];
  Background: string;
  Name: string;
}) => {
  const groupList = getGroups(List);
  const percentage = Math.floor(
    (List.filter((e) => e.Obtained === true).length / List.length) * 100
  );
  let Points: number = 0;

  List.forEach((e) => {
    if (e.Obtained === true) Points += e.Data.Points;
  });

  const isStrictDefaultPath = /Expansion|Mounts|Minions/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[0]
  );

  const Header = () => (
    <div className="relative z-0 flex items-center justify-between rounded-lg outline outline-1 outline-gray-600 before:absolute before:-z-10 before:h-full before:w-full before:rounded-lg before:bg-neutral before:bg-opacity-50">
      <h1 className="h-fit pl-4 text-xl uppercase italic text-white sm:text-4xl md:text-3xl lg:text-4xl">
        {Name}
      </h1>

      <div className="flex items-center gap-2 p-4">
        <span className="text-gray-400">Total</span>
        <h1 className="rounded-lg bg-base-100 p-2 px-4">
          <span className="text-primary">{Points}</span> Points
        </h1>
        <h2 className="rounded-lg bg-base-100 p-2 px-4">
          {List.filter((e) => e.Obtained === true).length} / {List.length} (
          {percentage}%)
        </h2>
      </div>

      <img
        src={Background}
        alt="Background"
        className="absolute -z-20 h-full w-full rounded-lg object-cover"
      />
    </div>
  );

  return (
    <section className="grid gap-4">
      <Link
        to={`../`}
        className="grid w-fit place-items-center rounded-lg bg-base-100 p-2 px-4 text-sm duration-100 hover:bg-primary hover:text-neutral"
      >
        Select Expansion
      </Link>
      <Header />
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

export const ARR = () => {
  const { List } = useCharacter().char.Achievements;

  const FilteredList = List.filter(
    (e) =>
      parseFloat(e.Data.FFXIVCollectData.Patch) >= 2.0 &&
      parseFloat(e.Data.FFXIVCollectData.Patch) < 3.0
  );

  return (
    <AchieveList
      List={FilteredList}
      Background={BackgroundARR}
      Name="A Realm Reborn"
    />
  );
};

export const HW = () => {
  const { List } = useCharacter().char.Achievements;

  const FilteredList = List.filter(
    (e) =>
      parseFloat(e.Data.FFXIVCollectData.Patch) >= 3.0 &&
      parseFloat(e.Data.FFXIVCollectData.Patch) < 4.0
  );

  return (
    <AchieveList
      List={FilteredList}
      Background={BackgroundHW}
      Name="Heavensward"
    />
  );
};

export const SB = () => {
  const { List } = useCharacter().char.Achievements;

  const FilteredList = List.filter(
    (e) =>
      parseFloat(e.Data.FFXIVCollectData.Patch) >= 4.0 &&
      parseFloat(e.Data.FFXIVCollectData.Patch) < 5.0
  );

  return (
    <AchieveList
      List={FilteredList}
      Background={BackgroundSB}
      Name="Stormblood"
    />
  );
};

export const SHB = () => {
  const { List } = useCharacter().char.Achievements;

  const FilteredList = List.filter(
    (e) =>
      parseFloat(e.Data.FFXIVCollectData.Patch) >= 5.0 &&
      parseFloat(e.Data.FFXIVCollectData.Patch) < 6.0
  );

  return (
    <AchieveList
      List={FilteredList}
      Background={BackgroundSHB}
      Name="Shadowbringers"
    />
  );
};

export const EW = () => {
  const { List } = useCharacter().char.Achievements;

  const FilteredList = List.filter(
    (e) =>
      parseFloat(e.Data.FFXIVCollectData.Patch) >= 6.0 &&
      parseFloat(e.Data.FFXIVCollectData.Patch) < 7.0
  );

  return (
    <AchieveList
      List={FilteredList}
      Background={BackgroundEW}
      Name="Endwalker"
    />
  );
};
