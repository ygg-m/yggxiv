import BackgroundARR from "@/Assets/Images/Expansions/A Realm Reborn.jpg";
import BackgroundEW from "@/Assets/Images/Expansions/Endwalker.jpg";
import BackgroundHW from "@/Assets/Images/Expansions/Heavensward.jpg";
import BackgroundSHB from "@/Assets/Images/Expansions/Shadowbringers.jpg";
import BackgroundSB from "@/Assets/Images/Expansions/Stormblood.jpg";
import { useCharacter } from "@/Contexts/CharacterContext";
import {
  AllianceRaidAchievements,
  BlueMageAchievements,
  BlueMageFeatsAchievements,
  ExtremeAchievements,
  RaidAchievements,
  RelicToolsAchievements,
  RelicWeaponsAchievements,
  SavageAchievements,
  UltimateAchievements,
} from "@/Data/achievements";
import { getDataFromPatch } from "@/Helpers";
import { TreatedAchievementData } from "@/Types";

interface ExpansionProps {
  Patch: number;
  Name: string;
  Background: string;
}

interface DataProps {
  Name: string;
  List: TreatedAchievementData[];
  Icon?: any;
}

const Header = ({ Name, Background }: { Name: string; Background: string }) => (
  <div className="relative z-0 grid h-16 w-full place-items-center rounded-lg before:absolute before:z-0 before:h-full before:w-full before:rounded-lg before:bg-neutral before:bg-opacity-70">
    <h1 className="z-10 text-lg italic text-white">{Name}</h1>
    <img
      src={Background}
      alt=""
      className="absolute -z-10 h-full w-full rounded-lg object-cover"
    />
  </div>
);

const Item = ({ Name, List, Icon }: DataProps) => {
  const Obtained = List.filter((e) => e.Obtained === true);
  const Percentage = Math.floor((Obtained.length / List.length) * 100);

  return (
    <div
      className={`relative flex items-center justify-between rounded-lg ${
        Percentage === 100 ? "text-primary" : ""
      }`}
    >
      <span className="flex items-center gap-2">
        {Icon && (
          <div className="flex h-6 w-6 items-center justify-center">
            <img
              src={Icon}
              alt={Name}
              className={`h-full w-full object-contain ${
                Percentage === 100 ? "" : "opacity-60 grayscale"
              }`}
            />
          </div>
        )}
        <span className="">{Name}</span>
      </span>

      <span className="">{Percentage}%</span>
    </div>
  );
};

export const Stats = () => {
  const { List } = useCharacter().char.Achievements;

  if (List.length === 0) return <>loading</>;

  return (
    <section className="grid gap-4">
      <article className="rounded-lg bg-base-100 p-4">
        <h1 className="">Jobs</h1>
        [Chart]
      </article>
      <article className="grid gap-4 md:grid-cols-3">
        <ARR Patch={2.0} Name="A Realm Reborn" Background={BackgroundARR} />
        <ARR Patch={3.0} Name="Heavensward" Background={BackgroundHW} />
        <ARR Patch={4.0} Name="Stormblood" Background={BackgroundSB} />
        <ARR Patch={5.0} Name="Shadowbringers" Background={BackgroundSHB} />
        <ARR Patch={6.0} Name="Endwalker" Background={BackgroundEW} />
      </article>
      CharStats
    </section>
  );
};

function removeAchieveBasedOnCity(List: TreatedAchievementData[], ID: number) {
  if (ID === 0) {
    List.splice(1, 2);
  } else if (ID === 1) {
    List.splice(0, 1);
    List.splice(1, 1);
  } else if (ID === 2) {
    List.splice(0, 2);
  }

  return List;
}

