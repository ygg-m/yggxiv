import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFreeCompanyContext } from "../../Contexts/FreeCompanyContext";
import { Card } from "./CharacterCard";

export const Members = () => {
  const {
    filteredMembers,
    changeCheckFilter,
    changeSearchFilter,
    checkedKeys,
    searchQuery,
    filterMemberOpen,
    setFilterMemberOpen,
    RankList,
  } = useFreeCompanyContext();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const MemberFilter = () => {
    const FilterButton = () => {
      return (
        <button
          className={`btn gap-4 ${
            filterMemberOpen ? "bg-primary hover:bg-primary" : ""
          }`}
          onClick={() => {
            setFilterMemberOpen(!filterMemberOpen);
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
            filterMemberOpen ? "h-fit visible px-2 mt-2" : "h-0 invisible"
          }`}
        >
          <div className="flex gap-2 items-center flex-wrap">
            <span className="">Ranks</span>

            {RankList.map((rank) => {
              const { Rank, RankIcon } = rank;
              return (
                <div className="form-control" key={uuidv4()}>
                  <label className="label cursor-pointer gap-2 px-3 rounded-lg bg-base-300">
                    <img src={RankIcon} alt="" />
                    <span className="label-text">{Rank}</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      value={Rank}
                      checked={checkedKeys.includes(Rank)}
                      onChange={changeCheckFilter}
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    useEffect(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [filteredMembers]);

    return (
      <nav className="navbar grid bg-base-100 rounded-lg h-fit">
        <div className="flex justify-between">
          <FilterButton />
          <div className="form-control">
            <input
              type="text"
              placeholder="Search Member"
              value={searchQuery}
              onChange={changeSearchFilter}
              ref={searchInputRef}
              className="input input-bordered"
            />
          </div>
        </div>
        <FilterContent />
      </nav>
    );
  };

  const MemberList = () => {
    return (
      <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-full">
        {filteredMembers.map((member) => {
          const { Avatar, ID, Name, Rank, RankIcon } = member;
          if (ID === 0)
            return <div className="grid-cols-2">No Character found.</div>;

          return (
            <Card
              key={uuidv4()}
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
    <section className="flex flex-col gap-4 pb-8 min-h-[calc(100vh-448px)]">
      <MemberFilter />
      <MemberList />
    </section>
  );
};
