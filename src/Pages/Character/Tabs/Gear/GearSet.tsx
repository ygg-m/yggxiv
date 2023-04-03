import { useCharacter } from "@/Contexts/CharacterContext";
import { ItemData, ItemFetchData } from "@/Types/CharacterData";
import { useState } from "react";
import { GearTooltip } from "./Tooltip";

export const GearSet = () => {
  const { Gear } = useCharacter().char.ActiveStats;

  const GearPiece = ({ data }: { data: ItemData | undefined }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    if (!data)
      return (
        <div className="h-16 w-16 rounded-lg bg-slate-600 shadow-inner outline outline-1 outline-slate-700" />
      );

    const { Name, Icon } = data;

    return (
      <div
        className="relative h-16 w-16 rounded-lg outline outline-1 outline-slate-700"
        onMouseOver={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => {
          setShowTooltip(true);
        }}
      >
        <img src={Icon} alt={Name} className="h-full w-full" />
        {showTooltip ? <GearTooltip data={data} /> : null}
      </div>
    );
  };

  const PortraitArea = () => {
    const { Portrait, Name } = useCharacter().char.Profile;

    const ShowJob = () => (
      <div className="flex items-center gap-2 text-lg">
        <img
          src="https://xivapi.com/cj/1/blackmage.png"
          alt="Black Mage"
          className="mask mask-squircle h-12 w-12 bg-dps p-2"
        />
        <span className="font-bold text-primary">Black Mage</span> Level 90
      </div>
    );

    return (
      <div className="grid gap-4 px-4">
        <ShowJob />
        <img src={Portrait} alt={Name} className="max-h-[600px] rounded-lg" />
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
          <div className="h-16 w-16" />
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
