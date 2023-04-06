import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFreeCompany } from "../../../Contexts/FreeCompanyContext";
import { MembersListTypes } from "../../../Types";
import { Card } from "../Components/CharacterCard";

export const Members = () => {
  const { RankList, MemberList } = useFreeCompany();

  const [filteredMembers, setFilteredMembers] = useState(MemberList);
  const [filterMemberOpen, setFilterMemberOpen] = useState<boolean>(false);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const changeCheckFilter = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    if (checked) setCheckedKeys([...checkedKeys, value]);
    else setCheckedKeys(checkedKeys.filter((key) => key !== value));
  };

  const changeSearchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const filterByCheck = (members: MembersListTypes[]) => {
    return members.filter((member) => checkedKeys.includes(member.Rank));
  };

  const filterBySearch = (members: MembersListTypes[]) => {
    return members.filter((member) =>
      member.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  useEffect(() => {
    const isCheckEmpty = checkedKeys.length === 0;
    const isSearchEmpty = searchQuery.length === 0;

    if (isCheckEmpty && isSearchEmpty) setFilteredMembers(MemberList);
    if (!isCheckEmpty && isSearchEmpty)
      setFilteredMembers(filterByCheck(MemberList));
    if (isCheckEmpty && !isSearchEmpty)
      setFilteredMembers(filterBySearch(MemberList));
    if (!isCheckEmpty && !isSearchEmpty)
      setFilteredMembers(filterByCheckAndSearch());
  }, [checkedKeys, searchQuery]);

  const filterByCheckAndSearch = () => {
    const filterCheck = filterByCheck(MemberList);
    const filterSearch = filterBySearch(filterCheck);

    return filterSearch;
  };

  const searchInputRef = useRef<HTMLInputElement>(null);

  const FilterButton = () => {
    return (
      <button
        className={`btn gap-4 ${filterMemberOpen ? "btn-primary" : ""}`}
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
        className={`duration-100 ${
          filterMemberOpen ? "visible mt-4 h-fit px-2" : "invisible h-0"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="">Ranks</span>

          {RankList.map((rank) => {
            const { Rank, RankIcon } = rank;
            return (
              <div className="form-control" key={uuidv4()}>
                <label className="label cursor-pointer gap-2 rounded-lg bg-base-300 px-3">
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

  const List = () => {
    return (
      <section className="grid h-full gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
    <section className="flex  flex-col gap-4 pb-8">
      <nav className="navbar grid h-fit rounded-lg bg-base-100">
        <div className="flex justify-between">
          <FilterButton />
          <div className="form-control">
            <input
              type="text"
              placeholder="Search Member"
              value={searchQuery}
              onChange={changeSearchFilter}
              ref={searchInputRef}
              className="input-bordered input"
            />
          </div>
        </div>
        <FilterContent />
      </nav>
      <List />
    </section>
  );
};
