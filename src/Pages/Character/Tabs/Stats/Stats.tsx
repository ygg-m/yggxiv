import BackgroundARR from "@/Assets/Images/Expansions/A Realm Reborn.jpg";

interface ExpansionStatusProps {
  Patch: number;
  Name: string;
}

const ExpansionStatus = ({ Patch, Name }: ExpansionStatusProps) => (
  <div className="grid gap-2 rounded-lg bg-base-100 p-2">
    <div className="relative z-0 grid h-16 w-full place-items-center rounded-lg before:absolute before:z-0 before:h-full before:w-full before:rounded-lg before:bg-neutral before:bg-opacity-70">
      <h1 className="z-10 text-lg italic text-white">A Realm Reborn</h1>

      <img
        src={BackgroundARR}
        alt=""
        className="absolute -z-10 h-full w-full rounded-lg object-cover"
      />
    </div>

    <div className="z-0 grid gap-1">
      <div className="relative flex items-center justify-between rounded-lg text-primary after:absolute after:-z-10 after:h-full after:w-[100%] after:rounded-lg after:bg-neutral">
        <span className="p-1 px-3">MSQ</span>
        <span className="p-1 px-3">100%</span>
      </div>

      <div className="relative flex items-center justify-between rounded-lg text-primary after:absolute after:-z-10 after:h-full after:w-[100%] after:rounded-lg after:bg-neutral">
        <span className="p-1 px-3">Raids</span>
        <span className="p-1 px-3">100%</span>
      </div>

      <div className="relative flex items-center justify-between rounded-lg text-primary after:absolute after:-z-10 after:h-full after:w-[100%] after:rounded-lg after:bg-neutral">
        <span className="p-1 px-3">Trials EX</span>
        <span className="p-1 px-3">100%</span>
      </div>

      <div className="relative flex items-center justify-between rounded-lg after:absolute after:-z-10 after:h-full after:w-[50%] after:rounded-lg after:bg-neutral">
        <span className="p-1 px-3">Savage</span>
        <span className="p-1 px-3">100%</span>
      </div>

      <div className="relative flex items-center justify-between rounded-lg after:absolute after:-z-10 after:h-full after:w-[8%] after:rounded-lg after:bg-neutral">
        <span className="p-1 px-3">Relics</span>
        <span className="p-1 px-3">8%</span>
      </div>

      <div className="relative flex items-center justify-between rounded-lg after:absolute after:-z-10 after:h-full after:w-[24%] after:rounded-lg after:bg-neutral">
        <span className="p-1 px-3">Tribes</span>
        <span className="p-1 px-3">24%</span>
      </div>
    </div>
  </div>
);

export const Stats = () => {
  return (
    <section className="grid gap-4">
      <article className="rounded-lg bg-base-100 p-4">
        <h1 className="">Jobs</h1>
        [Chart]
      </article>
      <article className="grid grid-cols-5 gap-4">
        <ExpansionStatus Patch={2.0} Name="A Realm Reborn" />
        <ExpansionStatus Patch={2.0} Name="A Realm Reborn" />
        <ExpansionStatus Patch={2.0} Name="A Realm Reborn" />
        <ExpansionStatus Patch={2.0} Name="A Realm Reborn" />
        <ExpansionStatus Patch={2.0} Name="A Realm Reborn" />
      </article>
      CharStats
    </section>
  );
};
