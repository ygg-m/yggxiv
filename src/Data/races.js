import {
  AuraRaenFem,
  AuraRaenMale,
  AuraXaelaFem,
  AuraXaelaMale,
  ElezenDuskwightFem,
  ElezenDuskwightMale,
  ElezenWildwoodFem,
  ElezenWildwoodMale,
  HrothgarHelionsMale,
  HrothgarLostMale,
  HyurHighlanderFem,
  HyurHighlanderMale,
  HyurMidlanderFem,
  HyurMidlanderMale,
  LalafellDunesfolkFem,
  LalafellDunesfolkMale,
  LalafellPlainsfolkFem,
  LalafellPlainsfolkMale,
  MiqoteMoonFem,
  MiqoteMoonMale,
  MiqoteSunFem,
  MiqoteSunMale,
  RoegadynHellsguardFem,
  RoegadynHellsguardMale,
  RoegadynSeaFem,
  RoegadynSeaMale,
  VieraRavaFem,
  VieraRavaMale,
  VieraVeenaFem,
  VieraVeenaMale,
} from "../Assets/Images/Races";

export const races = [
  {
    ID: 1,
    Icon: HyurMidlanderMale,
    Name: "Hyur",
    Tribes: {
      Tribe1: { ID: 1, Icon: HyurMidlanderMale, Name: "Midlander" },
      Tribe2: { ID: 2, Icon: HyurHighlanderMale, Name: "Highlander" },
    },
  },
  {
    ID: 2,
    Icon: ElezenWildwoodMale,
    Name: "Elezen",
    Tribes: {
      Tribe1: { ID: 3, Icon: ElezenWildwoodMale, Name: "Wildwood" },
      Tribe2: { ID: 4, Icon: ElezenDuskwightMale, Name: "Duskwight" },
    },
  },
  {
    ID: 3,
    Icon: LalafellPlainsfolkMale,
    Name: "Lalafell",
    Tribes: {
      Tribe1: { ID: 5, Icon: LalafellPlainsfolkMale, Name: "Plainsfolk" },
      Tribe2: { ID: 6, Icon: LalafellDunesfolkMale, Name: "Dunesfolk" },
    },
  },
  {
    ID: 4,
    Icon: MiqoteMoonMale,
    Name: "Miqo'te",
    Tribes: {
      Tribe1: { ID: 7, Icon: MiqoteSunMale, Name: "Seeker of the Sun" },
      Tribe2: { ID: 8, Icon: MiqoteMoonMale, Name: "Keeper of the Moon" },
    },
  },
  {
    ID: 5,
    Icon: RoegadynSeaMale,
    Name: "Roegadyn",
    Tribes: {
      Tribe1: { ID: 9, Icon: RoegadynSeaMale, Name: "Sea Wolves" },
      Tribe2: { ID: 10, Icon: RoegadynHellsguardMale, Name: "Hellsguard" },
    },
  },
  {
    ID: 6,
    Icon: AuraRaenMale,
    Name: "Au Ra",
    Tribes: {
      Tribe1: { ID: 11, Icon: AuraRaenMale, Name: "Raen" },
      Tribe2: { ID: 12, Icon: AuraXaelaMale, Name: "Xaela" },
    },
  },
  {
    ID: 7,
    Icon: HrothgarLostMale,
    Name: "Hrothgar",
    Tribes: {
      Tribe1: { ID: 13, Icon: HrothgarHelionsMale, Name: "Helions" },
      Tribe2: { ID: 14, Icon: HrothgarLostMale, Name: "The Lost" },
    },
  },
  {
    ID: 8,
    Icon: VieraRavaFem,
    Name: "Viera",
    Tribes: {
      Tribe1: { ID: 15, Icon: VieraRavaFem, Name: "Rava" },
      Tribe2: { ID: 16, Icon: VieraRavaMale, Name: "Veena" },
    },
  },
];
