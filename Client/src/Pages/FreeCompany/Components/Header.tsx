import { FreeCompanyData } from "../../../Types";

interface HeaderProps {
  FreeCompany: FreeCompanyData;
}

export const Header = ({ FreeCompany }: HeaderProps) => {
  const ProfileImage = () => {
    const { Crest } = FreeCompany;
    return (
      <div className="relative -mt-16 h-32 w-32 overflow-hidden rounded-xl shadow-2xl outline outline-1 outline-neutral-500">
        <img src={Crest[0]} alt="" className="absolute" />
        <img src={Crest[1]} alt="" className="absolute" />
        <img src={Crest[2]} alt="" className="absolute" />
      </div>
    );
  };

  const FC_Name = () => {
    const { Name } = FreeCompany;
    return (
      <h1 className="flex items-center gap-4 text-5xl font-bold">{Name}</h1>
    );
  };

  const Server = () => {
    const { Server, DC } = FreeCompany;
    const DataCenter = DC.replace("]", "");
    return (
      <div className="flex items-center gap-2 md:mt-4">
        <div className="badge badge-md bg-neutral-800 py-3">{DataCenter}</div>
        <div className="badge-primary badge badge-md py-3">{Server}</div>
      </div>
    );
  };

  return (
    <header className="mb-8 flex w-full flex-col items-center gap-4 md:flex-row md:gap-8">
      <ProfileImage />
      <FC_Name />
      <Server />
    </header>
  );
};
