import { useCharacter } from "@/Contexts/CharacterContext";

export const Attributes = () => {
  const { Base, Offensive, Defensive, Physical, Mental, Role } =
    useCharacter().char.ActiveStats.Attributes;

  function getCritRate() {
    const Crit = Offensive.CriticalHitRate;

    const result = Math.floor((200 * (Crit - 400)) / 1900 + 50) / 10;
    return result < 5 ? 5 : result;
  } // TODO : add level calc

  function getCritDamage() {
    const Crit = Offensive.CriticalHitRate;

    const calc = Math.floor((200 * (Crit - 400)) / 1900 + 1400) / 1000;
    const result = parseFloat((calc * 100 - 100).toFixed(2));

    return result < 40 ? 40 : result;
  } // TODO : add level calc

  function getDirectHitChance() {
    const DH = Offensive.DirectHitRate;

    const result = Math.floor((550 * (DH - 400)) / 1900) / 10;
    return result > 100 ? 100 : result < 0 ? 0 : result;
  } // TODO : add level calc

  function getDeterminationDamage() {
    const Det = Offensive.Determination;

    const calc = Math.floor((130 * (Det - 390)) / 1900 + 1000) / 1000;
    const result = parseFloat((calc * 100 - 100).toFixed(2));

    return result > 100 ? 100 : result < 0 ? 0 : result;
  } // TODO : add level calc

  function getTenacityDamage() {
    const Ten = Role.Tenacity;

    const calc = Math.floor((100 * (Ten - 400)) / 1900 + 1000) / 1000;
    const result = calc * 100 - 100;

    return result < 1 ? 1 : result;
  }

  function getSkillSpeedPercent() {
    const Speed = Physical.SkillSpeed;

    const result = (1000 + (130 * (Speed - 400)) / 1900) / 1000;

    return result;
  }

  function getSkillSpeed250GCD() {
    const Speed = Physical.SkillSpeed;

=    const result = Math.floor(2.50 *(1000-(130*(Speed-400)/1900))*10)/10000;

    return result;
  }

  const Attribute = ({ name, value }: { name: string; value: number }) => {
    return (
      <div className="flex items-center justify-between gap-2 rounded-lg bg-base-200 px-3 py-1 duration-300 hover:bg-base-300 hover:text-accent">
        <span className="w-fit opacity-70">{name}</span>
        <span className="">{value}</span>
      </div>
    );
  };

  const SubAttribute = ({ name, value }: { name: string; value: number }) => {
    return (
      <div className="flex items-center justify-between gap-2 rounded-lg bg-base-200 px-3 py-1 text-sm duration-300 hover:bg-base-300 hover:text-accent">
        <span className="w-fit opacity-70">{name}</span>
        <span className="">{value}%</span>
      </div>
    );
  };

  const BaseAtt = () => (
    <div className="grid gap-2">
      <div className="border-b border-slate-600 pb-2 text-lg">Base</div>
      <div className="grid grid-cols-2 items-start gap-8">
        <div className="grid gap-1">
          <Attribute name="Vitality" value={Base.Vitality} />
          <Attribute name="Mind" value={Base.Mind} />
        </div>

        <div className="grid gap-1">
          <Attribute name="Strength" value={Base.Strength} />
          <Attribute name="Intelligence" value={Base.Intelligence} />
          <Attribute name="Dexterity" value={Base.Dexterity} />
        </div>
      </div>
    </div>
  );

  const OffensiveAtt = () => (
    <div className="grid gap-2">
      <div className="border-b border-slate-600 pb-2 text-lg">Offensive</div>
      <div className="grid gap-3">
        <div className="rounded-lg bg-base-200 outline outline-1 outline-slate-700">
          <Attribute
            name="Critical Hit Rate"
            value={Offensive.CriticalHitRate}
          />
          <div className="h-[1px] w-full bg-slate-700"></div>
          <SubAttribute name="Chance" value={getCritRate()} />
          <SubAttribute name="Damage" value={getCritDamage()} />
        </div>

        <div className="rounded-lg bg-base-200 outline outline-1 outline-slate-700">
          <Attribute name="Direct Hit Rate" value={Offensive.DirectHitRate} />
          <div className="h-[1px] w-full bg-slate-700"></div>
          <SubAttribute name="Chance" value={getDirectHitChance()} />
        </div>

        <div className="rounded-lg bg-base-200 outline outline-1 outline-slate-700">
          <Attribute name="Determination" value={Offensive.Determination} />
          <div className="h-[1px] w-full bg-slate-700"></div>
          <SubAttribute name="Damage" value={getDeterminationDamage()} />
        </div>
      </div>
    </div>
  );

  const DefensiveAtt = () => (
    <div className="flex w-full flex-col gap-2">
      <div className="w-full border-b border-slate-600 pb-2 text-lg">
        Defensive
      </div>
      <div className="grid gap-1">
        <Attribute name="Defense" value={Defensive.Defense} />
        <Attribute name="MagicDefense" value={Defensive.MagicDefense} />
      </div>
    </div>
  );

  const PhysicalAtt = () => (
    <div className="flex w-full flex-col gap-2">
      <div className="w-full border-b border-slate-600 pb-2 text-lg">
        Physical
      </div>
      <div className="grid gap-1">
        <Attribute name="Attack Power" value={Physical.AttackPower} />
        <Attribute name="Skill Speed" value={Physical.SkillSpeed} />
      </div>
    </div>
  );

  const MentalAtt = () => (
    <div className="flex w-full flex-col gap-2">
      <div className="w-full border-b border-slate-600 pb-2 text-lg">
        Mental
      </div>
      <div className="grid gap-1">
        <Attribute
          name="Magic Attack Potency"
          value={Mental.AttackMagicPotency}
        />
        <Attribute name="Healing Potency" value={Mental.HealingMagicPotency} />
        <Attribute name="Spell Speed" value={Mental.SpellSpeed} />
      </div>
    </div>
  );

  const RoleAtt = () => (
    <div className="grid gap-2">
      <div className="border-b border-slate-600 pb-2 text-lg">Role</div>
      <div className="grid grid-cols-2 items-start gap-4">
        <div className="rounded-lg bg-base-200 outline outline-1 outline-slate-700">
          <Attribute name="Tenacity" value={Role.Tenacity} />
          <div className="h-[1px] w-full bg-slate-700"></div>
          <SubAttribute name="Damage" value={getTenacityDamage()} />
        </div>

        <Attribute name="Piety" value={Role.Piety} />
      </div>
    </div>
  );

  return (
    <section className="w-full p-4">
      <h2 className="text-center text-2xl">Attributes</h2>

      <div className="grid gap-4">
        <BaseAtt />

        <div className="grid grid-cols-2 gap-8">
          <OffensiveAtt />
          <DefensiveAtt />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <PhysicalAtt />
          <MentalAtt />
        </div>

        <RoleAtt />
      </div>
    </section>
  );
};
