import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ChevronDownIcon,
  FemaleIcon,
  MaleIcon,
  MinusIcon,
  PlusIcon,
} from "../../../Assets/Images/UI";
import { useFreeCompany } from "../../../Contexts/FreeCompanyContext";
import { useStats } from "../../../Contexts/StatsContext";
import {
  AchievementsTypes,
  CollectibleData,
  CollectibleTypes,
  jobData,
  raceData,
} from "../../../Types";

export const Summary = () => {
  const {
    popularJobs,
    popularRaces,
    popularGender,
    popularMount,
    popularMinion,
    rareAchievement,
  } = useStats();
  const { MembersFullData } = useFreeCompany();

  let publicAchievement: number = 0;
  MembersFullData.forEach(
    (member) => member.Achievements.List.length > 0 && publicAchievement++
  );

  const Divider = () => {
    return <div className="divider m-0"></div>;
  };

  const ShowData = ({
    name,
    value,
    strValue,
    icon,
  }: {
    name: string;
    value?: number;
    strValue?: string;
    icon?: any;
  }) => {
    return (
      <div className="flex justify-between duration-200 hover:text-accent">
        <div className="flex items-center gap-2">
          {icon && icon}
          <span>{name}</span>
        </div>
        {strValue ? (
          <span>{strValue}</span>
        ) : (
          <span>{value === 0 ? "-" : value}</span>
        )}
      </div>
    );
  };

  interface raceProps {
    data: raceData;
  }

  const Race = ({ data }: raceProps) => {
    const {
      RaceCount,
      TribeCount_1,
      TribeCount_2,
      MaleCount,
      FemaleCount,
      memberList,
    } = data;

    const {
      Name,
      Tribes: { Tribe1, Tribe2 },
    } = data.raceData;

    const { Avatar, Name: CharName } =
      memberList[Math.floor(Math.random() * memberList.length)].Character;

    return (
      <div className="grid gap-2 rounded-lg bg-base-200 p-4 duration-200 hover:bg-base-300">
        <div className="grid justify-center gap-2 p-4">
          <div className="tooltip" data-tip={CharName}>
            <img src={Avatar} alt={Name} className="mask mask-squircle w-24" />
          </div>
          <h4 className="text-center text-lg">{Name}</h4>
        </div>

        <div className="rounded-lg bg-neutral px-4 py-2">
          <ShowData name="Characters" value={RaceCount} />
        </div>

        <div className="rounded-lg bg-neutral px-4 py-2">
          <ShowData name={Tribe1.Name} value={TribeCount_1} />
          <ShowData name={Tribe2.Name} value={TribeCount_2} />
        </div>

        <div className="rounded-lg bg-neutral px-4 py-2">
          <ShowData
            name="Male"
            value={MaleCount}
            icon={<MaleIcon className="h-4 w-4" />}
          />
          <ShowData
            name="Female"
            value={FemaleCount}
            icon={<FemaleIcon className="h-4 w-4" />}
          />
        </div>
      </div>
    );
  };

  const PopularRaces = () => {
    const top3 = popularRaces.slice(0, 3);

    return (
      <div className="grid gap-2">
        <div className="flex justify-between">
          <h2 className="text-2xl">Most popular Races</h2>
          <button className="btn-primary btn">See full List →</button>
        </div>
        <div className="grid gap-2 md:grid-cols-3">
          {top3.map((race) => (
            <Race key={uuidv4()} data={race} />
          ))}
        </div>
      </div>
    );
  };

  interface GenderProps {
    name: string;
    count: number;
    Icon: any;
  }

  const Gender = ({ name, count, Icon }: GenderProps) => {
    return (
      <div className="flex gap-4 rounded-lg bg-base-200 p-8 duration-200 hover:bg-base-300 hover:text-accent">
        <div className="grid justify-center gap-2">
          {Icon}
          <h4 className="text-center text-lg">{name}</h4>
        </div>
        <div className="divider divider-horizontal"></div>
        <h3 className="flex h-full w-full items-center justify-center text-2xl font-bold sm:text-6xl">
          {count}
        </h3>
      </div>
    );
  };

  const PopularGender = () => {
    const male = popularGender[0];
    const female = popularGender[1];

    return (
      <div className="grid gap-2">
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Gender
            Icon={<MaleIcon className="h-8 w-8 sm:h-16 sm:w-16" />}
            name="Male"
            count={male.count}
          />
          <Gender
            Icon={<FemaleIcon className="h-8 w-8 sm:h-16 sm:w-16" />}
            name="Female"
            count={female.count}
          />
        </div>
      </div>
    );
  };

  interface JobProps {
    data: jobData;
  }

  const Job = ({ data }: JobProps) => {
    const { LvMax, Lv80, Lv70, Lv60, Lv50, Lv30 } = data;
    const { Job, Role, ImageSrc } = data.jobData;

    return (
      <div className="grid gap-2 rounded-lg bg-base-300 p-4">
        <div className="grid justify-center gap-2 p-4">
          <img
            src={ImageSrc}
            alt={Job}
            className={`mask mask-squircle w-24 p-4 bg-${Role.toLowerCase()}`}
          />
          <h4 className="text-center text-lg">{Job}</h4>
        </div>

        <div className="rounded-lg bg-neutral px-4 py-2">
          <ShowData name="Max Level" value={LvMax} />
        </div>
        <div className="rounded-lg bg-neutral px-4 py-2">
          <ShowData name="Level 80+" value={Lv80} />
          <ShowData name="Level 70+" value={Lv70} />
          <ShowData name="Level 60+" value={Lv60} />
          <ShowData name="Level 50+" value={Lv50} />
          <ShowData name="Level 30+" value={Lv30} />
        </div>
      </div>
    );
  };

  const PopularJobs = () => {
    const top3 = popularJobs.slice(0, 3);

    return (
      <div className="grid gap-2">
        <div className="flex justify-between">
          <h2 className="text-2xl">Most popular Jobs</h2>
          <button className="btn-primary btn">See full List →</button>
        </div>
        <div className="grid gap-2 md:grid-cols-3">
          {top3.map((job: jobData) => (
            <Job key={uuidv4()} data={job} />
          ))}
        </div>
      </div>
    );
  };

  interface CollectibleProps {
    data: CollectibleTypes;
    showOwners?: boolean;
  }

  const Collectible = ({ data, showOwners }: CollectibleProps) => {
    const { count, MainStory, owners } = data;
    const { Name, Icon } = data.collectibleData;

    const percentage = Math.floor((count / MembersFullData.length) * 100);
    const dataValue = `${count} (${percentage}%)`;

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
          <ShowData name="Owned" strValue={dataValue} />
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

  const PopularMounts = () => {
    const filter = popularMount.filter((mount) => mount.MainStory !== true);
    const MSQFilter = popularMount.filter((mount) => mount.MainStory === true);
    const top3 = filter.slice(0, 3);

    const [showMSQ, setShowMSQ] = useState<boolean>(false);

    return (
      <div className="grid gap-2">
        <div className="flex justify-between">
          <h2 className="text-2xl">Most popular Mounts</h2>
          <button className="btn-primary btn">See full List →</button>
        </div>

        <button
          className="btn w-fit gap-2"
          onClick={() => setShowMSQ(!showMSQ)}
        >
          {showMSQ ? (
            <>
              <MinusIcon className="w-4" /> Hide Main Story Quest Mounts
            </>
          ) : (
            <>
              <PlusIcon className="w-4" />
              Show Main Story Quest Mounts
            </>
          )}
        </button>

        {showMSQ && (
          <div className="grid gap-2 rounded-lg bg-base-300 p-4 md:grid-cols-3">
            {MSQFilter.map((mount) => {
              return <Collectible key={uuidv4()} data={mount} />;
            })}
          </div>
        )}

        <div className="grid gap-2 md:grid-cols-3">
          {top3.map((mount) => {
            return <Collectible key={uuidv4()} data={mount} />;
          })}
        </div>
      </div>
    );
  };

  const RarestMounts = () => {
    const reverse = [...popularMount].reverse();
    const filter = reverse.filter(
      (mount) => mount.Premium !== true && mount.owners.length > 1
    );
    const filterSingleOwner = reverse.filter(
      (mount) => mount.owners.length === 1
    );
    const top3 = filter.slice(0, 3);

    const [showSingle, setShowSingle] = useState<boolean>(false);

    return (
      <div className="grid gap-2">
        <div className="flex justify-between">
          <h2 className="text-2xl">Rarest Mounts</h2>
          <button className="btn-primary btn">See full List →</button>
        </div>

        <button
          className="btn w-fit gap-2"
          onClick={() => setShowSingle(!showSingle)}
        >
          {showSingle ? (
            <>
              <MinusIcon className="w-4" /> Hide Single Owners
            </>
          ) : (
            <>
              <PlusIcon className="w-4" />
              Show Single Owners
            </>
          )}
        </button>

        {showSingle && (
          <div className="grid gap-2 rounded-lg bg-base-300 p-4 md:grid-cols-3">
            {filterSingleOwner.map((mount) => {
              return <Collectible key={uuidv4()} data={mount} showOwners />;
            })}
          </div>
        )}
        <div className="grid gap-2 md:grid-cols-3">
          {top3.map((mount) => {
            return <Collectible key={uuidv4()} data={mount} showOwners />;
          })}
        </div>
      </div>
    );
  };

  const PopularMinions = () => {
    const filter = popularMinion.filter((mount) => mount.MainStory !== true);
    const MSQFilter = popularMinion.filter((mount) => mount.MainStory === true);
    const top3 = filter.slice(0, 3);

    const [showMSQ, setShowMSQ] = useState<boolean>(false);

    return (
      <div className="grid gap-2">
        <div className="flex justify-between">
          <h2 className="text-2xl">Most popular Minions</h2>
          <button className="btn-primary btn">See full List →</button>
        </div>

        <button
          className="btn w-fit gap-2"
          onClick={() => setShowMSQ(!showMSQ)}
        >
          {showMSQ ? (
            <>
              <MinusIcon className="w-4" /> Hide Main Story Quest Minions
            </>
          ) : (
            <>
              <PlusIcon className="w-4" />
              Show Main Story Quest Minions
            </>
          )}
        </button>

        {showMSQ && (
          <div className="grid gap-2 rounded-lg bg-base-300 p-4 md:grid-cols-3">
            {MSQFilter.map((mount) => {
              return <Collectible key={uuidv4()} data={mount} />;
            })}
          </div>
        )}

        <div className="grid gap-2 md:grid-cols-3">
          {top3.map((mount) => {
            return <Collectible key={uuidv4()} data={mount} />;
          })}
        </div>
      </div>
    );
  };

  const RarestMinions = () => {
    const reverse = [...popularMinion].reverse();
    const filter = reverse.filter(
      (mount) => mount.Premium !== true && mount.owners.length > 1
    );
    const filterSingleOwner = reverse.filter(
      (mount) => mount.owners.length === 1
    );
    const top3 = filter.slice(0, 3);

    const [showSingle, setShowSingle] = useState<boolean>(false);

    return (
      <div className="grid gap-2">
        <div className="flex justify-between">
          <h2 className="text-2xl">Rarest Mounts</h2>
          <button className="btn-primary btn">See full List →</button>
        </div>

        <button
          className="btn w-fit gap-2"
          onClick={() => setShowSingle(!showSingle)}
        >
          {showSingle ? (
            <>
              <MinusIcon className="w-4" /> Hide Single Owners
            </>
          ) : (
            <>
              <PlusIcon className="w-4" />
              Show Single Owners
            </>
          )}
        </button>

        {showSingle && (
          <div className="grid gap-2 rounded-lg bg-base-300 p-4 md:grid-cols-3">
            {filterSingleOwner.map((mount) => {
              return <Collectible key={uuidv4()} data={mount} showOwners />;
            })}
          </div>
        )}
        <div className="grid gap-2 md:grid-cols-3">
          {top3.map((mount) => {
            return <Collectible key={uuidv4()} data={mount} showOwners />;
          })}
        </div>
      </div>
    );
  };

  interface AchievementProps {
    data: AchievementsTypes;
    showOwners?: boolean;
  }

  const Achievement = ({ data, showOwners }: AchievementProps) => {
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

  const RarestAchievements = () => {
    const reverse = [...rareAchievement].reverse();
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

  return (
    <section className="mt-4 grid gap-4">
      <div className="rounded-lg bg-base-100 p-8">
        <h2 className="text-3xl font-bold">Character</h2>
        <div className="divider"></div>
        <PopularRaces />
        <div className="divider"></div>
        <PopularGender />
      </div>

      <div className="rounded-lg bg-base-100 p-8">
        <h2 className="text-3xl font-bold">Job</h2>
        <div className="divider"></div>
        <PopularJobs />
      </div>

      <div className="rounded-lg bg-base-100 p-8">
        <h2 className="text-3xl font-bold">Mount</h2>
        <div className="divider"></div>
        <PopularMounts />
        <div className="divider"></div>
        <RarestMounts />
      </div>

      <div className="rounded-lg bg-base-100 p-8">
        <h2 className="text-3xl font-bold">Minion</h2>
        <div className="divider"></div>
        <PopularMinions />
        <div className="divider"></div>
        <RarestMinions />
      </div>

      <div className="rounded-lg bg-base-100 p-8">
        <h2 className="text-3xl font-bold">Achievement</h2>
        <h4>
          Using data of{" "}
          <span className="text-accent">{publicAchievement} characters</span>{" "}
          that made their Achievements Public.
        </h4>
        <div className="divider"></div>
        <RarestAchievements />
      </div>
    </section>
  );
};
