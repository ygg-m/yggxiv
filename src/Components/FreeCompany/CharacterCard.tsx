import { Link } from "react-router-dom";

type CardProps = {
  Avatar: string;
  ID: number;
  Name: string;
  Rank: string;
  RankIcon: string;
};

export const Card: React.FC<CardProps> = ({
  Avatar,
  ID,
  Name,
  Rank,
  RankIcon,
}) => {
  return (
    <Link to={`/Character/${ID}`}>
      <article className="flex gap-4 p-6 bg-base-300 rounded-lg hover:bg-base-100 hover:text-rose-200 duration-300 cursor-pointer">
        <img
          src={Avatar}
          alt={`Profile Picture from ${Name}`}
          className="h-16 w-16 rounded-full"
        />
        <div className="flex flex-col gap-2 justify-center">
          <span className="font-bold">{Name}</span>
          <span className="flex gap-2 items-center">
            <img src={RankIcon} alt={"Rank Icon"} />
            {Rank}
          </span>
        </div>
      </article>
    </Link>
  );
};
