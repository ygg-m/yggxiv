import { CollectData } from "@/Helpers/ffxivcollectapi";
import { FreeCompanyData, MembersListTypes } from "./FreeCompanyData";
import { AchievementData, CityData } from "./GameData";

interface TreatedGearData {
  ID: number;
  Name: number; // TODO: solve Name
  Glamour: number; // TODO: solve Data
  Materia: number[]; // TODO: solve Name
}

export interface TreatedCharData {
  Data: {
    ID: number;
    Name: string;
    LastLogin: Date;
    DataCenter: {
      Name: string;
      Server: string;
    };
  };
  Profile: {
    Name: string;
    Bio: string;
    Gender: string;
    Title: string;
    Avatar: string;
    Portrait: string;
    StarterCity: CityData;
    Race: {
      Name: string;
      Tribe: string;
    };
    Astro: {
      Nameday: { Simple: string; Full: string };
      Guardian: { ID: number; Name: string; Icon: string };
    };
  };
  GrandCompany: {
    Name: string;
    Icon: string;
    Rank: { Name: string; Icon: string }; // TODO: solve Name
  };
  FreeCompany: {
    ID: string;
    Name: string;
    Tag: string;
    Crest: string[];
  };
  ActiveStats: {
    Job: number; // TODO: solve Name
    Attributes: {
      Base: {
        Strength: number;
        Dexterity: number;
        Vitality: number;
        Intelligence: number;
        Mind: number;
      };
      Offensive: {
        CriticalHitRate: number;
        DirectHitRate: number;
        Determination: number;
      };
      Defensive: {
        Defense: number;
        MagicDefense: number;
      };
      Physical: {
        AttackPower: number;
        SkillSpeed: number;
      };
      Mental: {
        AttackMagicPotency: number;
        HealingMagicPotency: number;
        SpellSpeed: number;
      };
      Role: {
        Tenacity: number;
        Piety: number;
      };
    };
    Gear: {
      Hands: {
        MainHand: TreatedGearData;
      };
      Accessories: {
        Necklace: TreatedGearData;
        Earrings: TreatedGearData;
        Bracelet: TreatedGearData;
        Ring1: TreatedGearData;
        Ring2: TreatedGearData;
        SoulCrystal: TreatedGearData;
      };
      Body: {
        Head: TreatedGearData;
        Chest: TreatedGearData;
        Hands: TreatedGearData;
        Legs: TreatedGearData;
        Feet: TreatedGearData;
      };
    };
  };
  Achievements: {
    List: AchievementList[];
    Points: number;
    Public: boolean;
  };
  Collection: {
    Mounts: CollectibleData[];
    Minions: CollectibleData[];
  };
  Jobs: {
    Bozjan: ClassJobsBozjan;
    Elemental: ClassJobsElemental;
    Battle: {
      Tanks: {
        Paladin: ClassJobs;
        Warrior: ClassJobs;
        DarkKnight: ClassJobs;
        Gunbreaker: ClassJobs;
      };
      Healers: {
        WhiteMage: ClassJobs;
        Scholar: ClassJobs;
        Astrologian: ClassJobs;
        Sage: ClassJobs;
      };
      Melee: {
        Monk: ClassJobs;
        Dragoon: ClassJobs;
        Ninja: ClassJobs;
        Samurai: ClassJobs;
        Reaper: ClassJobs;
      };
      RangedPhys: {
        Bard: ClassJobs;
        Machinist: ClassJobs;
        Dancer: ClassJobs;
      };
      RangedMagic: {
        BlackMage: ClassJobs;
        Summoner: ClassJobs;
        RedMage: ClassJobs;
        BlueMage: ClassJobs;
      };
    };
    CraftGather: {
      Craft: {
        Carpenter: ClassJobs;
        Blacksmith: ClassJobs;
        Armorer: ClassJobs;
        Goldsmith: ClassJobs;
        Leatherworker: ClassJobs;
        Weaver: ClassJobs;
        Alchemist: ClassJobs;
        Culinarian: ClassJobs;
      };
      Gather: {
        Miner: ClassJobs;
        Botanist: ClassJobs;
        Fisher: ClassJobs;
      };
    };
  };
}

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

export interface CharCardData {
  Name: string;
  Avatar: string;
  Portrait: string;
  ID: number;
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
  ParseDate: number;
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
  IsSpecialised: boolean;
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

export interface Collectible {
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
  FFXIVCollectData: CollectData;
}

export interface CollectibleTypes {
  Count: number;
  MainStory: boolean;
  Premium: boolean;
  Data: CollectibleData;
  Owners: CharCardData[];
}

export interface AchievementsTypes {
  Count: number;
  Data: AchievementData;
  Owners: CharCardData[];
}
