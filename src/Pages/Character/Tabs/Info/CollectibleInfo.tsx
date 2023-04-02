import { useGameData } from "@/Contexts/GameDataContext";
import { CollectibleData } from "@/Types";

interface Props {
  data: {
    Mounts: CollectibleData[];
    Minions: CollectibleData[];
  };
}

export const CollectibleInfo = ({ data }: Props) => {
  const RarestMounts = () => {
    const { Mounts } = data;
    const { mounts } = useGameData();

    const List = Mounts.sort(
      (a, b) => a.FFXIVCollectData.Owned - b.FFXIVCollectData.Owned
    ).slice(0, 10);

    return (
      <article className="flex flex-col gap-4 rounded-lg rounded-b-lg bg-base-300 p-4 duration-300 hover:bg-base-100">
        <div className="flex justify-between">
          <span>Rarest Mounts</span>
          <span>
            {Mounts.length} / {mounts.length} (
            {Math.floor((Mounts.length / mounts.length) * 100)}%)
          </span>
        </div>

        <div className="flex flex-wrap justify-between gap-2">
          {List.map((mount) => (
            <div
              className="tooltip w-12"
              data-tip={`${mount.Name} - ${mount.FFXIVCollectData.Owned}% Owned Globally`}
            >
              <img
                src={mount.Icon}
                alt={mount.Name}
                className="mask mask-squircle h-full w-full duration-200 hover:scale-125"
              />
            </div>
          ))}
        </div>
      </article>
    );
  };

  const RarestMinions = () => {
    const { Minions } = data;
    const { minions } = useGameData();

    const List = Minions.sort(
      (a, b) => a.FFXIVCollectData.Owned - b.FFXIVCollectData.Owned
    ).slice(0, 10);

    return (
      <article className="flex flex-col gap-4 rounded-lg rounded-b-lg bg-base-300 p-4 duration-300 hover:bg-base-100">
        <div className="flex justify-between">
          <span>Rarest Minions</span>
          <span>
            {Minions.length} / {minions.length} (
            {Math.floor((Minions.length / minions.length) * 100)}%)
          </span>
        </div>

        <div className="flex flex-wrap justify-between gap-2">
          {List.map((mount) => (
            <div
              className="tooltip w-12"
              data-tip={`${mount.Name} - ${mount.FFXIVCollectData.Owned}% Owned Globally`}
            >
              <img
                src={mount.Icon}
                alt={mount.Name}
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
