import { useCharacter } from "@/Contexts/CharacterContext";
import { levelModifiers } from "@/Data/levelModifiers";

export const Attributes = () => {
  const { Base, Offensive, Defensive, Physical, Mental, Role, Craft, Gather } =
    useCharacter().char.ActiveStats.Attributes;
  const { Level, Role: JobRole } = useCharacter().char.ActiveStats.Job;

  const { Sub, Main, Div } = levelModifiers.find((e) => e.Level === Level) || {
    Level: 90,
    Main: 390,
    Sub: 400,
    Div: 1900,
  };

  function getCritRate() {
    const Crit = Offensive.CriticalHitRate;

    const result = Math.floor((200 * (Crit - Sub)) / Div + 50) / 10;

    return result < 5 ? `5%` : `${result}%`;
  }

  function getCritDamage() {
    const Crit = Offensive.CriticalHitRate;

    const calc = Math.floor((200 * (Crit - Sub)) / Div + 1400) / 1000;
    const result = parseFloat((calc * 100 - 100).toFixed(2));

    return result < 40 ? `+${40}%` : `+${result}%`;
  }
  function getDirectHitChance() {
    const DH = Offensive.DirectHitRate;

    const result = Math.floor((550 * (DH - Sub)) / Div) / 10;

    return result > 100 ? `${100}%` : result < 0 ? `${0}%` : `${result}%`;
  }

  function getDeterminationDamage() {
    const Det = Offensive.Determination;

    const calc = Math.floor((130 * (Det - Main)) / Div + 1000) / 1000;
    const result = parseFloat((calc * 100 - 100).toFixed(2));

    return result > 100 ? `+${100}%` : result < 0 ? `+${0}%` : `+${result}%`;
  }

  function getTenacityDamage() {
    const Ten = Role.Tenacity;

    const calc = ((100 * (Ten - Sub)) / Div + 1000) / 1000;
    const result = Math.floor(calc * 100 - 100);

    return result < 1 ? "+1%" : `+${result}%`;
  }

  // function getSkillSpeedPercent() {
  //   const Speed = Physical.SkillSpeed;

  //   const result = (1000 + (130 * (Speed - 400)) / 1900) / 1000;

  //   return result;
  // }

  function getSkillSpeed250GCD() {
    const Speed = Physical.SkillSpeed;

    const result =
      Math.floor(2.5 * (1000 - (130 * (Speed - Sub)) / Div) * 10) / 10000;

    return `${result.toFixed(2)}s`;
  }

  function getSpellSpeed250GCD() {
    const Speed = Mental.SpellSpeed;

    const result =
      Math.floor(2.5 * (1000 - (130 * (Speed - Sub)) / Div) * 10) / 10000;

    return `${result.toFixed(2)}s`;
  }

  function getMPRegen() {
    const Piety = Role.Piety;

    const result = Math.floor((Piety - 340) / 22);

    return result > 0 ? `+ ${result} MP/tick` : "+0 MP/tick";
  }

  const Attribute = ({ name, value }: { name: string; value: number }) => {
    return (
      <div className="flex items-center justify-between gap-2 rounded-lg bg-base-200 px-3 py-1 duration-100 hover:bg-base-300 hover:text-accent">
        <span className="w-fit opacity-70">{name}</span>
        <span className="">{value}</span>
      </div>
    );
  };

  const SubAttribute = ({ name, value }: { name: string; value: string }) => {
    return (
      <div className="flex items-center justify-between gap-2 rounded-lg bg-base-200 px-3 py-1 text-sm duration-100 hover:bg-base-300 hover:text-accent">
        <span className="w-fit opacity-70">{name}</span>
        <span className="">{value}</span>
      </div>
    );
  };

  const BaseAtt = () => (
    <div className="grid gap-2">
      <div className="border-b border-slate-600 pb-2 text-lg">Base</div>
      <div className="grid grid-cols-2 items-start gap-8">
        <div className="grid gap-4">
          <div className="rounded-lg bg-base-200 outline outline-1 outline-slate-700">
            <Attribute name="Vitality" value={Base.Vitality} />
            <div className="h-[1px] w-full bg-slate-700"></div>
            <Attribute name="Mind" value={Base.Mind} />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-lg bg-base-200 outline outline-1 outline-slate-700">
            <Attribute name="Strength" value={Base.Strength} />
            <div className="h-[1px] w-full bg-slate-700"></div>
            <Attribute name="Intelligence" value={Base.Intelligence} />
            <div className="h-[1px] w-full bg-slate-700"></div>
            <Attribute name="Dexterity" value={Base.Dexterity} />
          </div>
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
          <SubAttribute name="Chance" value={getCritRate()} />
          <SubAttribute name="Damage" value={getCritDamage()} />
        </div>

        <div className="rounded-lg bg-base-200 outline outline-1 outline-slate-700">
          <Attribute name="Direct Hit Rate" value={Offensive.DirectHitRate} />
          <SubAttribute name="Chance" value={getDirectHitChance()} />
        </div>

        <div className="rounded-lg bg-base-200 outline outline-1 outline-slate-700">
          <Attribute name="Determination" value={Offensive.Determination} />
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
      <div className="grid gap-4">
        <div className="rounded-lg bg-base-200 outline outline-1 outline-slate-700">
          <Attribute name="Defense" value={Defensive.Defense} />
          <div className="h-[1px] w-full bg-slate-700"></div>
          <Attribute name="MagicDefense" value={Defensive.MagicDefense} />
        </div>
      </div>
    </div>
  );

  const PhysicalAtt = () => (
    <div className="flex w-full flex-col gap-2">
      <div className="w-full border-b border-slate-600 pb-2 text-lg">
        Physical
      </div>
      <div className="grid gap-4">
        <div className="rounded-lg bg-base-200 outline outline-1 outline-slate-700">
          <Attribute name="Attack Power" value={Physical.AttackPower} />
        </div>

        <div className="rounded-lg bg-base-200 outline outline-1 outline-slate-700">
          <Attribute name="Skill Speed" value={Physical.SkillSpeed} />
          <SubAttribute name="GCD" value={getSkillSpeed250GCD()} />
        </div>
      </div>
    </div>
  );

  const MentalAtt = () => (
    <div className="flex w-full flex-col gap-2">
      <div className="w-full border-b border-slate-600 pb-2 text-lg">
        Magical
      </div>
      <div className="grid gap-4">
        <div className="rounded-lg bg-base-200 outline outline-1 outline-slate-700">
          <Attribute
            name="Magic Attack Potency"
            value={Mental.AttackMagicPotency}
          />
          <div className="h-[1px] w-full bg-slate-700"></div>
          <Attribute
            name="Healing Potency"
            value={Mental.HealingMagicPotency}
          />
        </div>

        <div className="rounded-lg bg-base-200 outline outline-1 outline-slate-700">
          <Attribute name="Spell Speed" value={Mental.SpellSpeed} />
          <SubAttribute name="GCD" value={getSpellSpeed250GCD()} />
        </div>
      </div>
    </div>
  );

  const CraftAtt = () => (
    <div className="flex w-full flex-col gap-2">
      <div className="w-full border-b border-slate-600 pb-2 text-lg">Craft</div>
      <div className="grid gap-4">
        <div className="rounded-lg bg-base-200 outline outline-1 outline-slate-700">
          <Attribute name="Craftsmanship" value={Craft.Craftsmanship} />
          <div className="h-[1px] w-full bg-slate-700"></div>
          <Attribute name="Control" value={Craft.Control} />
        </div>
      </div>
    </div>
  );

  const GatherAtt = () => (
    <div className="flex w-full flex-col gap-2">
      <div className="w-full border-b border-slate-600 pb-2 text-lg">
        Gathering
      </div>
      <div className="grid gap-4">
        <div className="rounded-lg bg-base-200 outline outline-1 outline-slate-700">
          <Attribute name="Gathering" value={Gather.Gathering} />
          <div className="h-[1px] w-full bg-slate-700"></div>
          <Attribute name="Perception" value={Gather.Perception} />
        </div>
      </div>
    </div>
  );

  const RoleAtt = () => (
    <div className="flex flex-col gap-2">
      <div className="border-b border-slate-600 pb-2 text-lg">Role</div>
      <div className="grid items-start gap-4">
        {JobRole === "Tank" ? (
          <div className="rounded-lg bg-base-200 outline outline-1 outline-slate-700">
            <Attribute name="Tenacity" value={Role.Tenacity} />
            <SubAttribute name="Damage Increase" value={getTenacityDamage()} />
          </div>
        ) : (
          <div className="rounded-lg bg-base-200 outline outline-1 outline-slate-700">
            <Attribute name="Piety" value={Role.Piety} />
            <SubAttribute name="MP Regen" value={getMPRegen()} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="w-full">
      <h2 className="text-center text-2xl">Attributes</h2>

      <div className="grid gap-4">
        <BaseAtt />

        <div className="grid grid-cols-2 gap-8">
          <OffensiveAtt />
          <DefensiveAtt />
        </div>

        <div className="grid grid-cols-2 gap-8">
          {Mental.AttackMagicPotency > Physical.AttackPower ? (
            <MentalAtt />
          ) : (
            <PhysicalAtt />
          )}
          {Craft.Craftsmanship ? <CraftAtt /> : null}
          {Gather.Gathering ? <GatherAtt /> : null}
          {JobRole === "Tank" || JobRole === "Heale" ? <RoleAtt /> : null}
        </div>
      </div>
    </section>
  );
};
