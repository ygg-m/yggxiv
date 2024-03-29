import { TreatedJobData } from "@/Types";
import { v4 as uuid } from "uuid";

interface Props {
  data: TreatedJobData[];
}

const Job = ({ data }: { data: TreatedJobData }) => {
  const { ID, Name, Tag, Image, Exp, ExpMax, Level, Role } = data;

  const isMaxLevel = ID === 36 ? Level === 70 : Level === 90;
  const isLevel0 = Level === 0;

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
      className={`tooltip grid place-items-center rounded-lg p-2 shadow-2xl outline outline-1 outline-transparent duration-200 hover:z-10 hover:scale-125 ${
        isMaxLevel
          ? `bg-${Role.toLowerCase()} hover:outline-primary`
          : `bg-base-300 hover:outline-base-content`
      } ${isLevel0 ? "opacity-30 hover:opacity-100" : ""}`}
      data-tip={Name}
    >
      <ShowTag />
      <img
        src={Image}
        alt={Name}
        className={`mask mask-squircle w-16 p-2 bg-${Role.toLowerCase()} ${
          isLevel0 ? "bg-transparent" : ""
        } bg-opacity-70`}
      />
      <ShowLevel />
    </div>
  );
};

export const JobList = ({ data }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {data.map((job) => (
        <Job data={job} key={uuid()} />
      ))}
    </div>
  );
};
