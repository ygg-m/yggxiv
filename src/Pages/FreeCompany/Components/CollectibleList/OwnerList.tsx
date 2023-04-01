import { CharCardData } from "@/Types";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

export const OwnerList = ({
  List,
  query,
  showOwner,
}: {
  List: CharCardData[];
  query: string;
  showOwner: boolean;
}) => {
  const OwnerItem = ({ data }: any) => {
    const { Avatar, Name, ID } = data;
    const queryOwner =
      Name.toLowerCase().includes(query.toLowerCase()) && query.length > 0;

    return (
      <Link
        to={`/Character/${ID}`}
        className={`tooltip z-10 w-12 rounded-lg p-1 duration-300 hover:bg-neutral ${
          queryOwner ? "bg-primary text-neutral hover:text-neutral-content" : ""
        }`}
        data-tip={Name}
      >
        <img src={Avatar} alt={Name} className="mask mask-squircle" />
      </Link>
    );
  };

  return showOwner ? (
    <div className="col-span-1 flex flex-wrap items-center p-2">
      {List.map((Owner) => (
        <OwnerItem key={uuid()} data={Owner} />
      ))}
    </div>
  ) : null;
};
