import { getCharacter } from "@/Helpers";
import { CharacterData, TreatedCharData } from "@/Types";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFreeCompany } from "./FreeCompanyContext";

type CharacterContextType = {
  char: TreatedCharData;
};

const CharacterContext = createContext<CharacterContextType>({
  char: {
    Data: {
      ID: 0,
      Name: "",
      DataCenter: {
        Name: "",
        Server: "",
      },
    },
    Profile: {
      Name: "",
      Bio: "",
      Gender: 0, // TODO: solve Name
      Title: {
        Show: false,
        Name: 0, // TODO: solve Name
      },
      Avatar: "",
      Portrait: "",
      StarterCity: 0, // TODO: solve Name
      Race: {
        Name: 0, // TODO: solve Name
        Tribe: 0, // TODO: solve Name
      },
      Astro: {
        Nameday: "", // TODO: solve Name
        Guardian: 0, // TODO: solve Name
      },
    },
    GrandCompany: {
      Name: 0, // TODO: solve Name
    },
    FreeCompany: {
      ID: "",
      Name: "",
    },
    ActiveStats: {
      Job: 0, // TODO: solve Name
      Attributes: {
        Base: {
          Strength: 0,
          Dexterity: 0,
          Vitality: 0,
          Intelligence: 0,
          Mind: 0,
        },
        Offensive: {
          CriticalHitRate: 0,
          DirectHitRate: 0,
          Determination: 0,
        },
        Defensive: {
          Defense: 0,
          MagicDefense: 0,
        },
        Physical: {
          AttackPower: 0,
          SkillSpeed: 0,
        },
        Mental: {
          AttackMagicPotency: 0,
          HealingMagicPotency: 0,
          SpellSpeed: 0,
        },
        Role: {
          Tenacity: 0,
          Piety: 0,
        },
      },
      Gear: {
        Hands: {
          MainHand: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
        },
        Accessories: {
          Necklace: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
          Earrings: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
          Bracelet: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
          Ring1: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
          Ring2: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
          SoulCrystal: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
        },
        Body: {
          Head: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
          Chest: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
          Hands: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
          Legs: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
          Feet: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
        },
      },
    },
    Achievements: {
      List: [],
      Points: 0,
      Public: false,
    },
    Collection: {
      Mounts: [],
      Minions: [],
    },
    Jobs: {
      Bozjan: {
        Level: 0,
        Mettle: 0,
        Name: "",
      },
      Elemental: {
        ExpLevel: 0,
        ExpLevelMax: 0,
        ExpLevelTogo: 0,
        Level: 0,
        Name: "",
      },
      Battle: {
        Tanks: {
          Paladin: {
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
          Warrior: {
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
          DarkKnight: {
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
          Gunbreaker: {
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
        },
        Healers: {
          WhiteMage: {
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
          Scholar: {
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
          Astrologian: {
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
          Sage: {
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
        },
        Melee: {
          Monk: {
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
          Dragoon: {
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
          Ninja: {
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
          Samurai: {
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
          Reaper: {
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
        },
        RangedPhys: {
          Bard: {
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
          Machinist: {
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
          Dancer: {
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
        },
        RangedMagic: {
          BlackMage: {
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
          Summoner: {
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
          RedMage: {
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
          BlueMage: {
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
        },
      },
      CraftGather: {
        Craft: {
          Carpenter: {
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
          Blacksmith: {
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
          Armorer: {
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
          Goldsmith: {
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
          Leatherworker: {
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
          Weaver: {
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
          Alchemist: {
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
          Culinarian: {
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
        },
        Gather: {
          Miner: {
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
          Botanist: {
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
          Fisher: {
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
        },
      },
    },
  },
});

export const useCharacter = () => useContext(CharacterContext);

type CharacterContextProps = { children: React.ReactNode };

export const CharacterProvider: React.FC<CharacterContextProps> = ({
  children,
}) => {
  const { charId } = useParams();
  const { MembersFullData } = useFreeCompany();

  const CharacterID = parseInt(charId || "0");

  const [char, setChar] = useState<TreatedCharData>({
    Data: {
      ID: 0,
      Name: "",
      DataCenter: {
        Name: "",
        Server: "",
      },
    },
    Profile: {
      Name: "",
      Bio: "",
      Gender: 0, // TODO: solve Name
      Title: {
        Show: false,
        Name: 0, // TODO: solve Name
      },
      Avatar: "",
      Portrait: "",
      StarterCity: 0, // TODO: solve Name
      Race: {
        Name: 0, // TODO: solve Name
        Tribe: 0, // TODO: solve Name
      },
      Astro: {
        Nameday: "", // TODO: solve Name
        Guardian: 0, // TODO: solve Name
      },
    },
    GrandCompany: {
      Name: 0, // TODO: solve Name
    },
    FreeCompany: {
      ID: "",
      Name: "",
    },
    ActiveStats: {
      Job: 0, // TODO: solve Name
      Attributes: {
        Base: {
          Strength: 0,
          Dexterity: 0,
          Vitality: 0,
          Intelligence: 0,
          Mind: 0,
        },
        Offensive: {
          CriticalHitRate: 0,
          DirectHitRate: 0,
          Determination: 0,
        },
        Defensive: {
          Defense: 0,
          MagicDefense: 0,
        },
        Physical: {
          AttackPower: 0,
          SkillSpeed: 0,
        },
        Mental: {
          AttackMagicPotency: 0,
          HealingMagicPotency: 0,
          SpellSpeed: 0,
        },
        Role: {
          Tenacity: 0,
          Piety: 0,
        },
      },
      Gear: {
        Hands: {
          MainHand: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
        },
        Accessories: {
          Necklace: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
          Earrings: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
          Bracelet: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
          Ring1: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
          Ring2: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
          SoulCrystal: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
        },
        Body: {
          Head: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
          Chest: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
          Hands: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
          Legs: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
          Feet: {
            ID: 0,
            Name: 0, // TODO: solve Name
            Glamour: 0, // TODO: solve Data
            Materia: [], // TODO: solve Name
          },
        },
      },
    },
    Achievements: {
      List: [],
      Points: 0,
      Public: false,
    },
    Collection: {
      Mounts: [],
      Minions: [],
    },
    Jobs: {
      Bozjan: {
        Level: 0,
        Mettle: 0,
        Name: "",
      },
      Elemental: {
        ExpLevel: 0,
        ExpLevelMax: 0,
        ExpLevelTogo: 0,
        Level: 0,
        Name: "",
      },
      Battle: {
        Tanks: {
          Paladin: {
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
          Warrior: {
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
          DarkKnight: {
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
          Gunbreaker: {
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
        },
        Healers: {
          WhiteMage: {
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
          Scholar: {
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
          Astrologian: {
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
          Sage: {
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
        },
        Melee: {
          Monk: {
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
          Dragoon: {
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
          Ninja: {
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
          Samurai: {
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
          Reaper: {
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
        },
        RangedPhys: {
          Bard: {
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
          Machinist: {
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
          Dancer: {
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
        },
        RangedMagic: {
          BlackMage: {
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
          Summoner: {
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
          RedMage: {
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
          BlueMage: {
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
        },
      },
      CraftGather: {
        Craft: {
          Carpenter: {
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
          Blacksmith: {
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
          Armorer: {
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
          Goldsmith: {
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
          Leatherworker: {
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
          Weaver: {
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
          Alchemist: {
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
          Culinarian: {
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
        },
        Gather: {
          Miner: {
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
          Botanist: {
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
          Fisher: {
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
        },
      },
    },
  });

  function getMember() {
    const fcMember = MembersFullData.find(
      (member) => member.Character.ID === CharacterID
    );
    if (fcMember) return fcMember;
  }

  async function fetchCharacter() {
    const fetch = await getCharacter(
      CharacterID,
      true,
      false,
      true,
      false,
      true,
      true
    );

    const result = {
      Data: {
        ID: fetch.Character.ID,
        Name: fetch.Character.Name,
        DataCenter: {
          Name: fetch.Character.DC,
          Server: fetch.Character.Server,
        },
      },
      Profile: {
        Name: fetch.Character.Name,
        Bio: fetch.Character.Bio,
        Gender: fetch.Character.Gender, // TODO: solve Name
        Title: {
          Show: fetch.Character.TitleTop,
          Name: fetch.Character.Title, // TODO: solve Name
        },
        Avatar: fetch.Character.Avatar,
        Portrait: fetch.Character.Portrait,
        StarterCity: fetch.Character.Town, // TODO: solve Name
        Race: {
          Name: fetch.Character.Race, // TODO: solve Name
          Tribe: fetch.Character.Tribe, // TODO: solve Name
        },
        Astro: {
          Nameday: fetch.Character.Nameday, // TODO: solve Name
          Guardian: fetch.Character.GuardianDeity, // TODO: solve Name
        },
      },
      GrandCompany: {
        Name: fetch.Character.GrandCompany.NameID, // TODO: solve Name
      },
      FreeCompany: {
        ID: fetch.Character.FreeCompanyId,
        Name: fetch.Character.FreeCompanyName,
      },
      ActiveStats: {
        Job: fetch.Character.GearSet.JobID, // TODO: solve Name
        Attributes: {
          Base: {
            Strength: fetch.Character.GearSet.Attributes[1],
            Dexterity: fetch.Character.GearSet.Attributes[2],
            Vitality: fetch.Character.GearSet.Attributes[3],
            Intelligence: fetch.Character.GearSet.Attributes[4],
            Mind: fetch.Character.GearSet.Attributes[5],
          },
          Offensive: {
            CriticalHitRate: fetch.Character.GearSet.Attributes[27],
            DirectHitRate: fetch.Character.GearSet.Attributes[22],
            Determination: fetch.Character.GearSet.Attributes[44],
          },
          Defensive: {
            Defense: fetch.Character.GearSet.Attributes[21],
            MagicDefense: fetch.Character.GearSet.Attributes[24],
          },
          Physical: {
            AttackPower: fetch.Character.GearSet.Attributes[20],
            SkillSpeed: fetch.Character.GearSet.Attributes[45],
          },
          Mental: {
            AttackMagicPotency: fetch.Character.GearSet.Attributes[33],
            HealingMagicPotency: fetch.Character.GearSet.Attributes[34],
            SpellSpeed: fetch.Character.GearSet.Attributes[46],
          },
          Role: {
            Tenacity: fetch.Character.GearSet.Attributes[19],
            Piety: fetch.Character.GearSet.Attributes[6],
          },
        },
        Gear: {
          Hands: {
            MainHand: {
              ID: fetch.Character.GearSet.Gear.MainHand.ID,
              Name: fetch.Character.GearSet.Gear.MainHand.ID, // TODO: solve Name
              Glamour: fetch.Character.GearSet.Gear.MainHand.Mirage, // TODO: solve Data
              Materia: fetch.Character.GearSet.Gear.MainHand.Materia, // TODO: solve Name
            },
          },
          Accessories: {
            Necklace: {
              ID: fetch.Character.GearSet.Gear.Necklace.ID,
              Name: fetch.Character.GearSet.Gear.Necklace.ID, // TODO: solve Name
              Glamour: fetch.Character.GearSet.Gear.Necklace.Mirage, // TODO: solve Data
              Materia: fetch.Character.GearSet.Gear.Necklace.Materia, // TODO: solve Name
            },
            Earrings: {
              ID: fetch.Character.GearSet.Gear.Earrings.ID,
              Name: fetch.Character.GearSet.Gear.Earrings.ID, // TODO: solve Name
              Glamour: fetch.Character.GearSet.Gear.Earrings.Mirage, // TODO: solve Data
              Materia: fetch.Character.GearSet.Gear.Earrings.Materia, // TODO: solve Name
            },
            Bracelet: {
              ID: fetch.Character.GearSet.Gear.Bracelets.ID,
              Name: fetch.Character.GearSet.Gear.Bracelets.ID, // TODO: solve Name
              Glamour: fetch.Character.GearSet.Gear.Bracelets.Mirage, // TODO: solve Data
              Materia: fetch.Character.GearSet.Gear.Bracelets.Materia, // TODO: solve Name
            },
            Ring1: {
              ID: fetch.Character.GearSet.Gear.Ring1.ID,
              Name: fetch.Character.GearSet.Gear.Ring1.ID, // TODO: solve Name
              Glamour: fetch.Character.GearSet.Gear.Ring1.Mirage, // TODO: solve Data
              Materia: fetch.Character.GearSet.Gear.Ring1.Materia, // TODO: solve Name
            },
            Ring2: {
              ID: fetch.Character.GearSet.Gear.Ring2.ID,
              Name: fetch.Character.GearSet.Gear.Ring2.ID, // TODO: solve Name
              Glamour: fetch.Character.GearSet.Gear.Ring2.Mirage, // TODO: solve Data
              Materia: fetch.Character.GearSet.Gear.Ring2.Materia, // TODO: solve Name
            },
            SoulCrystal: {
              ID: fetch.Character.GearSet.Gear.SoulCrystal.ID,
              Name: fetch.Character.GearSet.Gear.SoulCrystal.ID, // TODO: solve Name
              Glamour: fetch.Character.GearSet.Gear.SoulCrystal.Mirage, // TODO: solve Data
              Materia: fetch.Character.GearSet.Gear.SoulCrystal.Materia, // TODO: solve Name
            },
          },
          Body: {
            Head: {
              ID: fetch.Character.GearSet.Gear.Head.ID,
              Name: fetch.Character.GearSet.Gear.Head.ID, // TODO: solve Name
              Glamour: fetch.Character.GearSet.Gear.Head.Mirage, // TODO: solve Data
              Materia: fetch.Character.GearSet.Gear.Head.Materia, // TODO: solve Name
            },
            Chest: {
              ID: fetch.Character.GearSet.Gear.Body.ID,
              Name: fetch.Character.GearSet.Gear.Body.ID, // TODO: solve Name
              Glamour: fetch.Character.GearSet.Gear.Body.Mirage, // TODO: solve Data
              Materia: fetch.Character.GearSet.Gear.Body.Materia, // TODO: solve Name
            },
            Hands: {
              ID: fetch.Character.GearSet.Gear.Hands.ID,
              Name: fetch.Character.GearSet.Gear.Hands.ID, // TODO: solve Name
              Glamour: fetch.Character.GearSet.Gear.Hands.Mirage, // TODO: solve Data
              Materia: fetch.Character.GearSet.Gear.Hands.Materia, // TODO: solve Name
            },
            Legs: {
              ID: fetch.Character.GearSet.Gear.Legs.ID,
              Name: fetch.Character.GearSet.Gear.Legs.ID, // TODO: solve Name
              Glamour: fetch.Character.GearSet.Gear.Legs.Mirage, // TODO: solve Data
              Materia: fetch.Character.GearSet.Gear.Legs.Materia, // TODO: solve Name
            },
            Feet: {
              ID: fetch.Character.GearSet.Gear.Feet.ID,
              Name: fetch.Character.GearSet.Gear.Feet.ID, // TODO: solve Name
              Glamour: fetch.Character.GearSet.Gear.Feet.Mirage, // TODO: solve Data
              Materia: fetch.Character.GearSet.Gear.Feet.Materia, // TODO: solve Name
            },
          },
        },
      },
      Achievements: {
        List: fetch.Achievements.List,
        Points: fetch.Achievements.Points,
        Public: fetch.AchievementsPublic,
      },
      Collection: {
        Mounts: fetch.Mounts,
        Minions: fetch.Minions,
      },
      Jobs: {
        Bozjan: fetch.Character.ClassJobsBozjan,
        Elemental: fetch.Character.ClassJobsElemental,
        Battle: {
          Tanks: {
            Paladin: fetch.Character.ClassJobs[0],
            Warrior: fetch.Character.ClassJobs[1],
            DarkKnight: fetch.Character.ClassJobs[2],
            Gunbreaker: fetch.Character.ClassJobs[3],
          },
          Healers: {
            WhiteMage: fetch.Character.ClassJobs[4],
            Scholar: fetch.Character.ClassJobs[5],
            Astrologian: fetch.Character.ClassJobs[6],
            Sage: fetch.Character.ClassJobs[7],
          },
          Melee: {
            Monk: fetch.Character.ClassJobs[8],
            Dragoon: fetch.Character.ClassJobs[9],
            Ninja: fetch.Character.ClassJobs[10],
            Samurai: fetch.Character.ClassJobs[11],
            Reaper: fetch.Character.ClassJobs[12],
          },
          RangedPhys: {
            Bard: fetch.Character.ClassJobs[13],
            Machinist: fetch.Character.ClassJobs[14],
            Dancer: fetch.Character.ClassJobs[15],
          },
          RangedMagic: {
            BlackMage: fetch.Character.ClassJobs[16],
            Summoner: fetch.Character.ClassJobs[17],
            RedMage: fetch.Character.ClassJobs[18],
            BlueMage: fetch.Character.ClassJobs[19],
          },
        },
        CraftGather: {
          Craft: {
            Carpenter: fetch.Character.ClassJobs[20],
            Blacksmith: fetch.Character.ClassJobs[21],
            Armorer: fetch.Character.ClassJobs[22],
            Goldsmith: fetch.Character.ClassJobs[23],
            Leatherworker: fetch.Character.ClassJobs[24],
            Weaver: fetch.Character.ClassJobs[25],
            Alchemist: fetch.Character.ClassJobs[26],
            Culinarian: fetch.Character.ClassJobs[27],
          },
          Gather: {
            Miner: fetch.Character.ClassJobs[28],
            Botanist: fetch.Character.ClassJobs[29],
            Fisher: fetch.Character.ClassJobs[30],
          },
        },
      },
    };

    setChar(result);
  }

  useEffect(() => {
    fetchCharacter();
  }, [charId]);

  const value: CharacterContextType = { char };
  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};
