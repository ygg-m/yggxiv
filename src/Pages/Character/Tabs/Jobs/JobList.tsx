import { TreatedJobData } from "@/Types";

interface Props {
  data: TreatedJobData[];
}

const Job = ({ data }: { data: TreatedJobData }) => {
  const { Name, Tag, Image, Exp, ExpMax, Level, Role } = data;

  const isMaxLevel = Level === 90;

  const ShowTag = () =>
    isMaxLevel ? (
      <span className="font-bold text-primary">{Tag}</span>
    ) : (
      <span className="">{Tag}</span>
    );

  const ShowLevel = () =>
    isMaxLevel ? (
      <span className="text-lg font-bold text-primary">{Level}</span>
    ) : (
      <span className="">{Level}</span>
    );

  return (
    <div
      className={`tooltip grid place-items-center rounded-lg p-2 hover:scale-125 shadow-2xl duration-200 ${
        isMaxLevel ? `bg-${Role.toLowerCase()}` : "bg-base-300"
      }`}
      data-tip={Name}
    >
      <ShowTag />
      <img
        src={Image}
        alt={Name}
        className={`mask mask-squircle w-16 p-2 bg-${Role.toLowerCase()} bg-opacity-70`}
      />
      <ShowLevel />
    </div>
  );
};

export const JobList = ({ data }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {data.map((job) => (
        <Job data={job} />
      ))}
    </div>
  );
};
