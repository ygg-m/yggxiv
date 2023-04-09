import { useCharacter } from "@/Contexts/CharacterContext";
import { Link, Outlet, useLocation } from "react-router-dom";

interface CardProps {
  Patch: number;
  Name: string;
  Background: string;
  LinkURL: string;
}

const Card = ({ Patch, Name, Background, LinkURL }: CardProps) => {
  const { List } = useCharacter().char.Achievements;
  const patchList = List.filter(
    (a) =>
      parseFloat(a.Data.FFXIVCollectData.Patch) > Patch &&
      parseFloat(a.Data.FFXIVCollectData.Patch) < Patch + 1
  );
  const obtainedList = patchList.filter((e) => e.Obtained === true);

  const percentage = Math.floor((obtainedList.length / patchList.length) * 100);
  let points: number = 0;

  obtainedList.forEach((e) => (points += e.Data.Points));

  return (
    <Link
      to={LinkURL}
      className="relative z-10 grid h-[35rem] basis-1/5 cursor-pointer items-end justify-center overflow-hidden rounded-lg p-8 text-white outline outline-1 outline-gray-600 duration-200 before:absolute before:z-10 before:h-full before:w-full before:bg-neutral before:bg-opacity-70 before:duration-200 hover:basis-1/3 hover:text-primary hover:outline-primary hover:before:bg-opacity-40 lg:p-0"
    >
      <div className="z-20 grid w-full place-items-center gap-2 rounded-lg bg-neutral bg-opacity-80 p-4 text-center lg:mb-6">
        <h1 className="text-xl font-bold uppercase">{Name}</h1>
        <h2 className="text-lg text-neutral-content">
          {percentage}% Completed
        </h2>
      </div>

      <img
        src={Background}
        alt={Name}
        className="absolute -z-10 h-full w-full object-cover"
      />
    </Link>
  );
};

const ExpansionList = () => (
  <section className="flex flex-col gap-4 lg:flex-row">
    <Card
      Patch={2.0}
      Name="A Realm Reborn"
      Background="https://img.finalfantasyxiv.com/lds/h/l/QpExCxHkd7zpxqXK1cl4Uz8bJ8.jpg?_ga=2.18938430.781238313.1680968566-1091794286.1670936645"
      LinkURL="ARR"
    />
    <Card
      Patch={3.0}
      Name="Heavensward"
      Background="https://fr.web.img6.acsta.net/pictures/19/06/27/18/09/2256112.jpg"
      LinkURL="HW"
    />
    <Card
      Patch={4.0}
      Name="Stormblood"
      Background="https://m.media-amazon.com/images/S/aplus-media/vc/b4076b75-fa48-44a8-a3cc-2b2bca53e91b.jpg"
      LinkURL="SB"
    />
    <Card
      Patch={5.0}
      Name="Shadowbringers"
      Background="https://www.spaziogames.it/wp-content/uploads/2019/02/Final-Fantasy-XIV_2019_02-02-19_023.jpg"
      LinkURL="SHB"
    />
    <Card
      Patch={6.0}
      Name="Endwalker"
      Background="https://i.imgur.com/6Q3ZZHM.jpeg"
      LinkURL="EW"
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

  return isDefaultPath ? <ExpansionList /> : <Outlet />;
};

export const ARR = () => {
  return <div>arr</div>;
};

export const HW = () => {
  return <div>hw</div>;
};

export const SB = () => {
  return <div>sb</div>;
};

export const SHB = () => {
  return <div>shb</div>;
};

export const EW = () => {
  return <div>ew</div>;
};
