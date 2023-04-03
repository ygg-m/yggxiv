import { useCharacter } from "@/Contexts/CharacterContext";
import { ItemData, ItemFetchData } from "@/Types/CharacterData";
import { useState } from "react";
import { GearTooltip } from "./Tooltip";

export const GearSet = () => {
  const { Gear } = useCharacter().char.ActiveStats;

  const getItemLevel = () => {
    const LevelList = [
      Gear.Hands.MainHand?.ItemLevel,
      Gear.Hands.OffHand?.ItemLevel,
      Gear.Body.Head?.ItemLevel,
      Gear.Body.Chest?.ItemLevel,
      Gear.Body.Hands?.ItemLevel,
      Gear.Body.Feet?.ItemLevel,
      Gear.Accessories.Necklace?.ItemLevel,
      Gear.Accessories.Earrings?.ItemLevel,
      Gear.Accessories.Bracelet?.ItemLevel,
      Gear.Accessories.Ring1?.ItemLevel,
      Gear.Accessories.Ring2?.ItemLevel,
    ].filter((e) => e !== undefined);

    let sum: number = 0;

    for (const level of LevelList) if (level) sum += level;

    const result = Math.floor(sum / LevelList.length);

    return result;
  };

  const GearPiece = ({ data }: { data: ItemData | undefined }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    if (!data)
      return (
        <div className="h-10 w-10 rounded-lg bg-slate-700 shadow-inner outline outline-1 outline-slate-600 sm:h-16 sm:w-16" />
      );

    const { Name, Icon } = data;

    return (
      <div
        className="relative h-10 w-10 rounded-lg outline outline-1 outline-slate-600 sm:h-16 sm:w-16"
        onMouseOver={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => {
          setShowTooltip(true);
        }}
      >
        <img src={Icon} alt={Name} className="h-full w-full rounded-lg" />
        {showTooltip ? <GearTooltip data={data} /> : null}
      </div>
    );
  };

  const PortraitArea = () => {
    const { Portrait, Name } = useCharacter().char.Profile;

    const ShowJob = () => {
      const { Name, Image, Level } = useCharacter().char.ActiveStats.Job;

      return (
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={Image}
              alt={Name}
              className="mask mask-squircle h-12 w-12 bg-dps p-2"
            />
            <div className="grid">
              <span className="text-lg font-bold text-primary">{Name}</span>
              <span className="text-sm">Level {Level}</span>
            </div>
          </div>
          <div className="grid text-right">
            <span className="text-sm opacity-70">Item Level</span>
            <span className="text-xl font-bold text-primary">
              {getItemLevel()}
            </span>
          </div>
        </div>
      );
    };

    return (
      <div className="grid gap-4 px-4">
        <ShowJob />
        <img
          src={Portrait}
          alt={Name}
          className="max-h-[700px] rounded-lg outline outline-1 outline-slate-600"
        />
      </div>
    );
  };

  return (
    <article className="grid grid-cols-[4rem_1fr_4rem]">
      <div className="flex flex-col justify-between gap-2">
        <div className="grid gap-2">
          <GearPiece data={Gear.Accessories.SoulCrystal} />
        </div>
        <div className="grid gap-2">
          <GearPiece data={Gear.Hands.MainHand} />
          <div className="h-10 w-10 sm:h-16 sm:w-16" />
          <GearPiece data={Gear.Body.Head} />
          <GearPiece data={Gear.Body.Chest} />
          <GearPiece data={Gear.Body.Hands} />
          <GearPiece data={Gear.Body.Feet} />
        </div>
      </div>
      <PortraitArea />
      <div className="flex flex-col justify-end gap-2">
        <GearPiece data={Gear.Hands.OffHand} />
        <GearPiece data={Gear.Accessories.Necklace} />
        <GearPiece data={Gear.Accessories.Earrings} />
        <GearPiece data={Gear.Accessories.Bracelet} />
        <GearPiece data={Gear.Accessories.Ring1} />
        <GearPiece data={Gear.Accessories.Ring2} />
      </div>
    </article>
  );
};
