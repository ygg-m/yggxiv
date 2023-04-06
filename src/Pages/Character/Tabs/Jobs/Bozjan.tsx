import { formatNumber } from "@/Helpers";
import { ClassJobsBozjan } from "@/Types";

export const Bozjan = ({ data }: { data: ClassJobsBozjan }) => {
  const { Level, Mettle, Name } = data;

  const isMaxLevel = Level === 25;

  const Image = () => (
    <img
      src="https://xivapi.com/i/065000/065081_hr1.png"
      alt={Name}
      className="h-12 w-12"
    />
  );

  const ShowMettle = () => (
    <div>
      <span className="opacity-70">Mettle:</span> {formatNumber(Mettle)}
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
          Bozjan
        </span>

        <div>
          <span className="opacity-70">{Name}:</span> <ShowLevel />
        </div>

        {Mettle ? <ShowMettle /> : null}
      </div>
    </article>
  ) : null;
};
