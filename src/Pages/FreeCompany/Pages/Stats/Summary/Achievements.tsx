import { SimpleLoading } from "@/Components/LoadingComponents/SimpleLoading";
import { useFreeCompany } from "@/Contexts/FreeCompanyContext";
import { useStats } from "@/Contexts/StatsContext";
import { AchievementsTypes } from "@/Types";
import { v4 as uuidv4 } from "uuid";
import { ShowData } from "../ShowData";

interface AchievementProps {
  data: AchievementsTypes;
  showOwners?: boolean;
}

interface RareAchievementProps {
  data: AchievementsTypes[];
}

const Achievement = ({ data, showOwners }: AchievementProps) => {
  if (!data.achieveData) return <SimpleLoading />;

  const { count, owners } = data;
  const { Name, Icon } = data.achieveData;

  return (
    <div className="grid gap-2 rounded-lg bg-base-200 p-4 duration-200 hover:bg-base-300">
      <div className="grid place-items-center justify-center gap-2 p-4">
        <img
          src={`https://xivapi.com/${Icon}`}
          alt={Name}
          className="mask mask-squircle w-24"
        />
        <h4 className="text-center text-lg capitalize">{Name}</h4>
      </div>

      <div className="grid items-center rounded-lg bg-neutral px-4 py-2">
        <ShowData name="Owned" value={count} />
      </div>

      {showOwners && (
        <div className="grid rounded-lg bg-neutral px-4 py-2">
          <span>Owners</span>
          <div className="flex flex-wrap">
            {owners.map((owner) => {
              const { Name, Avatar } = owner.Character;
              return (
                <div
                  className="tooltip cursor-pointer rounded-lg p-2 duration-200 hover:bg-base-300"
                  data-tip={Name}
                  key={uuidv4()}
                >
                  <img
                    src={Avatar}
                    alt={Name}
                    className="mask mask-squircle w-10"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const RarestAchievements = ({ data }: RareAchievementProps) => {
  const reverse = [...data].reverse();
  const top3 = reverse.slice(0, 3);

  return (
    <div className="grid gap-2">
      <div className="flex justify-between">
        <h2 className="text-2xl">Rarest Achievements</h2>
        <button className="btn-primary btn">See full List →</button>
      </div>

      <div className="grid gap-2 md:grid-cols-3">
        {top3.map((achieve) => (
          <Achievement key={uuidv4()} data={achieve} showOwners />
        ))}
      </div>
    </div>
  );
};

export const Achievements = () => {
  const { rareAchievement } = useStats();
  const { MembersFullData } = useFreeCompany();

  let publicAchievement: number = 0;
  MembersFullData.forEach(
    (member) => member.Achievements.List.length > 0 && publicAchievement++
  );

  return (
    <div className="rounded-lg p-8">
      <h2 className="text-3xl font-bold">Achievement</h2>
      <h4>
        Using data of{" "}
        <span className="text-accent">{publicAchievement} characters</span> that
        made their Achievements Public.
      </h4>
      <div className="divider"></div>
      <RarestAchievements data={rareAchievement} />
    </div>
  );
};
