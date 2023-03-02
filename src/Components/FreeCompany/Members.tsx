import { useState } from "react";
import { FreeCompanyMembersSmall } from "../../Types/FreeCompanyData";
import { Card } from "./CharacterCard";

type MembersProps = {
  MemberList: FreeCompanyMembersSmall[];
};

export const Members: React.FC<MembersProps> = ({ MemberList }) => {
  const [filterOpen, setFilterOpen] = useState<boolean>();

  const MemberFilter = () => {
    const FilterButton = () => {
      return (
        <button
          className={`btn gap-4 ${
            filterOpen ? "bg-primary hover:bg-primary" : ""
          }`}
          onClick={() => {
            setFilterOpen(!filterOpen);
          }}
        >
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 512 512"
          >
            <path d="M0 416c0-17.7 14.3-32 32-32l54.7 0c12.3-28.3 40.5-48 73.3-48s61 19.7 73.3 48L480 384c17.7 0 32 14.3 32 32s-14.3 32-32 32l-246.7 0c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48L32 448c-17.7 0-32-14.3-32-32zm192 0a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM384 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm-32-80c32.8 0 61 19.7 73.3 48l54.7 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-54.7 0c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l246.7 0c12.3-28.3 40.5-48 73.3-48zM192 64a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm73.3 0L480 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l-214.7 0c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48L32 128C14.3 128 0 113.7 0 96S14.3 64 32 64l86.7 0C131 35.7 159.2 16 192 16s61 19.7 73.3 48z" />
          </svg>{" "}
          filters
        </button>
      );
    };

    const FilterContent = () => {
      return (
        <div
          className={`duration-300 ${
            filterOpen ? "h-fit visible mt-2" : "h-0 invisible"
          }`}
        >
          Filters content
        </div>
      );
    };

    const SearchButton = () => {
      return (
        <button className="btn btn-square hover:bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      );
    };

    return (
      <nav className="navbar grid bg-base-100 rounded-lg">
        <div className="flex justify-between">
          <FilterButton />
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search Member"
                className="input input-bordered"
              />
              <SearchButton />
            </div>
          </div>
        </div>
        <FilterContent />
      </nav>
    );
  };

  const List = () => {
    return (
      <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MemberList.map((member) => {
          const { Avatar, ID, Name, Rank, RankIcon } = member;
          return (
            <Card
              Avatar={Avatar}
              ID={ID}
              Name={Name}
              Rank={Rank}
              RankIcon={RankIcon}
            />
          );
        })}
      </section>
    );
  };

  return (
    <section className="grid gap-4 pb-8 min-h-[calc(100vh-448px)]">
      <MemberFilter />
      <List />
    </section>
  );
};
