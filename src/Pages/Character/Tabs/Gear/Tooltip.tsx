import { ItemData, ItemFetchData } from "@/Types/CharacterData";

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

  return (
    <div className="flex items-center gap-2 rounded-lg hover:bg-base-300">
      <img src={Icon} className="h-6 w-6 rounded-full bg-base-100" />
      {Name}
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
    <div className="absolute bottom-[50%] left-[50%] z-10 grid w-60 gap-2 rounded-lg bg-neutral p-3 text-sm shadow-md">
      <span>{Name}</span>

      <div className="divider m-0 h-fit"></div>

      <div className="flex justify-between gap-2">
        <span className="flex gap-2">
          <span className="opacity-70">Equip Level</span>
          {EquipLevel}
        </span>

        <span className="flex gap-2">
          <span className="opacity-70">Item Level</span>
          {ItemLevel}
        </span>
      </div>

      <div className="divider m-0 h-fit"></div>

      <div className="grid gap-2">
        <span className="relative opacity-70">Materia</span>
        <div className="grid gap-1">
          {MateriaEquipped.map((materia) => (
            <MateriaSlot data={materia} />
          ))}
          {CreateMateriaSlots(MateriaSlots, MateriaEquipped)}
        </div>
      </div>

      <div className="divider m-0 h-fit"></div>

      <div className="grid gap-2">
        <span className="relative opacity-70">Glamour</span>
        <div className="relative flex items-center gap-2 rounded-lg hover:bg-base-300">
          <img
            src={Glamour.Icon}
            className="h-6 w-6 rounded-full bg-base-100"
          />
          <span className="text-xs">{Glamour.Name}</span>
        </div>
      </div>

      <div className="divider m-0 h-fit"></div>

      <div className="grid gap-2">
        <a
          href={`https://www.garlandtools.org/db/#item/${ID}`}
          className="w-full rounded-lg bg-base-100 p-1 text-center duration-300 hover:bg-primary-focus hover:text-neutral"
        >
          See in Garland Tools
        </a>
      </div>
    </div>
  );
};
