import { formatNumber } from "@/Helpers";
import { ClassJobsElemental } from "@/Types";

export const Elemental = ({ data }: { data: ClassJobsElemental }) => {
  const { Level, Name, ExpLevelTogo } = data;
  const isMaxLevel = Level === 60;

  const Image = () => (
    <img
      src="https://xivapi.com/i/065000/065060_hr1.png"
      alt={Name}
      className="h-12 w-12"
    />
  );

  const ExpToNextLevel = () => (
    <div>
      <span className="opacity-70">Exp to Next:</span>{" "}
      {formatNumber(ExpLevelTogo)}
    </div>
  );

  const ShowLevel = () =>
    isMaxLevel ? (
      <span className="font-bold text-primary">{Level}</span>
    ) : (
      <span>{Level}</span>
    );

  return data ? (
    <article className="flex w-full items-center gap-4 rounded-lg bg-base-200 p-4 duration-100 hover:bg-base-300">
      <Image />

      <div className="grid">
        <span className={`opacity-70 ${isMaxLevel ? "text-primary" : ""}`}>
          Eurekan
        </span>

        <div>
          <span className="opacity-70">{Name}:</span> <ShowLevel />
        </div>

        {ExpLevelTogo ? <ExpToNextLevel /> : null}
      </div>
    </article>
  ) : null;
};
