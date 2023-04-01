import { useCharacter } from "@/Contexts/CharacterContext";
import { Outlet } from "react-router-dom";
import { Banner } from "./Components/Banner";
import { Header } from "./Components/Header";
import { Navigator } from "./Navigartor";

export const Character = () => {
  const { char } = useCharacter();

  if (char.Character.ID === 0)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <button className="loading btn">Getting Character Info</button>
      </div>
    );

  return (
    <div className="flex min-h-screen w-screen flex-col items-center bg-neutral-900">
      <Banner />
      <div className="flex w-screen max-w-screen-2xl flex-col px-2 pr-4 sm:px-8">
        <Header char={char} />
        <Navigator />
        <Outlet />
      </div>
    </div>
  );
};
