import { ClassJobsBozjan } from "@/Types";

export const Bozjan = ({ data }: { data: ClassJobsBozjan }) => {
  const { Level, Mettle, Name } = data;

  const Image = () => (
    <img
      src="https://xivapi.com/i/065000/065081_hr1.png"
      alt={Name}
      className="h-12 w-12"
    />
  );

  const ShowMettle = () => (
    <div>
      <span className="opacity-70">Mettle:</span> {Mettle}
    </div>
  );

  return data ? (
    <article className="flex w-full items-center gap-4 rounded-lg bg-base-200 p-4">
      <Image />

      <div className="grid">
        <span className="opacity-70">Bozjan</span>

        <div>
          <span className="opacity-70">{Name}:</span> {Level}
        </div>

        {Mettle ? <ShowMettle /> : null}
      </div>
    </article>
  ) : null;
};
