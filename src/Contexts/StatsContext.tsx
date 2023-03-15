import { createContext, useContext, useState } from "react";
import { jobs } from "../Data/jobs";
import {
  CharacterData,
  CharacterDataDeclaration,
  jobData,
  LeaderBoardType,
} from "../Types";
import { useFreeCompany } from "./FreeCompanyContext";

type StatsContextType = {
  getMountLeaderboard: any;
  getMinionLeaderboard: any;
  getAchievementLeaderboard: any;
  getPopularJobs: any;
  popularJobs: jobData[];
};

const StatsContext = createContext<StatsContextType>({
  getMountLeaderboard: {},
  getMinionLeaderboard: {},
  getAchievementLeaderboard: {},
  getPopularJobs: {},
  popularJobs: [],
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
  const [popularJobs, setPopularJobs] = useState<jobData[]>(getPopularJobs());

  // Mount
  const [popularMount, setPopularMount] = useState();
  const [rarestMount, setRarestMount] = useState();

  // Minion
  const [popularMinion, setPopularMinion] = useState();
  const [rarestMinion, setRarestMinion] = useState();

  // Achievement
  const [rarestAchievement, setRarestAchievement] = useState();

  // Functions

  // Stats
  // Race
  function getPopularRaces(): {
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

    return {
      FirstPlace: sortedMembers[0],
      SecondPlace: sortedMembers[1],
      ThirdPlace: sortedMembers[2],
      EveryoneElse: sortedMembers.slice(3),
    };
  }

  // Jobs
  function getPopularJobs() {
    const jobCount: {
      [className: string]: {
        LvMax: number;
        Lv80: number;
        Lv70: number;
        Lv60: number;
        Lv50: number;
        Lv30: number;
        classId: number;
        jobData: {
          Job: string;
          ImageSrc: string;
          Role: string;
          Position?: string;
          SVG?: object;
        };
      };
    } = {};

    Object.values(MembersFullData).forEach((character) => {
      character.Character.ClassJobs.forEach((job) => {
        const isBlueLvMax = job.JobID === 36 && job.Level === 70;

        const classId = job.UnlockedState.ID;
        const className = job.Name.split(" / ")[1];
        const jobData = jobs.filter(
          (e) => e.Job.toLowerCase() === className.toLowerCase()
        )[0];

        if (!jobCount[className]) {
          jobCount[className] = {
            LvMax: 0,
            Lv80: 0,
            Lv70: 0,
            Lv60: 0,
            Lv50: 0,
            Lv30: 0,
            classId,
            jobData,
          };
        }

        if (isBlueLvMax) jobCount[className].LvMax++;
        if (job.Level === 90) jobCount[className].LvMax++;
        if (job.Level === 80) jobCount[className].Lv80++;
        if (job.Level === 70) jobCount[className].Lv70++;
        if (job.Level === 60) jobCount[className].Lv60++;
        if (job.Level === 50) jobCount[className].Lv50++;
        if (job.Level === 30) jobCount[className].Lv30++;
      });
    });

    const countsArray = Object.entries(jobCount).map(
      ([
        className,
        { LvMax, Lv80, Lv70, Lv60, Lv50, Lv30, classId, jobData },
      ]) => ({
        Name: className,
        LvMax: LvMax,
        Lv80: Lv80,
        Lv70: Lv70,
        Lv60: Lv60,
        Lv50: Lv50,
        Lv30: Lv30,
        classId,
        jobData,
      })
    );

    return countsArray.sort((a, b) => b.LvMax - a.LvMax);
  }

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
    getPopularJobs,
    popularJobs,
  };

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
};
