import { AchievementsTypes } from "@/Types";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { AchieveItem } from "./AchieveItem";

interface ListProps {
  data: AchievementsTypes[];
  query: string;
}

export const AchieveList = ({ data, query }: ListProps) => {
  const [indexes, setIndexes] = useState(10);
  const list = useMemo(() => data.slice(0, indexes), [data, indexes]);

  useEffect(() => {
    setIndexes(10);
  }, [data]);

  return (
    <div className="mt-2 grid gap-4 rounded-t-lg">
      <div className="rounded-lg outline outline-1 outline-neutral-700">
        <div className="grid grid-cols-[2rem_3rem_4rem_.4fr_1fr_140px] grid-rows-1 gap-2 border-b border-neutral-700 py-2">
          <div className="col-span-1 grid place-items-center opacity-70">#</div>
          <div className="col-span-1 text-sm opacity-70"></div>
          <div className="col-span-1 text-sm opacity-70">
            Count{" "}
            <span
              className="tooltip select-none px-2"
              data-tip="Counting 50 characters who made their Achievements Public."
            >
              ?
            </span>
          </div>
          <div className="col-span-1 text-sm opacity-70">Name</div>
          <div className="col-span-1 text-sm opacity-70">Description</div>
          <div className="col-span-1 text-sm opacity-70">Owners</div>
        </div>

        <div className="grid rounded-b-lg">
          {list.map((Collectible, index) => (
            <AchieveItem
              key={uuid()}
              data={Collectible}
              index={index}
              query={query}
            />
          ))}
        </div>
      </div>

      {data.length > indexes ? (
        <button
          className="btn-secondary btn w-full"
          onClick={() => setIndexes(indexes + 10)}
        >
          Show More
        </button>
      ) : null}
    </div>
  );
};
