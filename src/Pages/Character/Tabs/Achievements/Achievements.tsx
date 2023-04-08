import { FetchProgress } from "@/Components/LoadingComponents/FetchProgress";
import { useCharacter } from "@/Contexts/CharacterContext";
import { achievLoadingPhrases } from "@/Data/loadingPhrases";
import { scrollToTop } from "@/Helpers";
import { Outlet, useLocation } from "react-router-dom";
import { Tabs } from "../Collection/Tabs";
import { FullList } from "./FullList";

export const Achievements = () => {
  const { List, Points, Public } = useCharacter().char.Achievements;

  const isDefaultPath = /Achievements/.test(
    useLocation()
      .pathname.split("/")
      .filter((e) => e !== "")
      .reverse()[0]
  );

  const isLoading = List.length === 0;
  const isPrivate = !Points;

  scrollToTop(336);

  if (isLoading)
    return (
      <div className="grid place-items-center rounded-lg bg-base-100 p-8">
        <FetchProgress arr={achievLoadingPhrases} />
      </div>
    );

  if (isPrivate)
    return (
      <div className="grid place-items-center rounded-lg bg-base-100 p-8">
        Achievements are Private
      </div>
    );

  return (
    <section className="mb-8 grid gap-4">
      <Tabs isDefaultPath={isDefaultPath} />
      <Outlet />
      {isDefaultPath ? <FullList /> : null}
    </section>
  );
};
