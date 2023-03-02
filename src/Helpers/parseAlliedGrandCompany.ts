import GridaniaFlag from "../Assets/Images/UI/GridaniaFlag.png";
import LimsaLominsaFlag from "../Assets/Images/UI/LimsaLominsaFlag.png";
import UlDahFlag from "../Assets/Images/UI/Ul'dahFlag.png";
import { FreeCompanyReputation } from "./xviapi";

export const parseAlliedGC = (Reputation: FreeCompanyReputation[]) => {
  const AlliedGC = Reputation.filter((e) => e.Rank === "Allied")[0];
  if (AlliedGC === null) return { Name: "Not Allied with any Grand Company" };
  let Icon = "";
  if (AlliedGC.Name === "Maelstrom") Icon = LimsaLominsaFlag;
  if (AlliedGC.Name === "Order of the Twin Adder") Icon = GridaniaFlag;
  if (AlliedGC.Name === "Immortal Flames") Icon = UlDahFlag;

  return {
    Name: AlliedGC.Name,
    Icon: Icon,
  };
};
