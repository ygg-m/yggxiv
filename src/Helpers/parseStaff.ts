import { MembersListTypes } from "../Types/index";

export const parseStaff = (Members: MembersListTypes[]) => {
  const uniqueRanks: string[] = [];
  const staffList: object[] = [];

  for (let member of Members) {
    const rankNotOnList = !uniqueRanks.includes(member.Rank);
    const rankOnList = uniqueRanks.includes(member.Rank);

    if (rankNotOnList && uniqueRanks.length <= 2) {
      uniqueRanks.push(member.Rank);
      staffList.push(member);
    }
    if (rankOnList) staffList.push(member);
  }

  return staffList;
};
