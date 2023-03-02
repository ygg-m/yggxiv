import { Link } from "react-router-dom";
import { useFreeCompanyContext } from "../Contexts/FreeCompanyContext";
import { throttle } from "../Helpers/index";

export const SearchFreeCompany = () => {
  const {
    searchFreeCompany,
    searchInput,
    setSearchInput,
    fetchLoad,
    fetchFreeCompany,
  } = useFreeCompanyContext();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendSearch();
    }
  };

  const sendSearch = () => {
    const throttledSearch = throttle(searchFreeCompany, 1000);
    throttledSearch();
  };

  const Results = () => {
    const { searchResult } = useFreeCompanyContext();

    type CardProps = {
      ID: string;
      name: string;
      server: string;
      crest: string[];
    };

    function parseServer(serverString: string): [string, string] {
      const regex = /^(\w+)\s+\[(\w+)\]$/;
      const matches = regex.exec(serverString);

      if (matches && matches.length === 3) {
        return [matches[1], matches[2]];
      } else return ["", ""];
    }

    const Card: React.FC<CardProps> = ({ ID, name, server, crest }) => {
      const parse = parseServer(server);
      const Server = parse[0];
      const DataCenter = parse[1];
      return (
        <div className="flex flex-col gap-6 items-center justify-center bg-base-100 rounded-xl pt-6 w-[20rem] overflow-hidden">
          <div className="relative w-16 h-16 overflow-hidden rounded-xl">
            <div className="absolute">
              <img src={crest[0]} alt="" />
            </div>
            <div className="absolute">
              <img src={crest[1]} alt="" />
            </div>
            <div className="absolute">
              <img src={crest[2]} alt="" />
            </div>
          </div>
          <div className="flex items-center px-4 flex-col gap-2">
            <h2 className="text-center font-bold text-2xl w-full">{name}</h2>
            <h3 className="italic text-sm text-neutral-500">{ID}</h3>
            <div className="flex gap-2">
              <div className="py-3 badge badge-md">{DataCenter}</div>
              <div className="py-3 badge badge-md bg-rose-900 text-rose-200">
                {Server}
              </div>
            </div>
          </div>
          <Link className="w-full" to={`/FreeCompany/${ID}`}>
            <button
              onClick={() => fetchFreeCompany(ID)}
              className="btn w-full hover:bg-rose-900 rounded-none hover:text-neutral-200"
            >
              See More
            </button>
          </Link>
        </div>
      );
    };
    if (fetchLoad) return <button className="btn btn-square loading"></button>;
    if (!searchResult) return null;
    else {
      return (
        <div className="flex w-full gap-8 justify-center flex-wrap">
          {searchResult.Results.map((fc) => {
            const { Crest, ID, Name, Server } = fc;
            return <Card crest={Crest} ID={ID} name={Name} server={Server} />;
          })}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col gap-8 w-screen items-center px-16">
      <div className="flex flex-col gap-4 justify-center outline outline-1 outline-gray-700 rounded-xl p-8 max-w-[450px]">
        <h2 className="text-4xl uppercase font-thin">Search Free Company</h2>
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={searchInput}
              placeholder="Name"
              className="input input-bordered w-full"
            />
            <button
              className="btn btn-square bg-base-100 hover:bg-rose-900"
              onClick={sendSearch}
            >
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
          </div>
        </div>
      </div>
      <Results />
    </div>
  );
};
