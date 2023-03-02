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
