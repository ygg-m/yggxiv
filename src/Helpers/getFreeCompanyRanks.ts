import { FreeCompanyMembersSmall as MemberTypes, RankListTypes } from "../Types/index";

export const getRanks = (Members: MemberTypes[]) => {
  const uniqueRanks: RankListTypes[] = Members.reduce(
    (acc: RankListTypes[], obj: RankListTypes) => {
      const existingObj = acc.find((o: RankListTypes) => o.Rank === obj.Rank);

      if (!existingObj) {
        acc.push({ Rank: obj.Rank, RankIcon: obj.RankIcon, isChecked: true });
      }

      return acc;
    },
    []
  );

  return uniqueRanks;
};
