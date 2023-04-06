import { AchievementList, CollectibleData } from "@/Types";
import { createContext, useContext, useMemo, useState } from "react";
import { getAchievements, getMinions, getMounts } from "../Helpers/xviapi";

type GameDataContextType = {
  mounts: any;
  minions: any;
  achievements: any;
};

const GameDataContext = createContext<GameDataContextType>({
  mounts: {},
  minions: {},
  achievements: {},
});

export const useGameData = () => useContext(GameDataContext);

type GameDataContextProps = { children: React.ReactNode };

export const GameDataProvider: React.FC<GameDataContextProps> = ({
  children,
}) => {
  const [mounts, setMounts] = useState<CollectibleData[]>([]);
  const [minions, setMinions] = useState<CollectibleData[]>([]);
  const [achievements, setAchievements] = useState<AchievementList[]>([]);

  function saveData(name: string, data: CollectibleData[]) {
    const json = JSON.stringify(data);
    localStorage.setItem(name, json);
  }

  function loadData(name: string): CollectibleData[] {
    const value =
      localStorage.getItem(name) || '[{"ID":0,"Icon":"","Name":"","Url":""}]';
    return JSON.parse(value);
  }

  useMemo(async () => {
    const local = loadData("MountsData");
    if (local[0].ID !== 0) setMounts(local);
    else {
      const data = await getMounts();
      setMounts(data.filter((e) => e.Icon !== ""));
      saveData("MountsData", data);
    }
  }, []);

  useMemo(async () => {
    const local = loadData("MinionData");
    if (local[0].ID !== 0) setMinions(local);
    else {
      const data = await getMinions();
      setMinions(data.filter((e) => e.Icon !== ""));
      saveData("MinionData", data);
    }
  }, []);

  useMemo(async () => {
    const data = await getAchievements();
    setAchievements(data);
  }, []);

  const value: GameDataContextType = {
    mounts,
    minions,
    achievements,
  };
  return (
    <GameDataContext.Provider value={value}>
      {children}
    </GameDataContext.Provider>
  );
};
