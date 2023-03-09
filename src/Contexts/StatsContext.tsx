import { createContext, useContext, useState } from "react";
import { useFreeCompany } from "./FreeCompanyContext";

type FCStatsContextType = {};

const FCStatsContext = createContext<FCStatsContextType>({});

export const useSearch = () => useContext(FCStatsContext);

type CharacterContextProps = { children: React.ReactNode };

export const FCStatsProvider: React.FC<CharacterContextProps> = ({
  children,
}) => {
  const { MembersFullData } = useFreeCompany();

  // Leaderboards
  const [leaderboardMount, setLeaderboardMount] = useState();
  const [leaderboardMinion, setLeaderboardMinion] = useState();
  const [leaderboardAchievement, setLeaderboardAchievement] = useState();

  // Character
  const [popularRaces, setPopularRaces] = useState();
  const [popularGender, setPopularGender] = useState();

  // Jobs
  const [popularJobs, setPopularJobs] = useState();

  // Mount
  const [popularMount, setPopularMount] = useState();
  const [rarestMount, setRarestMount] = useState();

  // Minion
  const [popularMinion, setPopularMinion] = useState();
  const [rarestMinion, setRarestMinion] = useState();

  // Achievement
  const [rarestAchievement, setRarestAchievement] = useState();

  const value: FCStatsContextType = {};

  return (
    <FCStatsContext.Provider value={value}>{children}</FCStatsContext.Provider>
  );
};
