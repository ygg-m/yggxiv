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
  interface CollectibleData {
    ID: number;
    Icon: string;
    Name: string;
    Url: string;
  }

  const [mounts, setMounts] = useState<CollectibleData[]>([]);
  const [minions, setMinions] = useState<CollectibleData[]>([]);
  const [achievements, setAchievements] = useState<CollectibleData[]>([]);

  useMemo(async () => {
    const data = await getMounts();
    setMounts(data);
  }, []);

  useMemo(async () => {
    const data = await getMinions();
    setMinions(data);
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
