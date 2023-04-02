import { CharacterProvider } from "@/Contexts/CharacterContext";
import { FreeCompanyProvider } from "@/Contexts/FreeCompanyContext";
import { GameDataProvider } from "@/Contexts/GameDataContext";
import { SearchProvider } from "@/Contexts/SearchContext";
import { Outlet, useLocation } from "react-router-dom";
import { Footer, SearchFreeCompany } from "../../Components";

export const Home = () => {
  const location = useLocation()
    .pathname.split("/")
    .filter((e) => e !== "");

  const Logo = () => {
    return (
      <div className="text-gray-400 flex py-4 text-6xl font-thin">
        <h1>YggXIV</h1>
      </div>
    );
  };

  const Home = () => {
    return (
      <div className="min-h-screen w-full bg-neutral-900">
        <div className="flex h-full min-h-screen flex-col items-center justify-between gap-8">
          <div className="flex h-full flex-col items-center gap-8">
            <Logo />
            <div className="flex h-full flex-col justify-between gap-4">
              <SearchFreeCompany />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  };

  return (
    <GameDataProvider>
      <SearchProvider>
        <FreeCompanyProvider>
          <CharacterProvider>
            {location.length > 0 ? <Outlet /> : <Home />}
          </CharacterProvider>
        </FreeCompanyProvider>
      </SearchProvider>
    </GameDataProvider>
  );
};
