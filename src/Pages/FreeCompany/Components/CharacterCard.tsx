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
      <article className="flex cursor-pointer gap-4 rounded-lg bg-base-300 p-6 duration-100 hover:bg-base-100">
        <img
          src={Avatar}
          alt={`Profile Picture from ${Name}`}
          className="mask mask-squircle h-16 w-16"
        />
        <div className="flex flex-col justify-center gap-2">
          <span className="font-bold">{Name}</span>
          <span className="flex items-center gap-2">
            <img src={RankIcon} alt={"Rank Icon"} />
            {Rank}
          </span>
        </div>
      </article>
    </Link>
  );
};
