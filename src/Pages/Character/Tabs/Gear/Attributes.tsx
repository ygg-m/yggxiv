import { useCharacter } from "@/Contexts/CharacterContext";

export const Attributes = () => {
  const { Base, Offensive, Defensive, Physical, Mental, Role } =
    useCharacter().char.ActiveStats.Attributes;

  const Attribute = ({ name, value }: { name: string; value: number }) => {
    return (
      <div className="flex items-center justify-between gap-2 rounded-lg bg-base-200 px-3 duration-300 hover:bg-base-300 hover:text-accent">
        <span className="w-fit opacity-70">{name}</span>
        <span className="text-lg">{value}</span>
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
      <div className="grid gap-1">
        <Attribute name="Critical Hit Rate" value={Offensive.CriticalHitRate} />
        <Attribute name="Direct Hit Rate" value={Offensive.DirectHitRate} />
        <Attribute name="Determination" value={Offensive.Determination} />
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
        <Attribute name="Tenacity" value={Role.Tenacity} />
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
