import { FreeCompanyData, MembersListTypes } from "./FreeCompanyData";

export const CharacterDataDeclaration = {
  Achievements: { List: [], Points: 0 },
  AchievementsPublic: false,
  Character: {
    ActiveClassJob: {
      ClassID: 0,
      ExpLevel: 0,
      ExpLevelMax: 0,
      ExpLevelTogo: 0,
      IsSpecialised: false,
      JobID: 0,
      Level: 0,
      Name: "",
      UnlockedState: {
        ID: 0,
        Name: "",
      },
    },
    Avatar: "",
    Bio: "",
    ClassJobs: [],
    ClassJobsBozjan: { Level: 0, Mettle: 0, Name: "" },
    ClassJobsElemental: {
      ExpLevel: 0,
      ExpLevelMax: 0,
      ExpLevelTogo: 0,
      Level: 0,
      Name: "",
    },
    DC: "",
    FreeCompanyId: "",
    FreeCompanyName: "",
    GearSet: {
      Attributes: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "19": 0,
        "20": 0,
        "21": 0,
        "22": 0,
        "24": 0,
        "27": 0,
        "33": 0,
        "34": 0,
        "44": 0,
        "45": 0,
        "46": 0,
      },
      ClassID: 0,
      Gear: {
        Body: {
          Creator: 0,
          Dye: 0,
          ID: 0,
          Materia: [],
          Mirage: 0,
        },
        Bracelets: {
          Creator: 0,
          Dye: 0,
          ID: 0,
          Materia: [],
          Mirage: 0,
        },
        Earrings: {
          Creator: 0,
          Dye: 0,
          ID: 0,
          Materia: [],
          Mirage: 0,
        },
        Feet: {
          Creator: 0,
          Dye: 0,
          ID: 0,
          Materia: [],
          Mirage: 0,
        },
        Hands: {
          Creator: 0,
          Dye: 0,
          ID: 0,
          Materia: [],
          Mirage: 0,
        },
        Head: {
          Creator: 0,
          Dye: 0,
          ID: 0,
          Materia: [],
          Mirage: 0,
        },
        Legs: {
          Creator: 0,
          Dye: 0,
          ID: 0,
          Materia: [],
          Mirage: 0,
        },
        MainHand: {
          Creator: 0,
          Dye: 0,
          ID: 0,
          Materia: [],
          Mirage: 0,
        },
        Necklace: {
          Creator: 0,
          Dye: 0,
          ID: 0,
          Materia: [],
          Mirage: 0,
        },
        Ring1: {
          Creator: 0,
          Dye: 0,
          ID: 0,
          Materia: [],
          Mirage: 0,
        },
        Ring2: {
          Creator: 0,
          Dye: 0,
          ID: 0,
          Materia: [],
          Mirage: 0,
        },
        SoulCrystal: {
          Creator: 0,
          Dye: 0,
          ID: 0,
          Materia: [],
          Mirage: 0,
        },
      },
      GearKey: "",
      JobID: 0,
      Level: 0,
    },
    Gender: 0,
    GrandCompany: { NameID: 0, RankID: 0 },
    GuardianDeity: 0,
    ID: 0,
    Lang: null,
    Name: "",
    Nameday: "",
    ParseData: 0,
    Portrait: "",
    PvPTeamId: "",
    Race: 0,
    Server: "",
    Title: 0,
    TitleTop: false,
    Town: 0,
    Tribe: 0,
  },
  FreeCompany: {
    Active: "",
    ActiveMemberCount: 0,
    Crest: [],
    DC: "",
    Estate: {
      Greeting: "",
      Name: "",
      Plot: "",
    },
    Focus: [],
    Formed: 0,
    GrandCompany: "",
    ID: "",
    Name: "",
    ParseDate: 0,
    Rank: 0,
    Ranking: { Monthly: 0, Weekly: 0 },
    Recruitment: "",
    Reputation: [],
    Seeking: [],
    Server: "",
    Slogan: "",
    Tag: "",
  },
  FreeCompanyMembers: [],
  Friends: [],
  FriendsPublic: false,
  Minions: [],
  Mounts: [],
  PvPTeam: {
    ID: "",
    Pagination: {
      Page: 0,
      PageNext: 0,
      PagePrev: 0,
      PageTotal: 0,
      Results: 0,
      ResultsPerPage: 0,
      ResultsTotal: 0,
    },
    Profile: {
      Crest: [],
      Name: "",
      Server: "",
    },
    Results: [],
  },
};

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
      Materia: [];
      Mirage: number;
    };
    Bracelets: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: [];
      Mirage: number;
    };
    Earrings: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: [];
      Mirage: number;
    };
    Feet: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: [];
      Mirage: number;
    };
    Hands: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: [];
      Mirage: number;
    };
    Head: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: [];
      Mirage: number;
    };
    Legs: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: [];
      Mirage: number;
    };
    MainHand: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: [];
      Mirage: number;
    };
    Necklace: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: [];
      Mirage: number;
    };
    Ring1: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: [];
      Mirage: number;
    };
    Ring2: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: [];
      Mirage: number;
    };
    SoulCrystal: {
      Creator: number;
      Dye: number;
      ID: number;
      Materia: [];
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
    Role: string;
    Position?: string;
    ImageSrc: string;
    SVG?: object;
  };
}
