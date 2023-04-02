import { TreatedJobData } from "@/Types";

interface Props {
  data: TreatedJobData[];
}

const Job = ({ data }: { data: TreatedJobData }) => {
  const { Name, Tag, Image, Exp, ExpMax, Level, Role } = data;

  return (
    <div className="grid rounded-lg bg-base-300 p-2">
      <img
        src={Image}
        alt={Name}
        className={`mask mask-squircle w-16 p-2 bg-${Role.toLowerCase()}`}
      />
    </div>
  );
};

export const JobList = ({ data }: Props) => {
  return (
    <div className="flex gap-2">
      {data.map((job) => (
        <Job data={job} />
      ))}
    </div>
  );
};
