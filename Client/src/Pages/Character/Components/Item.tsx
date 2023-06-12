import { ItemData, ItemFetchData } from "@/Types/CharacterData";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export const Item = ({ data }: { data: ItemData | undefined }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!data)
    return (
      <div className="h-10 w-10 rounded-lg bg-slate-700 shadow-inner outline outline-1 outline-slate-600 sm:h-16 sm:w-16" />
    );

  const { Name, Icon } = data;

  return (
    <div
      className="relative rounded-lg outline outline-1 outline-slate-600"
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

const CreateMateriaSlots = (slots: number, equipped: ItemFetchData[]) => {
  const elements = [];

  const EmptySlot = () => (
    <div className="flex items-center gap-2 rounded-lg hover:bg-base-300">
      <div className="h-6 w-6 rounded-full bg-base-100" />
      <span className="text-xs italic opacity-60">Empty</span>
    </div>
  );

  for (let i = equipped.length; i < slots; i++) {
    elements.push(<EmptySlot />);
  }

  return elements;
};

const MateriaSlot = ({ data }: { data: ItemFetchData }) => {
  const { Icon, Name } = data;
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative flex items-center gap-2 rounded-lg hover:bg-base-300"
      onMouseOver={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => {
        setShowTooltip(true);
      }}
    >
      <img src={Icon} className="h-6 w-6 rounded-full bg-base-100" />
      {Name}
      {showTooltip ? <ItemTooltip data={data} /> : null}
    </div>
  );
};

const Materias = ({
  slots,
  equipped,
}: {
  slots: number;
  equipped: ItemFetchData[] | null;
}) => {
  if (!equipped)
    return (
      <div className="grid gap-2">
        <span className="relative opacity-70">Materia</span>
        <div className="grid gap-1">{CreateMateriaSlots(slots, [])}</div>
      </div>
    );

  return (
    <div className="grid gap-2">
      <span className="relative opacity-70">Materia</span>
      <div className="grid gap-1">
        {equipped.map((materia) => (
          <MateriaSlot data={materia} key={uuid()} />
        ))}
        {CreateMateriaSlots(slots, equipped)}
      </div>
    </div>
  );
};

const ItemsLevels = ({
  equipLv,
  itemLv,
}: {
  equipLv: number;
  itemLv: number;
}) => {
  return (
    <div className="flex justify-between gap-2">
      <span className="flex gap-2">
        <span className="opacity-70">Equip Level</span>
        {equipLv}
      </span>

      <span className="flex gap-2">
        <span className="opacity-70">Item Level</span>
        {itemLv}
      </span>
    </div>
  );
};

const ItemTooltip = ({ data }: { data: ItemFetchData }) => {
  const { Name } = data;
  return (
    <div className="absolute bottom-[60%] left-[60%] z-10 grid w-60 gap-2 rounded-lg bg-base-300 p-3 text-sm shadow-md outline outline-1 outline-slate-700">
      {Name}
    </div>
  );
};

const ShowGlamour = ({ data }: { data: ItemFetchData | null }) => {
  if (!data) return null;

  const { Icon, Name } = data;
  return (
    <div className="grid gap-2">
      <span className="relative opacity-70">Glamour</span>
      <div className="relative flex items-center gap-2 rounded-lg hover:bg-base-300">
        <img src={Icon} className="h-6 w-6 rounded-full bg-base-100" />
        <span className="text-xs">{Name}</span>
      </div>
    </div>
  );
};

export const GearTooltip = ({ data }: { data: ItemData }) => {
  const {
    ID,
    Name,
    ItemLevel,
    EquipLevel,
    MateriaSlots,
    MateriaEquipped,
    Glamour,
  } = data;

  return (
    <div className="absolute bottom-[20%] left-[80%] z-10 grid w-60 gap-2 rounded-lg bg-neutral p-3 text-sm shadow-md outline outline-1 outline-slate-700">
      <span>{Name}</span>

      <div className="divider m-0 h-fit"></div>

      <ItemsLevels equipLv={EquipLevel} itemLv={ItemLevel} />

      <div className="divider m-0 h-fit"></div>

      {MateriaEquipped || MateriaSlots ? (
        <>
          <Materias slots={MateriaSlots} equipped={MateriaEquipped} />
          <div className="divider m-0 h-fit"></div>
        </>
      ) : null}

      {Glamour ? (
        <>
          <ShowGlamour data={data.Glamour} />
          <div className="divider m-0 h-fit"></div>
        </>
      ) : null}

      <div className="grid gap-2">
        <a
          href={`https://www.garlandtools.org/db/#item/${ID}`}
          className="w-full rounded-lg bg-base-100 p-1 text-center duration-100 hover:bg-primary-focus hover:text-neutral"
        >
          See in Garland Tools
        </a>
      </div>
    </div>
  );
};
