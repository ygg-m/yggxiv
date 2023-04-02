import { ClassJobs, TreatedJobData } from "@/Types";

interface Props {
  data: {
    Paladin: TreatedJobData;
    Warrior: ClassJobs;
    DarkKnight: ClassJobs;
    Gunbreaker: ClassJobs;
  };
}

const Job = ({ data }: { data: TreatedJobData }) => {
  const {} = data;

  return <>Job</>;
};

export const Tanks = (data: Props) => {
  const { Paladin, Warrior, DarkKnight, Gunbreaker } = data.data;
  return (
    <div>
      <Job data={Paladin} />
      {/* <Job data={Warrior} /> */}
      {/* <Job data={DarkKnight} /> */}
      {/* <Job data={Gunbreaker} /> */}
    </div>
  );
};