const ARR = ({ Patch, Name, Background }: ExpansionProps) => {
  const { List } = useCharacter().char.Achievements;
  const { StarterCity } = useCharacter().char.Profile;
  const PatchList = getDataFromPatch(Patch, List);

  const ListMSQ = removeAchieveBasedOnCity(
    PatchList.filter((e) => e.Data.Category === "Main Scenario"),
    StarterCity.ID - 1
  );
  const ListRaids = PatchList.filter((e) =>
    RaidAchievements.some((a) => a.ID === e.Data.ID)
  );
  const ListTrials = PatchList.filter((e) =>
    SavageAchievements.some((a) => a.ID === e.Data.ID)
  );
  const ListAlliances = PatchList.filter((e) =>
    AllianceRaidAchievements.some((a) => a.ID === e.Data.ID)
  );
  const ListSavage = PatchList.filter((e) =>
    SavageAchievements.some((a) => a.ID === e.Data.ID)
  );
  const ListExtreme = PatchList.filter((e) =>
    ExtremeAchievements.some((a) => a.ID === e.Data.ID)
  );
  const ListUltimate = PatchList.filter((e) =>
    UltimateAchievements.some((a) => a.ID === e.Data.ID)
  );
  const ListRelicWeapon = PatchList.filter((e) =>
    RelicWeaponsAchievements.some((a) => a.ID === e.Data.ID)
  );
  const ListRelicTools = PatchList.filter((e) =>
    RelicToolsAchievements.some((a) => a.ID === e.Data.ID)
  );
  const ListBlueMage = PatchList.filter((e) =>
    BlueMageAchievements.some((a) => a.ID === e.Data.ID)
  );
  const ListBlueMageFeats = PatchList.filter((e) =>
    BlueMageFeatsAchievements.some((a) => a.ID === e.Data.ID)
  );

  return (
    <div className="grid gap-2 rounded-lg bg-base-100 p-2">
      <Header Name={Name} Background={Background} />

      <div className="z-0 grid gap-1 rounded-lg bg-base-300 px-4 py-2">
        <Item
          Name="MSQ"
          List={ListMSQ}
          Icon="https://ffxiv.gamerescape.com/w/images/4/41/Mainquest1_Icon.png"
        />
      </div>

      <div className="z-0 grid gap-1 rounded-lg bg-base-300 px-4 py-2">
        <Item
          Name="Raid"
          List={ListRaids}
          Icon="https://ffxiv.gamerescape.com/w/images/thumb/3/31/061802.png/32px-061802.png"
        />
        <Item
          Name="Alliance"
          List={ListAlliances}
          Icon="https://ffxiv.gamerescape.com/w/images/thumb/3/31/061802.png/32px-061802.png"
        />
      </div>

      <div className="z-0 grid gap-1 rounded-lg bg-base-300 px-4 py-2">
        <Item
          Name="Extreme"
          List={ListExtreme}
          Icon="https://ffxiv.gamerescape.com/w/images/thumb/c/c4/061804.png/32px-061804.png"
        />
        <Item
          Name="Savage"
          List={ListSavage}
          Icon="https://ffxiv.gamerescape.com/w/images/thumb/5/51/061832.png/32px-061832.png"
        />
        {ListUltimate.length > 0 && (
          <Item
            Name="Ultimate"
            List={ListUltimate}
            Icon="https://ffxiv.gamerescape.com/w/images/thumb/5/51/061832.png/32px-061832.png"
          />
        )}
      </div>

      <div className="z-0 grid gap-1 rounded-lg bg-base-300 px-4 py-2">
        {ListRelicWeapon.length > 0 && (
          <Item
            Name="Relic Weapons"
            List={ListRelicWeapon}
            Icon="https://xivapi.com/i/026000/026635_hr1.png"
          />
        )}
        {ListRelicTools.length > 0 && (
          <Item
            Name="Relic Tools"
            List={ListRelicTools}
            Icon="https://ffxiv.gamerescape.com/w/images/0/08/061816.png"
          />
        )}
      </div>

      {ListBlueMage.length > 0 && (
        <div className="z-0 grid gap-1 rounded-lg bg-base-300 px-4 py-2">
          <Item
            Name="Masked Carnivalle"
            List={ListBlueMage}
            Icon="https://ffxiv.gamerescape.com/w/images/a/a4/DPS_Icon_1.png"
          />
          {ListBlueMageFeats.length > 0 && (
            <Item
              Name="Blue Mage Feats"
              List={ListBlueMageFeats}
              Icon="https://ffxiv.gamerescape.com/w/images/0/08/061816.png"
            />
          )}
        </div>
      )}
    </div>
  );
};
