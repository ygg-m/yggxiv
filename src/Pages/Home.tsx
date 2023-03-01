import { Footer, SearchFreeCompany } from "../Components";

export const Home = () => {
  const Logo = () => {
    return (
      <div className="flex text-6xl font-thin text-gray-400 py-4">
        <h1>YggXIV</h1>
      </div>
    );
  };

  return (
    <div className="bg-neutral-900 text-gray-200 w-full">
      <div className="flex flex-col gap-8 items-center h-full">
        <Logo />
        <div className="flex flex-col gap-4 h-full justify-between">
          <SearchFreeCompany />
          <Footer />
        </div>
      </div>
    </div>
  );
};
