import { useGameData } from "@/Contexts/GameDataContext";
import { CollectibleData, CollectibleTreatedData } from "@/Types";
import { v4 as uuid } from "uuid";

interface Props {
  Mounts: CollectibleTreatedData[];
  Minions: CollectibleTreatedData[];
}

export const CollectibleInfo = ({ Mounts, Minions }: Props) => {
  const RarestMounts = () => {
    const { mounts } = useGameData();

    const List = Mounts.filter((e) => e.Obtained === true)
      .sort(
        (a, b) => a.Data.FFXIVCollectData.Owned - b.Data.FFXIVCollectData.Owned
      )
      .slice(0, 10);

    return (
      <article className="flex flex-col gap-4 rounded-lg rounded-b-lg bg-base-300 p-4 duration-100 hover:bg-base-100">
        <div className="flex justify-between">
          <span className="opacity-70">Rarest Mounts</span>
          <span>
            {Mounts.length}{" "}
            <span className="opacity-70">
              / {mounts.length} (
              {Math.floor((Mounts.length / mounts.length) * 100)}%)
            </span>
          </span>
        </div>

        <div className="grid grid-cols-4 place-items-center justify-between gap-2 sm:grid-cols-10 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10">
          {List.map((mount) => (
            <div
              className="tooltip w-12"
              key={uuid()}
              data-tip={`${mount.Data.Name} - ${mount.Data.FFXIVCollectData.Owned}% Owned Globally`}
            >
              <img
                src={mount.Data.Icon}
                alt={mount.Data.Name}
                className="mask mask-squircle h-full w-full duration-200 hover:scale-125"
              />
            </div>
          ))}
        </div>
      </article>
    );
  };

  const RarestMinions = () => {
    const { minions } = useGameData();

    const List = Minions.filter((e) => e.Obtained === true)
      .sort(
        (a, b) => a.Data.FFXIVCollectData.Owned - b.Data.FFXIVCollectData.Owned
      )
      .slice(0, 10);

    return (
      <article className="flex flex-col gap-4 rounded-lg rounded-b-lg bg-base-300 p-4 duration-100 hover:bg-base-100">
        <div className="flex justify-between">
          <span>Rarest Minions</span>
          <span>
            {Minions.length}{" "}
            <span className="opacity-70">
              / {minions.length} (
              {Math.floor((Minions.length / minions.length) * 100)}%)
            </span>
          </span>
        </div>

        <div className="grid grid-cols-4 place-items-center gap-2 sm:grid-cols-10 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10">
          {List.map((mount) => (
            <div
              className="tooltip w-12"
              key={uuid()}
              data-tip={`${mount.Data.Name} - ${mount.Data.FFXIVCollectData.Owned}% Owned Globally`}
            >
              <img
                src={mount.Data.Icon}
                alt={mount.Data.Name}
                className="mask mask-squircle h-full w-full duration-200 hover:scale-125"
              />
            </div>
          ))}
        </div>
      </article>
    );
  };

  return (
    <section className="grid gap-4 md:grid-cols-2">
      <RarestMounts />
      <RarestMinions />
    </section>
  );
};
