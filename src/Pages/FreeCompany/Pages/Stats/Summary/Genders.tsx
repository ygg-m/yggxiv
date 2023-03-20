import { FemaleIcon, MaleIcon } from "@/Assets/Images/UI";

interface GenderProps {
  name: string;
  count: number;
  Icon: any;
}

interface GendersProps {
  count: number
}

const Gender = ({ name, count, Icon }: GenderProps) => {
  return (
    <div className="flex gap-4 rounded-lg bg-base-200 p-8 duration-200 hover:bg-base-300 hover:text-accent">
      <div className="grid justify-center gap-2">
        {Icon}
        <h4 className="text-center text-lg">{name}</h4>
      </div>
      <div className="divider divider-horizontal"></div>
      <h3 className="flex h-full w-full items-center justify-center text-2xl font-bold sm:text-6xl">
        {count}
      </h3>
    </div>
  );
};

export const Genders = (data: GendersProps[]) => {
  const male = data[0];
  const female = data[1];

  return (
    <div className="grid gap-2">
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Gender
          Icon={<MaleIcon className="h-8 w-8 sm:h-16 sm:w-16" />}
          name="Male"
          count={male.count}
        />
        <Gender
          Icon={<FemaleIcon className="h-8 w-8 sm:h-16 sm:w-16" />}
          name="Female"
          count={female.count}
        />
      </div>
    </div>
  );
};
