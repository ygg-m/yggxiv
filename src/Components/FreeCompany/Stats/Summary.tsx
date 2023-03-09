export const Summary = () => {
  const Divider = () => {
    return <div className="divider m-0"></div>;
  };

  const ShowData = ({ name, value }: { name: string; value: number }) => {
    return (
      <div className="flex justify-between">
        <span className="opacity-50">{name}</span>
        <span>{value}</span>
      </div>
    );
  };

  const Race = () => {
    return (
      <div className="grid gap-2 bg-base-300 p-4 rounded-lg">
        <div className="grid justify-center gap-2">
          <img
            src="http://localhost:3000/yggxiv/static/media/MiqoteMoonMale.27edbfc94beb8e10269f.png"
            alt="Miqo'te"
            className="mask mask-squircle w-24"
          />
          <h4 className="text-lg text-center">Miqo'te</h4>
        </div>

        <Divider />

        <ShowData name="Characters" value={49} />

        <Divider />

        <ShowData name="Seekers of the Sun" value={24} />
        <ShowData name="Keeper of the Moon" value={24} />

        <Divider />

        <ShowData name="Male" value={24} />
        <ShowData name="Female" value={24} />
      </div>
    );
  };

  const PopularRaces = () => {
    return (
      <div className="grid gap-2">
        <h2 className="text-2xl">Most popular Races</h2>
        <div className="grid md:grid-cols-3 gap-2">
          <Race />
          <Race />
          <Race />
        </div>
        <button className="btn">See full List →</button>
      </div>
    );
  };

  const Gender = ({ name, value }: { name: string; value: number }) => {
    return (
      <div className="grid gap-2 bg-base-300 p-4 rounded-lg">
        <div className="grid justify-center gap-2">
          <img
            src="http://localhost:3000/yggxiv/static/media/MiqoteMoonMale.27edbfc94beb8e10269f.png"
            alt="Miqo'te"
            className="mask mask-squircle w-24"
          />
          <h4 className="text-lg text-center">Male</h4>
        </div>

        <Divider />

        <ShowData name="Characters" value={49} />
      </div>
    );
  };

  const PopularGender = () => {
    return (
      <div className="grid gap-2">
        <h2 className="text-2xl">Most popular Gender</h2>
        <div className="grid sm:grid-cols-2 gap-2">
          <Gender name="Male" value={64} />
          <Gender name="Female" value={86} />
        </div>
      </div>
    );
  };

  const Job = () => {
    return (
      <div className="grid gap-2 bg-base-300 p-4 rounded-lg">
        <div className="grid justify-center gap-2">
          <img
            src="https://xivapi.com/cj/1/bluemage.png"
            alt="Blue Mage"
            className="mask mask-squircle w-24 bg-dps"
          />
          <h4 className="text-lg text-center">Blue Mage</h4>
        </div>

        <Divider />
        <ShowData name="Max Level" value={24} />
        <Divider />
        <ShowData name="Level 80" value={24} />
        <ShowData name="Level 70" value={24} />
        <ShowData name="Level 60" value={24} />
        <ShowData name="Level 50" value={24} />
        <ShowData name="Level 30" value={24} />
        <ShowData name="Unlocked" value={49} />
      </div>
    );
  };

  const PopularJobs = () => {
    return (
      <div className="grid gap-2">
        <h2 className="text-2xl">Most popular Jobs</h2>
        <div className="grid md:grid-cols-3 gap-2">
          <Job />
          <Job />
          <Job />
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
