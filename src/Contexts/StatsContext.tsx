import { createContext, useContext, useMemo, useState } from "react";
import { jobs } from "../Data/jobs";
import { races } from "../Data/races";
import { useGameData } from "./GameDataContext";

import {
  CharacterData,
  CollectibleData,
  CollectibleTypes,
  jobData,
  LeaderBoardType,
  raceData,
} from "../Types";
import { useFreeCompany } from "./FreeCompanyContext";

type StatsContextType = {
  getMountLeaderboard: any;
  getMinionLeaderboard: any;
  getAchievementLeaderboard: any;
  popularJobs: jobData[];
  popularRaces: raceData[];
  popularGender: { count: number }[];
  popularMount: CollectibleTypes[];
  popularMinion: CollectibleTypes[];
  rareAchievement: CollectibleTypes[];
};

const StatsContext = createContext<StatsContextType>({
  getMountLeaderboard: {},
  getMinionLeaderboard: {},
  getAchievementLeaderboard: {},
  popularJobs: [],
  popularRaces: [],
  popularGender: [],
  popularMount: [],
  popularMinion: [],
  rareAchievement: [],
});

export const useStats = () => useContext(StatsContext);

type CharacterContextProps = { children: React.ReactNode };

export const StatsProvider: React.FC<CharacterContextProps> = ({
  children,
}) => {
  const { MembersFullData } = useFreeCompany();
  const { mounts, minions, achievements } = useGameData();

  // States

  // Leaderboards
  const [leaderboardMount, setLeaderboardMount] = useState<LeaderBoardType>();
  const [leaderboardMinion, setLeaderboardMinion] = useState<LeaderBoardType>();
  const [leaderboardAchievement, setLeaderboardAchievement] =
    useState<LeaderBoardType>();

  // Character

  const popularRaces = useMemo(() => getPopularRaces(), [MembersFullData]);
  const popularGender = useMemo(() => getPopularGenders(), [MembersFullData]);

  // Jobs
  const popularJobs = useMemo(() => getPopularJobs(), [MembersFullData]);

  // Collectibles
  const popularMount = useMemo(() => getPopularMounts(), [MembersFullData]);
  const popularMinion = useMemo(() => getPopularMinions(), [MembersFullData]);
  const rareAchievement = useMemo(
    () => getRareAchievements(),
    [MembersFullData]
  );

  // Achievement

  // Functions

  // Stats
  // Race
  function getPopularRaces() {
    const raceCount: {
      [raceName: string]: {
        RaceCount: number;
        TribeCount_1: number;
        TribeCount_2: number;
        MaleCount: number;
        FemaleCount: number;
        raceData: {
          ID: number;
          Icon: string;
          Name: string;
          Tribes: {
            Tribe1: { ID: number; Icon: string; Name: string };
            Tribe2: { ID: number; Icon: string; Name: string };
          };
        };
        memberList: CharacterData[];
      };
    } = {};

    Object.values(MembersFullData).forEach((character) => {
      const raceID = character.Character.Race;
      const tribeID = character.Character.Tribe;
      const raceData = races.filter((e) => e.ID === raceID)[0];
      const gender = character.Character.Gender;

      if (!raceCount[raceID]) {
        raceCount[raceID] = {
          RaceCount: 0,
          TribeCount_1: 0,
          TribeCount_2: 0,
          MaleCount: 0,
          FemaleCount: 0,
          raceData,
          memberList: [],
        };
      }

      raceCount[raceID].memberList = [
        ...raceCount[raceID].memberList,
        character,
      ];

      const isTribe1 = tribeID === raceCount[raceID].raceData.Tribes.Tribe1.ID;
      const isTribe2 = tribeID === raceCount[raceID].raceData.Tribes.Tribe2.ID;
      const isRace = raceID === raceCount[raceID].raceData.ID;
      const isMale = gender === 1;
      const isFemale = gender === 2;

      if (isMale) raceCount[raceID].MaleCount++;
      if (isFemale) raceCount[raceID].FemaleCount++;
      if (isRace) raceCount[raceID].RaceCount++;
      if (isTribe1) raceCount[raceID].TribeCount_1++;
      if (isTribe2) raceCount[raceID].TribeCount_2++;
    });

    const countsArray = Object.entries(raceCount).map(
      ([
        raceName,
        {
          RaceCount,
          MaleCount,
          FemaleCount,
          TribeCount_1,
          TribeCount_2,
          raceData,
          memberList,
        },
      ]) => ({
        RaceCount: RaceCount,
        TribeCount_1: TribeCount_1,
        TribeCount_2: TribeCount_2,
        MaleCount: MaleCount,
        FemaleCount: FemaleCount,
        raceData,
        memberList: memberList,
      })
    );

    return countsArray.sort((a, b) => b.RaceCount - a.RaceCount);
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
        else if (job.Level === 90) jobCount[className].LvMax++;
        else if (job.Level >= 80 && job.Level < 90) jobCount[className].Lv80++;
        else if (job.Level >= 70 && job.Level < 80) jobCount[className].Lv70++;
        else if (job.Level >= 60 && job.Level < 70) jobCount[className].Lv60++;
        else if (job.Level >= 50 && job.Level < 60) jobCount[className].Lv50++;
        else if (job.Level >= 30 && job.Level < 50) jobCount[className].Lv30++;
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

  // Gender
  function getPopularGenders() {
    const genderCount: {
      [raceName: string]: {
        count: number;
      };
    } = {};

    Object.values(MembersFullData).forEach((character) => {
      const gender = character.Character.Gender;

      if (!genderCount[gender]) {
        genderCount[gender] = {
          count: 0,
        };
      }

      if (gender === 1) genderCount[gender].count++;
      if (gender === 2) genderCount[gender].count++;
    });

    const countsArray = Object.entries(genderCount).map(
      ([gender, { count }]) => ({
        count: count,
      })
    );

    return countsArray.sort((a, b) => b.count - a.count);
  }

  // Collectibles
  function getPopularMounts() {
    const mountCount: {
      [mountName: string]: {
        count: number;
        MainStory: boolean;
        Premium: boolean;
        collectibleData: CollectibleData;
        owners: CharacterData[];
      };
    } = {};

    const MainStorys = [
      "company chocobo",
      "magitek armor",
      "black chocobo",
      "manacutter",
      "midgardsormr",
      "yol",
      "argos",
    ];

    const Premiums = [
      "set of ceruleum balloons",
      "magicked parasol",
      "magicked umbrella",
      "mechanical lotus",
      "megashiba",
      "papa paissa",
      "arion",
      "cruise chaser",
      "polar bear",
      "lunar whale",
      "chocorpokkur",
      "snowman",
      "chocobo carriage",
      "rubellite carbuncle",
      "kingly peacock",
      "spriggan stonecarrier",
      "sunspun cumulus",
      "circus ahriman",
      "grani",
      "magicked carpet",
      "fat black chocobo",
      "fatter cat",
      "sds fenrir",
      "indigo whale",
      "red hare",
      "broken heart (left)",
      "broken heart (right)",
      "nezha chariot",
      "citrine carbuncle",
      "aquamarine carbuncle",
      "starlight bear",
      "mystic panda",
      "managarm",
      "syldra",
      "eggshilaration system",
      "fat moogle",
      "bennu",
      "original fat chocobo",
      "red baron",
      "white devil",
      "witch's broom",
      "twintania",
      "amber draught chocobo",
      "griffin",
      "ceremony chocobo",
      "sleipnir",
      "draught chocobo",
      "fat chocobo",
      "coeurl",
    ];

    Object.values(MembersFullData).forEach((character) => {
      if (!character.Mounts) return;

      character.Mounts.forEach((mount) => {
        const mountName = mount.Name.toLowerCase();
        const collectibleData = mounts.filter(
          (e: CollectibleData) => e.Name.toLowerCase() === mountName
        )[0];

        if (!mountCount[mountName]) {
          mountCount[mountName] = {
            count: 0,
            MainStory: false,
            Premium: false,
            collectibleData,
            owners: [],
          };
        }

        mountCount[mountName].count++;
        mountCount[mountName].owners = [
          ...mountCount[mountName].owners,
          character,
        ];

        if (MainStorys.includes(mountName))
          mountCount[mountName].MainStory = true;

        if (Premiums.includes(mountName)) mountCount[mountName].Premium = true;
      });
    });

    const countsArray = Object.entries(mountCount).map(
      ([
        mountName,
        { count, MainStory, Premium, collectibleData, owners },
      ]) => ({
        count: count,
        MainStory: MainStory,
        Premium: Premium,
        collectibleData,
        owners,
      })
    );

    return countsArray.sort((a, b) => b.count - a.count);
  }

  function getPopularMinions() {
    const mountCount: {
      [minionName: string]: {
        count: number;
        MainStory: boolean;
        Premium: boolean;
        collectibleData: CollectibleData;
        owners: CharacterData[];
      };
    } = {};

    const MainStorys = [
      "wind-up airship",
      "goobbue sproutling",
      "buffalo calf",
      "midgardsormr",
      "wind-up alphinaud",
      "wind-up cid",
      "wind-up haurchefant",
      "poro roggo",
      "wind-up aymeric",
      "wind-up moenbryda",
      "dress-up raubahn",
      "wind-up g'raha tia",
      "wind-up mystel",
      "accompaniment node",
      "wind-up herois",
    ];

    const Premiums = [
      "wind-up ragnarok",
      "wind-up porom",
      "wind-up vrtra",
      "squirrel emperor",
      "wind-up rudy",
      "wind-up rosa",
      "wind-up rydia",
      "wind-up edge",
      "wind-up runar",
      "wind-up lyna",
      "wind-up ardbert",
      "wind-up dulia-chai",
      "brave new y'shtola",
      "wind-up fran",
      "wind-up suzaku",
      "dress-up tataru",
      "wind-up aerith",
      "wind-up cloud",
      "wind-up tifa",
      "little yang",
      "little yin",
      "bridesmoogle",
      "wind-up cirina",
      "wind-up tsukuyomi",
      "motley egg",
      "wind-up yotsuyu",
      "wind-up gosetsu",
      "wind-up lyse",
      "wind-up bartz",
      "wind-up hraesvelgr",
      "wind-up yuna",
      "angel of mercy",
      "wind-up nidhogg",
      "wind-up lulu",
      "wind-up rikku",
      "namingway",
      "continental eye",
      "wind-up krile",
      "dress-up y'shtola",
      "doman magpie",
      "panda cub",
      "spoony bard",
      "wind-up relm",
      "wind-up yugiri",
      "pumpkin butler",
      "wind-up iceheart",
      "wind-up tataru",
      "wind-up alisaie",
      "wind-up kain",
      "heliodor carbuncle",
      "peridot carbuncle",
      "set of primogs",
      "hoary the snowman",
      "wind-up urianger",
      "model enterprise",
      "wind-up papalymo",
      "wind-up yda",
      "wind-up y'shtola",
      "wind-up delivery moogle",
      "wind-up thancred",
      "wind-up minfilia",
      "wind-up bahamut",
      "wind-up moogle",
      "wind-up shantotto",
      "wind-up edvya",
      "wind-up dalamud",
      "tender lamb",
      "baby behemoth",
    ];

    Object.values(MembersFullData).forEach((character) => {
      if (!character.Minions) return;

      character.Minions.forEach((minion) => {
        const minionName = minion.Name.toLowerCase();
        const collectibleData = minions.filter(
          (e: CollectibleData) => e.Name.toLowerCase() === minionName
        )[0];

        if (!mountCount[minionName]) {
          mountCount[minionName] = {
            count: 0,
            MainStory: false,
            Premium: false,
            collectibleData,
            owners: [],
          };
        }

        mountCount[minionName].count++;
        mountCount[minionName].owners = [
          ...mountCount[minionName].owners,
          character,
        ];

        if (MainStorys.includes(minionName))
          mountCount[minionName].MainStory = true;

        if (Premiums.includes(minionName))
          mountCount[minionName].Premium = true;
      });
    });

    const countsArray = Object.entries(mountCount).map(
      ([
        minionName,
        { count, MainStory, Premium, collectibleData, owners },
      ]) => ({
        count: count,
        MainStory: MainStory,
        Premium: Premium,
        collectibleData,
        owners,
      })
    );

    return countsArray.sort((a, b) => b.count - a.count);
  }

  function getRareAchievements() {
    const mountCount: {
      [mountName: string]: {
        count: number;
        MainStory: boolean;
        Premium: boolean;
        collectibleData: CollectibleData;
        owners: CharacterData[];
      };
    } = {};

    const MainStorys = [
      "company chocobo",
      "magitek armor",
      "black chocobo",
      "manacutter",
      "midgardsormr",
      "yol",
      "argos",
    ];

    const Premiums = [
      "set of ceruleum balloons",
      "magicked parasol",
      "magicked umbrella",
      "mechanical lotus",
      "megashiba",
      "papa paissa",
      "arion",
      "cruise chaser",
      "polar bear",
      "lunar whale",
      "chocorpokkur",
      "snowman",
      "chocobo carriage",
      "rubellite carbuncle",
      "kingly peacock",
      "spriggan stonecarrier",
      "sunspun cumulus",
      "circus ahriman",
      "grani",
      "magicked carpet",
      "fat black chocobo",
      "fatter cat",
      "sds fenrir",
      "indigo whale",
      "red hare",
      "broken heart (left)",
      "broken heart (right)",
      "nezha chariot",
      "citrine carbuncle",
      "aquamarine carbuncle",
      "starlight bear",
      "mystic panda",
      "managarm",
      "syldra",
      "eggshilaration system",
      "fat moogle",
      "bennu",
      "original fat chocobo",
      "red baron",
      "white devil",
      "witch's broom",
      "twintania",
      "amber draught chocobo",
      "griffin",
      "ceremony chocobo",
      "sleipnir",
      "draught chocobo",
      "fat chocobo",
      "coeurl",
    ];

    Object.values(MembersFullData).forEach((character) => {
      if (!character.Mounts) return;

      character.Mounts.forEach((mount) => {
        const mountName = mount.Name.toLowerCase();
        const collectibleData = mounts.filter(
          (e: CollectibleData) => e.Name.toLowerCase() === mountName
        )[0];

        if (!mountCount[mountName]) {
          mountCount[mountName] = {
            count: 0,
            MainStory: false,
            Premium: false,
            collectibleData,
            owners: [],
          };
        }

        mountCount[mountName].count++;
        mountCount[mountName].owners = [
          ...mountCount[mountName].owners,
          character,
        ];

        if (MainStorys.includes(mountName))
          mountCount[mountName].MainStory = true;

        if (Premiums.includes(mountName)) mountCount[mountName].Premium = true;
      });
    });

    const countsArray = Object.entries(mountCount).map(
      ([
        mountName,
        { count, MainStory, Premium, collectibleData, owners },
      ]) => ({
        count: count,
        MainStory: MainStory,
        Premium: Premium,
        collectibleData,
        owners,
      })
    );

    return countsArray.sort((a, b) => b.count - a.count);
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
    popularJobs,
    popularRaces,
    popularGender,
    popularMount,
    popularMinion,
    rareAchievement,
  };

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
};
