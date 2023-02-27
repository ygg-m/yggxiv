export const Home = () => {
  const Logo = () => {
    return (
      <div className="flex text-6xl font-thin text-gray-400 py-4">
        <h1>YggXIV</h1>
      </div>
    );
  };

  const SearchFreeCompany = () => {
    return (
      <div className="flex flex-col gap-4 justify-center outline outline-1 outline-gray-700 rounded-xl p-8">
        <h2 className="text-4xl uppercase font-thin">Search Free Company</h2>
        <input type="text" placeholder="Name or ID" className="input w-full" />
      </div>
    );
  };

  return (
    <div className="bg-neutral-900 text-gray-200 w-full h-screen">
      <div className="flex flex-col gap-4 items-center h-full">
        <Logo />
        <div className="flex flex-col gap-4 h-full justify-center">
          <SearchFreeCompany />
        </div>
      </div>
    </div>
  );
};
