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
    <div className="bg-neutral-900 w-full min-h-screen">
      <div className="flex flex-col gap-8 items-center justify-between min-h-screen h-full">
        <div className="flex flex-col gap-8 items-center h-full">
          <Logo />
          <div className="flex flex-col gap-4 h-full justify-between">
            <SearchFreeCompany />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
