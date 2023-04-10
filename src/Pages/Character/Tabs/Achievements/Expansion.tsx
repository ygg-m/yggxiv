import { useCharacter } from "@/Contexts/CharacterContext";
import { TreatedAchievementData } from "@/Types";
import { Outlet, useLocation } from "react-router-dom";
import { ExpansionCard } from "../../Components/ExpansionCard";

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
