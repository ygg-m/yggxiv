import { TreatedCharData } from "@/Types";
import { Link } from "react-router-dom";

export const BasicInfo = ({ data }: { data: TreatedCharData }) => {
  const InfoBio = () => {
    const { Bio } = data.Profile;
    const isBioEmpty = Bio === "" || Bio === "-";

    return !isBioEmpty ? (
      <div className="h-fit w-full rounded-lg bg-base-200 p-4 text-center duration-300 hover:bg-base-300">
        {Bio}
      </div>
    ) : null;
  };

  const RaceInfo = () => {
    const {
      Race: { Name, Tribe },
      Gender,
    } = data.Profile;

    return (
      <div className="grid gap-2 rounded-lg bg-base-200 p-4 duration-300 hover:bg-base-300">
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
      <div className="grid gap-2 rounded-lg bg-base-200 p-4 duration-300 hover:bg-base-300">
        <div className="flex items-center gap-2">
          <span className="opacity-70">Birthday:</span>{" "}
          <span className="tooltip" data-tip={Nameday.Full}>
            {Nameday.Simple}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="opacity-70">Guardian:</span>{" "}
          <img src={Guardian.Icon} alt={Guardian.Name} className="w-6" />{" "}
          {Guardian.Name}
        </div>

        <div className="flex items-center gap-2">
          <span className="opacity-70">Starter City:</span>{" "}
          <img src={StarterCity.Icon} alt={StarterCity.Name} className="w-6" />
          {StarterCity.Name}
        </div>
      </div>
    );
  };

  const GrandCompanyInfo = () => {
    const { Name, Icon, Rank } = data.GrandCompany;

    return (
      <div className="flex items-center justify-center gap-4 rounded-lg bg-base-200 p-4 duration-300 hover:bg-base-300">
        <img src={Icon} alt={Name} className="h-12 w-12" />
        <div className="grid">
          <span className="opacity-70">Grand Company</span>
          <div className="flex items-center gap-2">{Name}</div>
          <div className="flex items-center gap-2">
            <img src={Rank.Icon} alt={Rank.Name} className="w-6" />
            {Rank.Name}
          </div>
        </div>
      </div>
    );
  };

  const FreeCompanyInfo = () => {
    const { ID, Name, Tag, Crest } = data.FreeCompany;

    return (
      <Link
        to={`/FreeCompany/${ID}`}
        className="flex items-center justify-center gap-4 rounded-lg bg-base-200 p-4 duration-300 hover:bg-neutral"
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
        <div className="grid gap-2 rounded-lg xl:grid-cols-2">
          <RaceInfo />
          <NamedayInfo />
        </div>

        <div className="grid gap-2 rounded-lg xl:grid-cols-2">
          <GrandCompanyInfo />
          <FreeCompanyInfo />
        </div>
      </div>
    </article>
  );
};
