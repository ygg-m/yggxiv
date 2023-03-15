import { v4 as uuidv4 } from "uuid";
import { FemaleIcon, MaleIcon } from "../../../Assets/Images/UI";
import { useStats } from "../../../Contexts/StatsContext";
import { jobData, raceData } from "../../../Types";

export const Summary = () => {
  const { popularJobs, popularRaces, popularGender } = useStats();

  const Divider = () => {
    return <div className="divider m-0"></div>;
  };

  const ShowData = ({ name, value }: { name: string; value: number }) => {
    return (
      <div className="flex justify-between">
        <span className="opacity-50">{name}</span>
        <span>{value === 0 ? "-" : value}</span>
      </div>
    );
  };

  interface raceProps {
    data: raceData;
  }

  const Race = ({ data }: raceProps) => {
    const { RaceCount, TribeCount_1, TribeCount_2, MaleCount, FemaleCount } =
      data;
    const {
      Icon,
      Name,
      Tribes: { Tribe1, Tribe2 },
    } = data.raceData;

    return (
      <div className="grid gap-2 bg-base-300 p-4 rounded-lg">
        <div className="grid justify-center gap-2">
          <img src={Icon} alt={Name} className="mask mask-squircle w-24" />
          <h4 className="text-lg text-center">{Name}</h4>
        </div>

        <Divider />

        <ShowData name="Characters" value={RaceCount} />

        <Divider />

        <ShowData name={Tribe1.Name} value={TribeCount_1} />
        <ShowData name={Tribe2.Name} value={TribeCount_2} />

        <Divider />

        <ShowData name="Male" value={MaleCount} />
        <ShowData name="Female" value={FemaleCount} />
      </div>
    );
  };

  const PopularRaces = () => {
    const top3 = popularRaces.slice(0, 3);

    return (
      <div className="grid gap-2">
        <h2 className="text-2xl">Most popular Races</h2>
        <div className="grid md:grid-cols-3 gap-2">
          {top3.map((race) => (
            <Race key={uuidv4()} data={race} />
          ))}
        </div>
        <button className="btn">See full List →</button>
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
      <div className="grid gap-2 bg-base-300 p-4 rounded-lg">
        <div className="grid justify-center gap-2">
          {Icon}
          <h4 className="text-lg text-center">{name}</h4>
        </div>

        <Divider />

        <ShowData name="Characters" value={count} />
      </div>
    );
  };

  const PopularGender = () => {
    const male = popularGender[0];
    const female = popularGender[1];

    return (
      <div className="grid gap-2">
        <h2 className="text-2xl">Most popular Gender</h2>
        <div className="grid sm:grid-cols-2 gap-2">
          <Gender
            Icon={<MaleIcon className="w-16 h-16" />}
            name="Male"
            count={male.count}
          />
          <Gender
            Icon={<FemaleIcon className="w-16 h-16" />}
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
      <div className="grid gap-2 bg-base-300 p-4 rounded-lg">
        <div className="grid justify-center gap-2">
          <img
            src={ImageSrc}
            alt={Job}
            className={`mask mask-squircle p-2 w-24 bg-${Role.toLowerCase()}`}
          />
          <h4 className="text-lg text-center">{Job}</h4>
        </div>

        <Divider />
        <ShowData name="Max Level" value={LvMax} />
        <Divider />
        <ShowData name="Level 80+" value={Lv80} />
        <ShowData name="Level 70+" value={Lv70} />
        <ShowData name="Level 60+" value={Lv60} />
        <ShowData name="Level 50+" value={Lv50} />
        <ShowData name="Level 30+" value={Lv30} />
      </div>
    );
  };

  const PopularJobs = () => {
    const top3 = popularJobs.slice(0, 3);

    return (
      <div className="grid gap-2">
        <h2 className="text-2xl">Most popular Jobs</h2>
        <div className="grid md:grid-cols-3 gap-2">
          {top3.map((job: jobData) => (
            <Job key={uuidv4()} data={job} />
          ))}
        </div>
        <button className="btn">See full List →</button>
      </div>
    );
  };

  const Mount = () => {
    return (
      <div className="grid gap-2 bg-base-300 p-4 rounded-lg">
        <div className="grid justify-center gap-2">
          <img
            src="https://xivapi.com/i/004000/004001_hr1.png"
            alt="Chocobo"
            className="mask mask-squircle w-24 bg-dps"
          />
          <h4 className="text-lg text-center">Chocobo</h4>
        </div>

        <Divider />
        <div className="flex justify-between">
          <span className="opacity-50">Owned</span>
          <span>130 (76%)</span>
        </div>
      </div>
    );
  };

  const PopularMounts = () => {
    return (
      <div className="grid gap-2">
        <h2 className="text-2xl">Most popular Mounts</h2>
        <div className="grid md:grid-cols-3 gap-2">
          <Mount />
          <Mount />
          <Mount />
        </div>
        <button className="btn">See full List →</button>
      </div>
    );
  };

  const RarestMounts = () => {
    return (
      <div className="grid gap-2">
        <h2 className="text-2xl">Rarest Mounts</h2>
        <div className="grid md:grid-cols-3 gap-2">
          <div className="grid gap-2 bg-base-300 p-4 rounded-lg">
            <div className="grid justify-center gap-2">
              <img
                src="https://xivapi.com/i/004000/004001_hr1.png"
                alt="Chocobo"
                className="mask mask-squircle w-24 bg-dps"
              />
              <h4 className="text-lg text-center">Chocobo</h4>
            </div>

            <Divider />
            <div className="flex justify-between">
              <span className="opacity-50">Owned</span>
              <span>3 (2%)</span>
            </div>
            <Divider />
            <div className="grid">
              <span className="opacity-50">Owners</span>
              <div className="flex flex-wrap">
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-2 bg-base-300 p-4 rounded-lg">
            <div className="grid justify-center gap-2">
              <img
                src="https://xivapi.com/i/004000/004001_hr1.png"
                alt="Chocobo"
                className="mask mask-squircle w-24 bg-dps"
              />
              <h4 className="text-lg text-center">Chocobo</h4>
            </div>

            <Divider />
            <div className="flex justify-between">
              <span className="opacity-50">Owned</span>
              <span>3 (2%)</span>
            </div>
            <Divider />
            <div className="grid">
              <span className="opacity-50">Owners</span>
              <div className="flex flex-wrap">
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="grid gap-2 bg-base-300 p-4 rounded-lg">
            <div className="grid justify-center gap-2">
              <img
                src="https://xivapi.com/i/004000/004001_hr1.png"
                alt="Chocobo"
                className="mask mask-squircle w-24 bg-dps"
              />
              <h4 className="text-lg text-center">Chocobo</h4>
            </div>

            <Divider />
            <div className="flex justify-between">
              <span className="opacity-50">Owned</span>
              <span>3 (2%)</span>
            </div>
            <Divider />
            <div className="grid">
              <span className="opacity-50">Owners</span>
              <div className="flex flex-wrap">
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="btn">See full List →</button>
      </div>
    );
  };

  const Minion = () => {
    return (
      <div className="grid gap-2 bg-base-300 p-4 rounded-lg">
        <div className="grid justify-center gap-2">
          <img
            src="https://xivapi.com/i/004000/004403_hr1.png"
            alt="Bomb"
            className="mask mask-squircle w-24 bg-dps"
          />
          <h4 className="text-lg text-center">Bomb</h4>
        </div>

        <Divider />
        <div className="flex justify-between">
          <span className="opacity-50">Owned</span>
          <span>130 (76%)</span>
        </div>
      </div>
    );
  };

  const PopularMinions = () => {
    return (
      <div className="grid gap-2">
        <h2 className="text-2xl">Most popular Minions</h2>
        <div className="grid md:grid-cols-3 gap-2">
          <Minion />
          <Minion />
          <Minion />
        </div>
        <button className="btn">See full List →</button>
      </div>
    );
  };

  const RarestMinions = () => {
    return (
      <div className="grid gap-2">
        <h2 className="text-2xl">Rarest Minions</h2>
        <div className="grid md:grid-cols-3 gap-2">
          <div className="grid gap-2 bg-base-300 p-4 rounded-lg">
            <div className="grid justify-center gap-2">
              <img
                src="https://xivapi.com/i/004000/004403_hr1.png"
                alt="Chocobo"
                className="mask mask-squircle w-24 bg-dps"
              />
              <h4 className="text-lg text-center">Bomb</h4>
            </div>

            <Divider />
            <div className="flex justify-between">
              <span className="opacity-50">Owned</span>
              <span>3 (2%)</span>
            </div>
            <Divider />
            <div className="grid">
              <span className="opacity-50">Owners</span>
              <div className="flex flex-wrap">
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-2 bg-base-300 p-4 rounded-lg">
            <div className="grid justify-center gap-2">
              <img
                src="https://xivapi.com/i/004000/004403_hr1.png"
                alt="Chocobo"
                className="mask mask-squircle w-24 bg-dps"
              />
              <h4 className="text-lg text-center">Bomb</h4>
            </div>

            <Divider />
            <div className="flex justify-between">
              <span className="opacity-50">Owned</span>
              <span>3 (2%)</span>
            </div>
            <Divider />
            <div className="grid">
              <span className="opacity-50">Owners</span>
              <div className="flex flex-wrap">
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="grid gap-2 bg-base-300 p-4 rounded-lg">
            <div className="grid justify-center gap-2">
              <img
                src="https://xivapi.com/i/004000/004403_hr1.png"
                alt="Chocobo"
                className="mask mask-squircle w-24 bg-dps"
              />
              <h4 className="text-lg text-center">Bomb</h4>
            </div>

            <Divider />
            <div className="flex justify-between">
              <span className="opacity-50">Owned</span>
              <span>3 (2%)</span>
            </div>
            <Divider />
            <div className="grid">
              <span className="opacity-50">Owners</span>
              <div className="flex flex-wrap">
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="btn">See full List →</button>
      </div>
    );
  };

  const RarestAchievements = () => {
    return (
      <div className="grid gap-2">
        <h2 className="text-2xl">Rarest Achievements</h2>
        <div className="grid md:grid-cols-3 gap-2">
          <div className="grid gap-2 bg-base-300 p-4 rounded-lg">
            <div className="grid justify-center gap-2">
              <img
                src="https://xivapi.com/i/002000/002685_hr1.png"
                alt="Chocobo"
                className="mask mask-squircle w-24"
              />
              <h4 className="text-lg text-center">Endgame Hunter</h4>
            </div>

            <Divider />
            <div className="flex justify-between">
              <span className="opacity-50">Owned</span>
              <span>3 (2%)</span>
            </div>
            <Divider />
            <div className="grid">
              <span className="opacity-50">Owners</span>
              <div className="flex flex-wrap">
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-2 bg-base-300 p-4 rounded-lg">
            <div className="grid justify-center gap-2">
              <img
                src="https://xivapi.com/i/004000/004403_hr1.png"
                alt="Chocobo"
                className="mask mask-squircle w-24 bg-dps"
              />
              <h4 className="text-lg text-center">Bomb</h4>
            </div>

            <Divider />
            <div className="flex justify-between">
              <span className="opacity-50">Owned</span>
              <span>3 (2%)</span>
            </div>
            <Divider />
            <div className="grid">
              <span className="opacity-50">Owners</span>
              <div className="flex flex-wrap">
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="grid gap-2 bg-base-300 p-4 rounded-lg">
            <div className="grid justify-center gap-2">
              <img
                src="https://xivapi.com/i/004000/004403_hr1.png"
                alt="Chocobo"
                className="mask mask-squircle w-24 bg-dps"
              />
              <h4 className="text-lg text-center">Bomb</h4>
            </div>

            <Divider />
            <div className="flex justify-between">
              <span className="opacity-50">Owned</span>
              <span>3 (2%)</span>
            </div>
            <Divider />
            <div className="grid">
              <span className="opacity-50">Owners</span>
              <div className="flex flex-wrap">
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
                <div
                  className="tooltip cursor-pointer hover:bg-base-100 p-2 rounded-lg"
                  data-tip="Ygg Lart"
                >
                  <img
                    src="https://img2.finalfantasyxiv.com/f/be2bf245a304ed40ad0ca79c6ad8d7bb_be20385e18333edb329d4574f364a1f0fc0_96x96.jpg?1678372864"
                    alt=""
                    className="w-10 mask mask-squircle"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="btn">See full List →</button>
      </div>
    );
  };

  return (
    <section className="grid gap-4 mt-4">
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
        <div className="divider"></div>
        <RarestAchievements />
      </div>
    </section>
  );
};
