import { CollectData } from "@/Helpers/ffxivcollectapi";
import { FreeCompanyData, MembersListTypes } from "./FreeCompanyData";
import { AchievementData, CityData } from "./GameData";

export interface ItemFetchData {
  ID: number;
  Name: string;
  Icon: string;
  EquipLevel: number;
  ItemLevel: number;
  MateriaSlots: number;
}

export interface ItemData {
  ID: number;
  Name: string;
  Icon: string;
  MateriaSlots: number;
  EquipLevel: number;
  ItemLevel: number;
  MateriaEquipped: ItemFetchData[] | null;
  Glamour: ItemFetchData | null;
}

export interface TreatedJobData {
  ID: number;
  Name: string;
  Tag: string;
  Role: string;
  Position?: string;
  Image: string;
  Exp: number;
  ExpMax: number;
  Level: number;
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
    Job: TreatedJobData;
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
      Craft: {
        Craftsmanship: number;
        Control: number;
      };
      Gather: {
        Gathering: number;
        Perception: number;
      };
    };
    Gear: {
      Hands: {
        MainHand?: ItemData;
        OffHand?: ItemData;
      };
      Accessories: {
        Necklace?: ItemData;
        Earrings?: ItemData;
        Bracelet?: ItemData;
        Ring1?: ItemData;
        Ring2?: ItemData;
        SoulCrystal?: ItemData;
      };
      Body: {
        Head?: ItemData;
        Chest?: ItemData;
        Hands?: ItemData;
        Legs?: ItemData;
        Feet?: ItemData;
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
      Tanks: TreatedJobData[];
      Healers: TreatedJobData[];
      Melee: TreatedJobData[];
      RangedPhys: TreatedJobData[];
      RangedMagic: TreatedJobData[];
    };
    CraftGather: {
      Craft: TreatedJobData[];
      Gather: TreatedJobData[];
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

export interface ClassJobs {
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

export interface ClassJobsBozjan {
  Level: number;
  Mettle: number;
  Name: string;
}

export interface ClassJobsElemental {
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
    "70": number;
    "71": number;
    "72": number;
    "73": number;
  };
  ClassID: number;
  Gear: {
    Body?: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    Bracelets?: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    Earrings?: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    Feet?: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    Hands?: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    Head?: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    Legs?: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    MainHand?: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    OffHand?: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    Necklace?: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    Ring1?: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    Ring2?: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: number[];
      Mirage: number;
    };
    SoulCrystal?: {
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
  Portrait: string;
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
