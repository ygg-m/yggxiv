import { createContext, useContext, useState } from "react";
import { CharacterData, CharacterDataDeclaration } from "../Types";
import { useFreeCompany } from "./FreeCompanyContext";

type StatsContextType = {
  getMountLeaderboard: any;
};

const StatsContext = createContext<StatsContextType>({
  getMountLeaderboard: {},
});

export const useStats = () => useContext(StatsContext);

type CharacterContextProps = { children: React.ReactNode };

export const StatsProvider: React.FC<CharacterContextProps> = ({
  children,
}) => {
  const { MembersFullData } = useFreeCompany();

  // States

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

  // Functions

  // Leaderboard
  // Mount
  function getMountLeaderboard(): {
    FirstPlace: CharacterData;
    SecondPlace: CharacterData;
    ThirdPlace: CharacterData;
    EveryoneElse: CharacterData[];
  } {
    const sortedMembers = MembersFullData.sort(
      (a, b) =>
        (b.Mounts ? b.Mounts.length : 0) - (a.Mounts ? a.Mounts.length : 0)
    ).filter((e) => e.Mounts?.length !== undefined);

    return {
      FirstPlace: sortedMembers.slice(0, 1)[0],
      SecondPlace: sortedMembers.slice(1, 2)[0],
      ThirdPlace: sortedMembers.slice(1, 3)[0],
      EveryoneElse: sortedMembers.slice(3),
    };
  }

  const value: StatsContextType = {
    getMountLeaderboard,
  };

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
};
