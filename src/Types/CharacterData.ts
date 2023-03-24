import { FreeCompanyData, MembersListTypes } from "./FreeCompanyData";
import { AchievementData } from "./GameData";

export interface CharacterData {
  Achievements: Achievements;
  AchievementsPublic: boolean;
  Character: Character;
  FreeCompany: FreeCompanyData;
  FreeCompanyMembers: MembersListTypes[];
  Friends: MembersListTypes[];
  FriendsPublic: boolean;
  Minions: Collectible[];
  Mounts: Collectible[];
  PvPTeam: PvPTeam;
}

interface Achievements {
  List: AchievementList[];
  Points: number;
}

interface AchievementList {
  Date: number;
  ID: number;
}

interface Character {
  ActiveClassJob: ActiveClassJob;
  Avatar: string;
  Bio: string;
  ClassJobs: ClassJobs[];
  ClassJobsBozjan: ClassJobsBozjan;
  ClassJobsElemental: ClassJobsElemental;
  DC: string;
  FreeCompanyId: string;
  FreeCompanyName: string;
  GearSet: GearSet;
  Gender: number;
  GrandCompany: GrandCompany;
  GuardianDeity: number;
  ID: number;
  Lang: any;
  Name: string;
  Nameday: string;
  ParseData: number;
  Portrait: string;
  PvPTeamId: string;
  Race: number;
  Server: string;
  Title: number;
  TitleTop: boolean;
  Town: number;
  Tribe: number;
}

interface ActiveClassJob {
  ClassID: number;
  ExpLevel: number;
  ExpLevelMax: number;
  ExpLevelTogo: number;
  IsSpecialised: boolean;
  JobID: number;
  Level: number;
  Name: string;
  UnlockedState: {
    ID: number;
    Name: string;
  };
}

interface ClassJobs {
  ClassID: number;
  ExpLevel: number;
  ExpLevelMax: number;
  ExpLevelTogo: number;
  IsSpecialised: false;
  JobID: number;
  Level: number;
  Name: string;
  UnlockedState: {
    ID: number;
    Name: string;
  };
}

interface ClassJobsBozjan {
  Level: number;
  Mettle: number;
  Name: string;
}

interface ClassJobsElemental {
  ExpLevel: number;
  ExpLevelMax: number;
  ExpLevelTogo: number;
  Level: number;
  Name: string;
}

interface GearSet {
  Attributes: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
    "6": number;
    "7": number;
    "8": number;
    "19": number;
    "20": number;
    "21": number;
    "22": number;
    "24": number;
    "27": number;
    "33": number;
    "34": number;
    "44": number;
    "45": number;
    "46": number;
  };
  ClassID: number;
  Gear: {
    Body: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    Bracelets: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    Earrings: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    Feet: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    Hands: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    Head: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    Legs: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    MainHand: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    Necklace: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    Ring1: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    Ring2: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    SoulCrystal: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
  };
  GearKey: string;
  JobID: number;
  Level: number;
}

interface GrandCompany {
  NameID: number;
  RankID: number;
}

interface Collectible {
  Icon: string;
  Name: string;
}

interface PvPTeam {
  ID: string;
  Pagination: {
    Page: number;
    PageNext: number;
    PagePrev: number;
    PageTotal: number;
    Results: number;
    ResultsPerPage: number;
    ResultsTotal: number;
  };
  Profile: {
    Crest: string[];
    Name: string;
    Server: string;
  };
  Results: MembersListTypes[];
}

export interface jobData {
  Name: string;
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
    Role: string;
    Position?: string;
    ImageSrc: string;
    SVG?: object;
  };
  [key: string]: any;
}

export interface raceData {
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
}

export interface CollectibleData {
  ID: number;
  Icon: string;
  Name: string;
  Source: string[];
}

export interface CollectibleTypes {
  Count: number;
  MainStory: boolean;
  Premium: boolean;
  Data: CollectibleData;
  Owners: CharacterData[];
}

export interface AchievementsTypes {
  Count: number;
  Data: AchievementData;
  Owners: CharacterData[];
}
