import { createContext, useContext, useMemo, useState } from "react";
import { jobs } from "../Data/jobs";
import { races } from "../Data/races";
import { useGameData } from "./GameDataContext";

import {
  AchievementData,
  AchievementsTypes,
  CharacterData,
  CharCardData,
  CollectibleData,
  CollectibleTypes,
  jobData,
  raceData,
} from "../Types";
import { useFreeCompany } from "./FreeCompanyContext";

type StatsContextType = {
  getMountLeaderboard: any;
  getMinionLeaderboard: any;
  getAchievementLeaderboard: any;
  popularJobs: jobData[];
  popularRaces: raceData[];
  popularGender: { Count: number }[];
  popularMount: CollectibleTypes[];
  popularMinion: CollectibleTypes[];
  rareAchievement: AchievementsTypes[];
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

  const isMembersValid = MembersFullData[0].Character.ID !== 0;

  // Character
  const popularRaces = useMemo(() => getPopularRaces(), [MembersFullData]);
  const popularGender = useMemo(() => getPopularGenders(), [MembersFullData]);

  // Jobs
  const popularJobs = useMemo(() => getPopularJobs(), [MembersFullData]);

  // Collectibles
  const popularMount = useMemo(
    () => getPopularMounts(),
    [MembersFullData, mounts]
  );
  const popularMinion = useMemo(
    () => getPopularMinions(),
    [MembersFullData, minions]
  );

  const rareAchievement = useMemo(
    () => getRareAchievements(),
    [MembersFullData, achievements]
  );

  // Achievement

  // Functions

  // Stats
  // Race
  function getPopularRaces() {
    if (!isMembersValid) return [];

    const raceCount: {
      [raceName: string]: {
        Race: { Count: number; Male: number; Female: number };
        Tribe1: { Count: number; Male: number; Female: number };
        Tribe2: { Count: number; Male: number; Female: number };
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
          Race: { Count: 0, Male: 0, Female: 0 },
          Tribe1: { Count: 0, Male: 0, Female: 0 },
          Tribe2: { Count: 0, Male: 0, Female: 0 },
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

      if (isRace) raceCount[raceID].Race.Count++;

      if (isMale) raceCount[raceID].Race.Male++;
      if (isFemale) raceCount[raceID].Race.Female++;

      if (isTribe1) raceCount[raceID].Tribe1.Count++;
      if (isTribe2) raceCount[raceID].Tribe2.Count++;

      if (isTribe1 && isMale) raceCount[raceID].Tribe1.Male++;
      if (isTribe1 && isFemale) raceCount[raceID].Tribe1.Female++;
      if (isTribe2 && isMale) raceCount[raceID].Tribe2.Male++;
      if (isTribe2 && isFemale) raceCount[raceID].Tribe2.Female++;
    });

    const countsArray = Object.entries(raceCount).map(
      ([raceName, { Race, Tribe1, Tribe2, raceData, memberList }]) => ({
        Race: Race,
        Tribe1: Tribe1,
        Tribe2: Tribe2,
        raceData,
        memberList: memberList,
      })
    );

    return countsArray.sort((a, b) => b.Race.Count - a.Race.Count);
  }

  // Jobs
  function getPopularJobs() {
    if (!isMembersValid) return [];

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
          Tag: string;
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
    if (!isMembersValid) return [];

    const genderCount: {
      [raceName: string]: {
        Count: number;
      };
    } = {};

    Object.values(MembersFullData).forEach((character) => {
      const gender = character.Character.Gender;

      if (!genderCount[gender]) {
        genderCount[gender] = {
          Count: 0,
        };
      }

      if (gender === 1) genderCount[gender].Count++;
      if (gender === 2) genderCount[gender].Count++;
    });

    const countsArray = Object.entries(genderCount).map(
      ([gender, { Count }]) => ({
        Count: Count,
      })
    );

    return countsArray.sort((a, b) => b.Count - a.Count);
  }

  // Collectibles
  function getPopularMounts() {
    if (!isMembersValid || mounts.length < 1) return [];

    const mountCount: {
      [mountName: string]: {
        Count: number;
        MainStory: boolean;
        Premium: boolean;
        Data: CollectibleData;
        Owners: CharCardData[];
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
        const Data = mounts.filter(
          (e: CollectibleData) => e.Name.toLowerCase() === mountName
        )[0];
        const charData = {
          Name: character.Character.Name,
          Avatar: character.Character.Avatar,
          Portrait: character.Character.Portrait,
          ID: character.Character.ID,
        };

        if (!mountCount[mountName]) {
          mountCount[mountName] = {
            Count: 0,
            MainStory: false,
            Premium: false,
            Data,
            Owners: [],
          };
        }

        mountCount[mountName].Count++;
        mountCount[mountName].Owners = [
          ...mountCount[mountName].Owners,
          charData,
        ];

        if (MainStorys.includes(mountName))
          mountCount[mountName].MainStory = true;

        if (Premiums.includes(mountName)) mountCount[mountName].Premium = true;
      });
    });

    const countsArray = Object.entries(mountCount).map(
      ([mountName, { Count, MainStory, Premium, Data, Owners }]) => ({
        Count: Count,
        MainStory: MainStory,
        Premium: Premium,
        Data,
        Owners,
      })
    );

    return countsArray.sort((a, b) => b.Count - a.Count);
  }

  function getPopularMinions() {
    if (!isMembersValid || minions.length < 1) return [];
    const mountCount: {
      [minionName: string]: {
        Count: number;
        MainStory: boolean;
        Premium: boolean;
        Data: CollectibleData;
        Owners: CharCardData[];
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
        const Data = minions.filter(
          (e: CollectibleData) => e.Name.toLowerCase() === minionName
        )[0];
        const charData = {
          Name: character.Character.Name,
          Avatar: character.Character.Avatar,
          Portrait: character.Character.Portrait,
          ID: character.Character.ID,
        };

        if (!mountCount[minionName]) {
          mountCount[minionName] = {
            Count: 0,
            MainStory: false,
            Premium: false,
            Data,
            Owners: [],
          };
        }

        mountCount[minionName].Count++;
        mountCount[minionName].Owners = [
          ...mountCount[minionName].Owners,
          charData,
        ];

        if (MainStorys.includes(minionName))
          mountCount[minionName].MainStory = true;

        if (Premiums.includes(minionName))
          mountCount[minionName].Premium = true;
      });
    });

    const countsArray = Object.entries(mountCount).map(
      ([minionName, { Count, MainStory, Premium, Data, Owners }]) => ({
        Count: Count,
        MainStory: MainStory,
        Premium: Premium,
        Data,
        Owners,
      })
    );

    return countsArray.sort((a, b) => b.Count - a.Count);
  }

  function getRareAchievements() {
    if (!isMembersValid || achievements.length < 1) return [];

    const achievCount: {
      [achievID: string]: {
        Count: number;
        Data: AchievementData;
        Owners: CharCardData[];
      };
    } = {};

    Object.values(MembersFullData).forEach((character) => {
      if (!character.Mounts) return;

      character.Achievements.List.forEach((achiev) => {
        const achievID = achiev.ID;
        const Data = achievements.find(
          (e: CollectibleData) => e.ID === achievID
        );
        const charData = {
          Name: character.Character.Name,
          Avatar: character.Character.Avatar,
          Portrait: character.Character.Portrait,
          ID: character.Character.ID,
        };

        if (!achievCount[achievID]) {
          achievCount[achievID] = {
            Count: 0,
            Data,
            Owners: [],
          };
        }

        achievCount[achievID].Count++;
        achievCount[achievID].Owners = [
          ...achievCount[achievID].Owners,
          charData,
        ];
      });
    });

    const countsArray = Object.entries(achievCount).map(
      ([achievID, { Count, Data, Owners }]) => ({
        Count: Count,
        Data,
        Owners,
      })
    );

    return countsArray.sort((a, b) => b.Count - a.Count);
  }

  // Leaderboard
  // Mount
  function getMountLeaderboard() {
    if (!isMembersValid || mounts.length < 1) return null;

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
  function getMinionLeaderboard() {
    if (!isMembersValid || minions.length < 1) return null;

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
  function getAchievementLeaderboard() {
    if (!isMembersValid || achievements.length < 1) return null;

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
