import { getCharacter } from "@/Helpers";
import { CharacterData } from "@/Types";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFreeCompany } from "./FreeCompanyContext";

type CharacterContextType = {
  char: CharacterData;
};

const CharacterContext = createContext<CharacterContextType>({
  char: {
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
      Estate: { Greeting: "", Name: "", Plot: "" },
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

  function getMember() {
    const fcMember = MembersFullData.find(
      (member) => member.Character.ID === CharacterID
    );
    if (fcMember) return fcMember;
  }

  async function fetchCharacter() {
    const result = await getCharacter(
      CharacterID,
      true,
      false,
      true,
      false,
      true,
      true
    );
    setChar(result);
  }

  const [char, setChar] = useState<CharacterData>({
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
      Estate: { Greeting: "", Name: "", Plot: "" },
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
  });

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
