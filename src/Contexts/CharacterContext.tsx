import { grandCompanies } from "@/Data/grandCompanies";
import { guardianDeities } from "@/Data/guardianDeities";
import { jobs } from "@/Data/jobs";
import { races } from "@/Data/races";
import { getCharacter } from "@/Helpers";
import { getCity, getTitle } from "@/Helpers/xviapi";
import {
  ClassJobs,
  Collectible,
  CollectibleData,
  TreatedCharData,
  TreatedJobData,
} from "@/Types";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGameData } from "./GameDataContext";

type CharacterContextType = {
  char: TreatedCharData;
};

const CharacterContext = createContext<CharacterContextType>({
  char: {
    Data: {
      ID: 0,
      Name: "",
      LastLogin: new Date(),
      DataCenter: {
        Name: "",
        Server: "",
      },
    },
    Profile: {
      Name: "",
      Bio: "",
      Gender: "",
      Title: "",
      Avatar: "",
      Portrait: "",
      StarterCity: {
        ID: 0,
        Icon: "",
        Name: "",
      },
      Race: {
        Name: "",
        Tribe: "",
      },
      Astro: {
        Nameday: { Simple: "", Full: "" },
        Guardian: { ID: 0, Name: "", Icon: "" },
      },
    },
    GrandCompany: {
      Name: "",
      Icon: "",
      Rank: {
        Name: "",
        Icon: "",
      },
    },
    FreeCompany: {
      ID: "",
      Name: "",
      Tag: "",
      Crest: [],
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
        Tanks: [],
        Healers: [],
        Melee: [],
        RangedPhys: [],
        RangedMagic: [],
      },
      CraftGather: {
        Craft: [],
        Gather: [],
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
  const { mounts, minions } = useGameData();

  const CharacterID = parseInt(charId || "0");

  const [char, setChar] = useState<TreatedCharData>({
    Data: {
      ID: 0,
      Name: "",
      LastLogin: new Date(),
      DataCenter: {
        Name: "",
        Server: "",
      },
    },
    Profile: {
      Name: "",
      Bio: "",
      Gender: "",
      Title: "",
      Avatar: "",
      Portrait: "",
      StarterCity: {
        ID: 0,
        Icon: "",
        Name: "",
      },
      Race: {
        Name: "",
        Tribe: "",
      },
      Astro: {
        Nameday: { Simple: "", Full: "" },
        Guardian: { ID: 0, Name: "", Icon: "" },
      },
    },
    GrandCompany: {
      Name: "",
      Icon: "",
      Rank: {
        Name: "",
        Icon: "",
      },
    },
    FreeCompany: {
      ID: "",
      Name: "",
      Tag: "",
      Crest: [],
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
        Tanks: [],
        Healers: [],
        Melee: [],
        RangedPhys: [],
        RangedMagic: [],
      },
      CraftGather: {
        Craft: [],
        Gather: [],
      },
    },
  });

  // Get char Basic Info
  function getGender(id: number) {
    return id === 1 ? "Male" : "Female";
  }

  async function fetchTitle(id: number) {
    const data = await getTitle(id);
    return data.Name;
  }

  async function fetchCity(id: number) {
    const data = await getCity(id);
    return data;
  }

  function getRace(id: number) {
    const data = races.find((e) => e.ID === id);
    return data?.Name || "";
  }

  function getTribe(id: number) {
    const data1 = races.find((e) => e.Tribes.Tribe1.ID === id);
    const data2 = races.find((e) => e.Tribes.Tribe2.ID === id);

    if (data1) return data1?.Tribes.Tribe1.Name;
    if (data2) return data2?.Tribes.Tribe2.Name;
    else return "";
  }

  function convertEorzeanDateToDDMM(dateString: string) {
    // Define a mapping of Eorzean month names to their corresponding numbers
    const monthMap: { [monthName: string]: number } = {
      "1st Astral Moon": 1,
      "1st Umbral Moon": 2,
      "2nd Astral Moon": 3,
      "2nd Umbral Moon": 4,
      "3rd Astral Moon": 5,
      "3rd Umbral Moon": 6,
      "4th Astral Moon": 7,
      "4th Umbral Moon": 8,
      "5th Astral Moon": 9,
      "5th Umbral Moon": 10,
      "6th Astral Moon": 11,
      "6th Umbral Moon": 12,
    };

    // Split the input string into an array of words
    const words = dateString.split(" ");

    // Extract the ordinal and monthName values from the words array
    const ordinal = words[0];
    const monthName = words.slice(4).join(" ");

    // Convert the ordinal to a number
    const day = parseInt(ordinal);

    // Convert the month name to its corresponding number using the monthMap
    const month = monthMap[monthName];

    // Calculate the day of the month based on the ordinal
    const dayOfMonth = ((day - 1) % 32) + 1;

    // Format the month and day as two-digit strings
    const monthString = month.toString().padStart(2, "0");
    const dayString = dayOfMonth.toString().padStart(2, "0");

    // Return the date in DD/MM format
    return `${dayString}/${monthString}`;
  }

  function getGuardianDeity(id: number) {
    const data = guardianDeities.find((e) => e.ID === id);
    const empty = { ID: 0, Name: "", Icon: "" };

    return data || empty;
  }

  function getGrandCompany(id: number, rankId: number) {
    const data = grandCompanies.find((e) => e.ID === id);
    const rank = data?.Ranks.find((e) => e.ID === rankId);
    const empty = {
      Name: "",
      Icon: "",
      Rank: {
        Name: "",
        Icon: "",
      },
    };

    if (data && rank)
      return {
        Name: data.Name,
        Icon: data.Icon,
        Rank: {
          Name: rank.Name,
          Icon: rank.Icon,
        },
      };
    else return empty;
  }

  function getMountData(arr: Collectible[]) {
    const data = arr.map((e) =>
      mounts.find(
        (a: CollectibleData) => a.Name.toLowerCase() === e.Name.toLowerCase()
      )
    );

    return data;
  }

  function getMinionData(arr: Collectible[]) {
    const data = arr.map((e) =>
      minions.find(
        (a: CollectibleData) => a.Name.toLowerCase() === e.Name.toLowerCase()
      )
    );

    return data;
  }

  function getJobData(job: ClassJobs): TreatedJobData {
    const JobData = jobs.find((e) => {
      return job.UnlockedState.ID
        ? e.ID === job.UnlockedState.ID
        : e.ID === job.JobID;
    });
    const empty = {
      ID: 0,
      Name: "",
      Tag: "",
      Role: "",
      Position: "",
      Image: "",
      Exp: 0,
      ExpMax: 0,
      Level: 0,
    };
    const result = {
      ID: job.UnlockedState.ID || job.JobID,
      Name: job.UnlockedState.Name,
      Tag: JobData?.Tag || "",
      Role: JobData?.Role || "",
      Position: JobData?.Position || "",
      Image: JobData?.ImageSrc || "",
      Exp: job.ExpLevel,
      ExpMax: job.ExpLevelMax,
      Level: job.Level,
    };

    if (JobData) return result;
    else return empty;
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
        LastLogin: new Date(fetch.Character.ParseDate * 1000),
        DataCenter: {
          Name: fetch.Character.DC,
          Server: fetch.Character.Server,
        },
      },
      Profile: {
        Name: fetch.Character.Name,
        Bio: fetch.Character.Bio,
        Gender: getGender(fetch.Character.Gender),
        Title: await fetchTitle(fetch.Character.Title),
        Avatar: fetch.Character.Avatar,
        Portrait: fetch.Character.Portrait,
        StarterCity: await fetchCity(fetch.Character.Town),
        Race: {
          Name: getRace(fetch.Character.Race),
          Tribe: getTribe(fetch.Character.Tribe),
        },
        Astro: {
          Nameday: {
            Simple: convertEorzeanDateToDDMM(fetch.Character.Nameday),
            Full: fetch.Character.Nameday,
          },
          Guardian: getGuardianDeity(fetch.Character.GuardianDeity),
        },
      },
      GrandCompany: getGrandCompany(
        fetch.Character.GrandCompany.NameID,
        fetch.Character.GrandCompany.RankID
      ),
      FreeCompany: {
        ID: fetch.Character.FreeCompanyId,
        Name: fetch.Character.FreeCompanyName,
        Tag: fetch.FreeCompany.Tag,
        Crest: fetch.FreeCompany.Crest,
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
              ID: fetch.Character.GearSet.Gear.SoulCrystal?.ID,
              Name: fetch.Character.GearSet.Gear.SoulCrystal?.ID, // TODO: solve Name
              Glamour: fetch.Character.GearSet.Gear.SoulCrystal?.Mirage, // TODO: solve Data
              Materia: fetch.Character.GearSet.Gear.SoulCrystal?.Materia, // TODO: solve Name
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
        Mounts: getMountData(fetch.Mounts),
        Minions: getMinionData(fetch.Minions),
      },
      Jobs: {
        Bozjan: fetch.Character.ClassJobsBozjan,
        Elemental: fetch.Character.ClassJobsElemental,
        Battle: {
          Tanks: [
            getJobData(fetch.Character.ClassJobs[0]),
            getJobData(fetch.Character.ClassJobs[1]),
            getJobData(fetch.Character.ClassJobs[2]),
            getJobData(fetch.Character.ClassJobs[3]),
          ],
          Healers: [
            getJobData(fetch.Character.ClassJobs[4]),
            getJobData(fetch.Character.ClassJobs[5]),
            getJobData(fetch.Character.ClassJobs[6]),
            getJobData(fetch.Character.ClassJobs[7]),
          ],
          Melee: [
            getJobData(fetch.Character.ClassJobs[8]),
            getJobData(fetch.Character.ClassJobs[9]),
            getJobData(fetch.Character.ClassJobs[10]),
            getJobData(fetch.Character.ClassJobs[11]),
            getJobData(fetch.Character.ClassJobs[12]),
          ],

          RangedPhys: [
            getJobData(fetch.Character.ClassJobs[13]),
            getJobData(fetch.Character.ClassJobs[14]),
            getJobData(fetch.Character.ClassJobs[15]),
          ],

          RangedMagic: [
            getJobData(fetch.Character.ClassJobs[16]),
            getJobData(fetch.Character.ClassJobs[17]),
            getJobData(fetch.Character.ClassJobs[18]),
            getJobData(fetch.Character.ClassJobs[19]),
          ],
        },
        CraftGather: {
          Craft: [
            getJobData(fetch.Character.ClassJobs[20]),
            getJobData(fetch.Character.ClassJobs[21]),
            getJobData(fetch.Character.ClassJobs[22]),
            getJobData(fetch.Character.ClassJobs[23]),
            getJobData(fetch.Character.ClassJobs[24]),
            getJobData(fetch.Character.ClassJobs[25]),
            getJobData(fetch.Character.ClassJobs[26]),
            getJobData(fetch.Character.ClassJobs[27]),
          ],
          Gather: [
            getJobData(fetch.Character.ClassJobs[28]),
            getJobData(fetch.Character.ClassJobs[29]),
            getJobData(fetch.Character.ClassJobs[30]),
          ],
        },
      },
    };

    setChar(result);
  }

  useEffect(() => {
    if (charId) fetchCharacter();
  }, [charId]);

  const value: CharacterContextType = { char };
  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};
