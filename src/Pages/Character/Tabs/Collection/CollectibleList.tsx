import { CollectibleData, CollectibleTreatedData } from "@/Types";
import { v4 as uuid } from "uuid";

interface Props {
  FilteredList: CollectibleTreatedData[];
  ListLength: number;
  Index: number;
  setIndex: Function;
}

interface ItemProps {
  Obtained: boolean;
  Data: CollectibleData;
}

const Item = ({ Data, Obtained }: ItemProps) => {
  if (!Data) return null;

  const { Icon, Name, Portrait } = Data;
  // const { Patch, Sources } = data.Data.FFXIVCollectData;

  return Obtained ? (
    <div className="grid place-items-center gap-2 rounded-lg bg-base-300 p-2 duration-100  hover:bg-base-100 hover:saturate-150">
      <img src={Portrait} alt={Name} className="aspect-square" />
      <h4 className="text-center">{Name}</h4>
    </div>
  ) : (
    <div className="grid place-items-center gap-2 rounded-lg bg-base-300 p-2 opacity-30  duration-100 hover:bg-base-100 hover:opacity-70">
      <img src={Portrait} alt={Name} className="grayscale-50 aspect-square" />
      <h4 className="text-center">{Name}</h4>
    </div>
  );
};

export const CollectibleList = ({
  FilteredList,
  ListLength,
  Index,
  setIndex,
}: Props) => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-4 gap-2 lg:grid-cols-7 xl:grid-cols-8">
        {FilteredList.map((Collectible) => {
          const { Obtained, Data } = Collectible;
          return <Item key={uuid()} Data={Data} Obtained={Obtained} />;
        })}
      </div>

      {ListLength > Index ? (
        <button
          className="btn-primary btn w-full"
          onClick={() => setIndex(Index + 32)}
        >
          Show More
        </button>
      ) : null}
    </div>
  );
};
