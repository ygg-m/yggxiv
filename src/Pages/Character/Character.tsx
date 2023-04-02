import { Footer } from "@/Components";
import { useCharacter } from "@/Contexts/CharacterContext";
import { Outlet, useLocation } from "react-router-dom";
import { Banner } from "./Components/Banner";
import { Header } from "./Components/Header";
import { Navigator } from "./Navigartor";
import { CharInfo } from "./Tabs";

export const Character = () => {
  const { char } = useCharacter();

  const isDefaultPath = /^\d+$/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[0]
  );

  if (char.Data.ID === 0)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <button className="loading btn">Getting Character Info</button>
      </div>
    );

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-between bg-neutral-900">
      <div className="grid place-items-center">
        <Banner />
        <div className="flex w-screen max-w-screen-2xl flex-col px-2 pr-4 sm:px-8">
          <Header char={char} />
          <Navigator isDefaultPath={isDefaultPath} />
          <Outlet />
          {isDefaultPath ? <CharInfo /> : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};
