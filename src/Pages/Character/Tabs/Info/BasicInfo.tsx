import { TreatedCharData } from "@/Types";
import { Link } from "react-router-dom";

export const BasicInfo = ({ data }: { data: TreatedCharData }) => {
  const InfoBio = () => {
    const { Bio } = data.Profile;

    return (
      <div className="h-fit w-full rounded-lg bg-base-200 p-4 text-center duration-300 hover:bg-base-300">
        {Bio}
      </div>
    );
  };

  const RaceInfo = () => {
    const {
      Race: { Name, Tribe },
      Gender,
    } = data.Profile;

    return (
      <div className="grid rounded-lg p-4 duration-300 hover:bg-base-300">
        <div className="flex items-center gap-2">
          <span className="opacity-70">Race:</span> {Name}
        </div>
        <div className="flex items-center gap-2">
          <span className="opacity-70">Tribe:</span> {Tribe}
        </div>
        <div className="flex items-center gap-2">
          <span className="opacity-70">Sex:</span> {Gender}
        </div>
      </div>
    );
  };

  const NamedayInfo = () => {
    const {
      Astro: { Nameday, Guardian },
      StarterCity,
    } = data.Profile;

    return (
      <div className="grid rounded-lg p-4 duration-300 hover:bg-base-300">
        <div className="flex items-center gap-2">
          <span className="opacity-70">Birthday:</span> {Nameday}
        </div>
        <div className="flex items-center gap-2">
          <span className="opacity-70">Guardian:</span> {Guardian}
        </div>
        <div className="flex items-center gap-2">
          <span className="opacity-70">Starter City:</span> {StarterCity}
        </div>
      </div>
    );
  };

  const GrandCompanyInfo = () => {
    const { Name, Rank } = data.GrandCompany;

    return (
      <div className="grid rounded-lg p-4 duration-300 hover:bg-base-300">
        <div className="flex items-center gap-2">
          <span className="opacity-70">Grand Company</span>
        </div>
        <div className="flex items-center gap-2">{Name}</div>
        <div className="flex items-center gap-2">{Rank}</div>
      </div>
    );
  };

  const FreeCompanyInfo = () => {
    const { ID, Name, Tag, Crest } = data.FreeCompany;

    return (
      <Link
        to={`/FreeCompany/${ID}`}
        className="flex items-center gap-4 rounded-lg p-4 duration-300 hover:bg-neutral"
      >
        <div className="mask mask-squircle relative h-12 w-12">
          <img src={Crest[0]} alt={Name} className="absolute" />
          <img src={Crest[1]} alt={Name} className="absolute" />
          <img src={Crest[2]} alt={Name} className="absolute" />
        </div>
        <div className="grid">
          <div className="flex items-center gap-2">
            <span className="opacity-70">Free Company</span>
          </div>
          <div className="flex items-center gap-2">
            {Name} {`<${Tag}>`}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <article className="flex flex-col gap-4 rounded-b-lg rounded-tr-lg bg-base-100 p-4">
      <InfoBio />

      <div className="grid w-full gap-4 md:grid-cols-2">
        <div className="grid rounded-lg bg-base-200 md:grid-cols-2">
          <RaceInfo />
          <NamedayInfo />
        </div>

        <div className="grid rounded-lg bg-base-200 md:grid-cols-2">
          <GrandCompanyInfo />
          <FreeCompanyInfo />
        </div>
      </div>
    </article>
  );
};
