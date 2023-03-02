type MemberType = {
  Avatar: string;
  FeastMatches: number;
  ID: number;
  Lang: any;
  Name: string;
  Rank: string;
  RankIcon: string;
  Server: string;
};

export const parseStaff = (Members: MemberType[]) => {
  const uniqueRanks: string[] = [];
  const staffList: object[] = [];

  for (let member of Members) {
    if (!uniqueRanks.includes(member.Rank) && uniqueRanks.length <= 2) {
      uniqueRanks.push(member.Rank);
      staffList.push(member);
    }
    if (uniqueRanks.includes(member.Rank)) staffList.push(member);
  }

  return staffList;
};
