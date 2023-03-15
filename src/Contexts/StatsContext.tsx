import { createContext, useContext, useState } from "react";
import {
  CharacterData,
  CharacterDataDeclaration,
  LeaderBoardType,
} from "../Types";
import { useFreeCompany } from "./FreeCompanyContext";

type StatsContextType = {
  getMountLeaderboard: any;
  getMinionLeaderboard: any;
  getAchievementLeaderboard: any;
};

const StatsContext = createContext<StatsContextType>({
  getMountLeaderboard: {},
  getMinionLeaderboard: {},
  getAchievementLeaderboard: {},
});

export const useStats = () => useContext(StatsContext);

type CharacterContextProps = { children: React.ReactNode };

export const StatsProvider: React.FC<CharacterContextProps> = ({
  children,
}) => {
  const { MembersFullData } = useFreeCompany();

  // States

  // Leaderboards
  const [leaderboardMount, setLeaderboardMount] = useState<LeaderBoardType>();
  const [leaderboardMinion, setLeaderboardMinion] = useState<LeaderBoardType>();
  const [leaderboardAchievement, setLeaderboardAchievement] =
    useState<LeaderBoardType>();

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

    // setLeaderboardMount({
    //   FirstPlace: sortedMembers.slice(0, 1)[0],
    //   SecondPlace: sortedMembers.slice(1, 2)[0],
    //   ThirdPlace: sortedMembers.slice(1, 3)[0],
    //   EveryoneElse: sortedMembers.slice(3),
    // });

    return {
      FirstPlace: sortedMembers[0],
      SecondPlace: sortedMembers[1],
      ThirdPlace: sortedMembers[2],
      EveryoneElse: sortedMembers.slice(3),
    };
  }

  // Minion
  function getMinionLeaderboard(): {
    FirstPlace: CharacterData;
    SecondPlace: CharacterData;
    ThirdPlace: CharacterData;
    EveryoneElse: CharacterData[];
  } {
    const sortedMembers = MembersFullData.sort(
      (a, b) =>
        (b.Minions ? b.Minions.length : 0) - (a.Minions ? a.Minions.length : 0)
    );

    // setLeaderboardMinion({
    //   FirstPlace: sortedMembers.slice(0, 1)[0],
    //   SecondPlace: sortedMembers.slice(1, 2)[0],
    //   ThirdPlace: sortedMembers.slice(1, 3)[0],
    //   EveryoneElse: sortedMembers.slice(3),
    // });

    return {
      FirstPlace: sortedMembers[0],
      SecondPlace: sortedMembers[1],
      ThirdPlace: sortedMembers[2],
      EveryoneElse: sortedMembers.slice(3),
    };
  }

  // Achievement
  function getAchievementLeaderboard(): {
    FirstPlace: CharacterData;
    SecondPlace: CharacterData;
    ThirdPlace: CharacterData;
    EveryoneElse: CharacterData[];
  } {
    const sortedMembers = MembersFullData.sort((a, b) => {
      if (a.Achievements.Points || b.Achievements.Points)
        return b.Achievements.Points - a.Achievements.Points;
      else return 0;
    });

    // setLeaderboardAchievement({
    //   FirstPlace: sortedMembers[0],
    //   SecondPlace: sortedMembers[1],
    //   ThirdPlace: sortedMembers[2],
    //   EveryoneElse: sortedMembers.slice(3),
    // });

    return {
      FirstPlace: sortedMembers[0],
      SecondPlace: sortedMembers[1],
      ThirdPlace: sortedMembers[2],
      EveryoneElse: sortedMembers.slice(3),
    };
  }

  const value: StatsContextType = {
    getMountLeaderboard,
    getMinionLeaderboard,
    getAchievementLeaderboard,
  };

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
};
