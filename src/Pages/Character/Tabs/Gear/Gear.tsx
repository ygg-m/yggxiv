import { Attributes } from "./Attributes";
import { GearSet } from "./GearSet";

export const CharGear = () => {
  return (
    <section className="mb-8 grid place-items-center gap-8 rounded-lg bg-base-100 p-4 lg:grid-cols-2">
      <GearSet />
      <Attributes />
    </section>
  );
};
